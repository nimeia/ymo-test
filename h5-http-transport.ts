import type {
  AnalyticsUploadRequest,
  AnalyticsUploadResponse,
  RemoteSyncFailure,
  RemoteSyncJobType,
  RemoteSyncTransport,
  SnapshotPullRequest,
  SnapshotPullResponse,
  SnapshotPushRequest,
  SnapshotPushResponse,
} from './h5-remote-sync.schema';

export const HTTP_REMOTE_SYNC_VERSION = '1.0.0' as const;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH';
export type HttpRemoteSyncRouteKey = 'snapshotPush' | 'snapshotPull' | 'analyticsUpload';

export type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;
export type HeaderValue = string | undefined;
export type HeaderFactory =
  | Record<string, HeaderValue>
  | ((input: {
      routeKey: HttpRemoteSyncRouteKey;
      kind: RemoteSyncJobType;
      body: unknown;
    }) => Record<string, HeaderValue> | Promise<Record<string, HeaderValue>>);

export interface HttpRemoteSyncRouteDescriptor {
  path: string | ((request: unknown) => string);
  method?: HttpMethod;
}

export interface HttpRemoteSyncEndpoints {
  snapshotPush: HttpRemoteSyncRouteDescriptor;
  snapshotPull: HttpRemoteSyncRouteDescriptor;
  analyticsUpload: HttpRemoteSyncRouteDescriptor;
}

export interface HttpRemoteSyncRequestEnvelope<T> {
  requestId: string;
  sentAtMs: number;
  payload: T;
}

export interface HttpRemoteSyncResponseEnvelope<T> {
  ok: boolean;
  result?: T;
  failure?: RemoteSyncFailure;
}

export interface HttpRemoteSyncOptions {
  baseUrl?: string;
  endpoints: HttpRemoteSyncEndpoints;
  fetchImpl?: FetchLike;
  timeoutMs?: number;
  credentials?: RequestCredentials;
  mode?: RequestMode;
  cache?: RequestCache;
  headers?: HeaderFactory;
  authToken?: string;
  getAuthToken?: () => string | undefined | Promise<string | undefined>;
  authHeaderName?: string;
  namespaceHeaderName?: string;
  traceHeaderName?: string;
  includeTraceHeader?: boolean;
  includeNamespaceHeader?: boolean;
  beforeRequest?: (input: {
    routeKey: HttpRemoteSyncRouteKey;
    url: string;
    init: RequestInit;
    body: unknown;
  }) => void | Promise<void>;
  afterResponse?: (input: {
    routeKey: HttpRemoteSyncRouteKey;
    url: string;
    status: number;
    ok: boolean;
    parsedBody: unknown;
  }) => void | Promise<void>;
}

export interface ResolvedHttpRemoteSyncOptions extends Omit<Required<HttpRemoteSyncOptions>, 'headers' | 'getAuthToken' | 'beforeRequest' | 'afterResponse'> {
  headers?: HeaderFactory;
  getAuthToken?: HttpRemoteSyncOptions['getAuthToken'];
  beforeRequest?: HttpRemoteSyncOptions['beforeRequest'];
  afterResponse?: HttpRemoteSyncOptions['afterResponse'];
}

const DEFAULT_HTTP_OPTIONS: Omit<ResolvedHttpRemoteSyncOptions, 'endpoints'> = {
  baseUrl: '',
  fetchImpl: (input, init) => fetch(input, init),
  timeoutMs: 8000,
  credentials: 'same-origin',
  mode: 'cors',
  cache: 'no-store',
  headers: undefined,
  authToken: '',
  getAuthToken: undefined,
  authHeaderName: 'Authorization',
  namespaceHeaderName: 'X-App-Namespace',
  traceHeaderName: 'X-Trace-Id',
  includeTraceHeader: true,
  includeNamespaceHeader: true,
  beforeRequest: undefined,
  afterResponse: undefined,
};

