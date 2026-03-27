
declare module 'react' {
  export type ChangeEvent<T = Element> = { target: T & { value: string } };
  export type ReactNode = any;
  export interface FC<P = Record<string, unknown>> { (props: P): any }
  export function useState<T>(value: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
  export function useCallback<T extends (...args: any[]) => any>(fn: T, deps: unknown[]): T;
  export function useRef<T>(value: T): { current: T };
  const React: any;
  export default React;
}

declare module 'react-dom/client' {
  export function createRoot(container: Element | DocumentFragment): { render(node: any): void };
}

declare module 'react/jsx-runtime' {
  export const Fragment: any;
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
}

declare namespace JSX {
  interface IntrinsicAttributes {
    key?: any;
  }
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