export function createHttpRemoteSyncTransport(options: HttpRemoteSyncOptions): RemoteSyncTransport {
  const resolved = resolveHttpRemoteSyncOptions(options);

  return {
    async pushSnapshot(request: SnapshotPushRequest): Promise<SnapshotPushResponse> {
      return requestRemoteSync<SnapshotPushRequest, SnapshotPushResponse>(resolved, 'snapshotPush', 'snapshot_push', request);
    },
    async pullSnapshot(request: SnapshotPullRequest): Promise<SnapshotPullResponse> {
      return requestRemoteSync<SnapshotPullRequest, SnapshotPullResponse>(resolved, 'snapshotPull', 'snapshot_pull', request);
    },
    async uploadAnalytics(request: AnalyticsUploadRequest): Promise<AnalyticsUploadResponse> {
      return requestRemoteSync<AnalyticsUploadRequest, AnalyticsUploadResponse>(resolved, 'analyticsUpload', 'analytics_upload', request);
    },
  };
}

export function resolveHttpRemoteSyncOptions(options: HttpRemoteSyncOptions): ResolvedHttpRemoteSyncOptions {
  return {
    ...DEFAULT_HTTP_OPTIONS,
    ...options,
    endpoints: options.endpoints,
  };
}

export async function requestRemoteSync<TRequest, TResponse>(
  options: ResolvedHttpRemoteSyncOptions,
  routeKey: HttpRemoteSyncRouteKey,
  kind: RemoteSyncJobType,
  requestBody: TRequest,
): Promise<TResponse> {
  const route = options.endpoints[routeKey];
  const url = resolveHttpRemoteSyncUrl(options.baseUrl, route.path, requestBody);
  const headers = await buildHttpRemoteSyncHeaders(options, routeKey, kind, requestBody);
  const envelope: HttpRemoteSyncRequestEnvelope<TRequest> = {
    requestId: buildHttpRequestId(kind, requestBody),
    sentAtMs: Date.now(),
    payload: requestBody,
  };

  const init: RequestInit = {
    method: route.method ?? 'POST',
    headers,
    body: JSON.stringify(envelope),
    credentials: options.credentials,
    mode: options.mode,
    cache: options.cache,
  };

  if (options.beforeRequest) {
    await options.beforeRequest({ routeKey, url, init, body: requestBody });
  }

  try {
    const response = await fetchWithTimeout(options.fetchImpl, url, init, options.timeoutMs);
    const parsedBody = await parseJsonBody(response);
    if (options.afterResponse) {
      await options.afterResponse({ routeKey, url, status: response.status, ok: response.ok, parsedBody });
    }

    const unwrapped = unwrapResponseEnvelope<TResponse>(parsedBody);
    if (unwrapped) {
      return unwrapped;
    }

    if (response.ok) {
      return parsedBody as TResponse;
    }

    return createFailureFallbackResponse<TResponse>(routeKey, response.status, parsedBody);
  } catch (error) {
    return createThrownFailureFallbackResponse<TResponse>(routeKey, error);
  }
}

export async function buildHttpRemoteSyncHeaders(
  options: ResolvedHttpRemoteSyncOptions,
  routeKey: HttpRemoteSyncRouteKey,
  kind: RemoteSyncJobType,
  body: unknown,
): Promise<Record<string, string>> {
  const token = (await options.getAuthToken?.()) ?? options.authToken;
  const dynamicHeaders = typeof options.headers === 'function'
    ? await options.headers({ routeKey, kind, body })
    : (options.headers ?? {});
  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    baseHeaders[options.authHeaderName] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }
  const request = body as {
    context?: { appNamespace?: string; traceId?: string };
    payload?: { context?: { appNamespace?: string; traceId?: string } };
  };
  const context = request.context ?? request.payload?.context;
  if (options.includeNamespaceHeader && context?.appNamespace) {
    baseHeaders[options.namespaceHeaderName] = context.appNamespace;
  }
  if (options.includeTraceHeader && context?.traceId) {
    baseHeaders[options.traceHeaderName] = context.traceId;
  }
  Object.entries(dynamicHeaders).forEach(([key, value]) => {
    if (typeof value === 'string' && value.length > 0) {
      baseHeaders[key] = value;
    }
  });
  return baseHeaders;
}

export function resolveHttpRemoteSyncUrl(
  baseUrl: string,
  path: string | ((request: unknown) => string),
  request: unknown,
): string {
  const resolvedPath = typeof path === 'function' ? path(request) : path;
  if (/^https?:\/\//.test(resolvedPath)) return resolvedPath;
  if (!baseUrl) return resolvedPath;
  return `${baseUrl.replace(/\/$/, '')}/${resolvedPath.replace(/^\//, '')}`;
}

export async function fetchWithTimeout(
  fetchImpl: FetchLike,
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const handle = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetchImpl(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(handle);
  }
}

export async function parseJsonBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { rawText: text };
  }
}

export function unwrapResponseEnvelope<T>(body: unknown): T | undefined {
  if (!body || typeof body !== 'object') return undefined;
  const envelope = body as HttpRemoteSyncResponseEnvelope<T>;
  if (typeof envelope.ok === 'boolean') {
    if (envelope.result !== undefined) return envelope.result;
  }
  return undefined;
}

export function buildHttpRequestId(kind: RemoteSyncJobType, requestBody: unknown): string {
  const request = requestBody as {
    context?: { traceId?: string };
    payload?: { context?: { traceId?: string } };
  };
  const traceId = request.context?.traceId ?? request.payload?.context?.traceId ?? 'trace';
  return `${kind}-${traceId}-${Date.now()}`;
}

export function createFailureFallbackResponse<T>(
  routeKey: HttpRemoteSyncRouteKey,
  status: number,
  parsedBody: unknown,
): T {
  const failure = mapHttpStatusToFailure(status, parsedBody);
  switch (routeKey) {
    case 'snapshotPush':
      return {
        ok: false,
        status: failure.retryable ? 'retrying' : 'failed',
        failure,
      } as T;
    case 'snapshotPull':
      return {
        ok: false,
        found: false,
        status: failure.retryable ? 'retrying' : 'failed',
        failure,
      } as T;
    case 'analyticsUpload':
      return {
        ok: false,
        status: failure.retryable ? 'retrying' : 'failed',
        uploadedBatchCount: 0,
        acceptedEventCount: 0,
        retryableEventCount: 0,
        permanentRejectedEventCount: 0,
        batchResponses: [],
        failure,
      } as T;
    default:
      return {
        ok: false,
        failure,
      } as T;
  }
}

export function createThrownFailureFallbackResponse<T>(
  routeKey: HttpRemoteSyncRouteKey,
  error: unknown,
): T {
  const failure: RemoteSyncFailure = normalizeThrownFailure(error);
  return createFailureFallbackResponse<T>(routeKey, 0, { failure });
}

export function mapHttpStatusToFailure(status: number, body: unknown): RemoteSyncFailure {
  const hinted = tryReadFailureFromBody(body);
  if (hinted) return hinted;
  if (status === 401 || status === 403) {
    return { kind: 'auth', code: `http_${status}`, message: 'Authentication failed.', retryable: false };
  }
  if (status === 409) {
    return { kind: 'conflict', code: 'http_409', message: 'Remote conflict detected.', retryable: false };
  }
  if (status === 422 || status === 400) {
    return { kind: 'validation', code: `http_${status}`, message: 'Request validation failed.', retryable: false };
  }
  if (status === 429) {
    return {
      kind: 'rate_limit',
      code: 'http_429',
      message: 'Rate limited by remote service.',
      retryable: true,
      retryAfterMs: tryReadRetryAfterMs(body),
    };
  }
  if (status >= 500) {
    return { kind: 'network', code: `http_${status}`, message: 'Remote server error.', retryable: true };
  }
  return { kind: 'unknown', code: `http_${status || 'unknown'}`, message: 'Remote request failed.', retryable: status === 0 };
}

export function normalizeThrownFailure(error: unknown): RemoteSyncFailure {
  const maybe = error as { name?: string; message?: string };
  if (maybe?.name === 'AbortError') {
    return { kind: 'network', code: 'request_timeout', message: 'HTTP request timed out.', retryable: true };
  }
  return {
    kind: 'network',
    code: 'request_failed',
    message: maybe?.message ?? 'HTTP request failed.',
    retryable: true,
  };
}

export function tryReadFailureFromBody(body: unknown): RemoteSyncFailure | undefined {
  if (!body || typeof body !== 'object') return undefined;
  const candidate = body as { failure?: RemoteSyncFailure };
  if (candidate.failure?.code) return candidate.failure;
  return undefined;
}

export function tryReadRetryAfterMs(body: unknown): number | undefined {
  if (!body || typeof body !== 'object') return undefined;
  const value = (body as { retryAfterMs?: unknown }).retryAfterMs;
  return typeof value === 'number' ? value : undefined;
}
