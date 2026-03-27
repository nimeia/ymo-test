import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createLocalStorageDriver, createRuntimePersistenceAdapter, MemoryStorageDriver } from '../../../h5-persistence-adapter';
import { fullRuntimeQuestionPageMap } from '../../../h5-runtime-adapter.full';
import { createEvent, createRuntimeMachineState, mapSessionToPlayPageProgress, runtimeReducer } from '../../../h5-runtime-state-machine';
import type { RuntimeMachineEvent, RuntimeMachineState } from '../../../h5-runtime-events.schema';

export interface SessionPlan {
  machineId: string;
  title: string;
  questionIds: string[];
}

export interface RuntimeMachineDemoController {
  state: RuntimeMachineState | null;
  progress: ReturnType<typeof mapSessionToPlayPageProgress> | null;
  questionIds: string[];
  emit: <T extends RuntimeMachineEvent['type']>(
    type: T,
    payload: Extract<RuntimeMachineEvent, { type: T }>['payload'],
    atMs?: number,
  ) => void;
  restart: () => void;
  clearSnapshot: () => void;
}

const STORAGE_NAMESPACE = 'ymo.h5.mvp.full';

export function useRuntimeMachineDemo(plan: SessionPlan | null): RuntimeMachineDemoController {
  const storageDriver = useMemo(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return createLocalStorageDriver(window.localStorage);
    }
    return new MemoryStorageDriver();
  }, []);

  const persistence = useMemo(
    () =>
      createRuntimePersistenceAdapter(storageDriver, {
        appNamespace: STORAGE_NAMESPACE,
        snapshotVersion: 'v2',
      }),
    [storageDriver],
  );

  const questionIds = plan?.questionIds ?? [];
  const questionMap = useMemo(
    () =>
      Object.fromEntries(
        questionIds
          .map((id) => [id, fullRuntimeQuestionPageMap[id]] as const)
          .filter(([, item]) => !!item),
      ) as Record<string, (typeof fullRuntimeQuestionPageMap)[keyof typeof fullRuntimeQuestionPageMap]>,
    [questionIds],
  );
  const questionKey = questionIds.join('|');
  const [state, setState] = useState<RuntimeMachineState | null>(null);
  const startedRef = useRef<string | null>(null);

  const buildInitialState = useCallback(() => {
    if (!plan || Object.keys(questionMap).length === 0) return null;
    const hydrated = persistence.hydrateMachineState(plan.machineId, questionMap);
    if (hydrated) return hydrated;
    return createRuntimeMachineState({
      machineId: plan.machineId,
      mode: 'mixed_challenge',
      questions: questionMap,
      sessionOptions: {
        sessionId: `${plan.machineId}-session`,
        createdAtMs: Date.now(),
        questionTimersMs: Object.fromEntries(
          Object.entries(questionMap).map(([id, vm]) => [id, (vm.interaction.timerSeconds ?? 30) * 1000]),
        ),
      },
    });
  }, [persistence, plan, questionMap]);

  useEffect(() => {
    startedRef.current = null;
    setState(buildInitialState());
  }, [buildInitialState, questionKey, plan?.machineId]);

  const emit = useCallback(
    (
      type: RuntimeMachineEvent['type'],
      payload: RuntimeMachineEvent['payload'],
      atMs = Date.now(),
    ) => {
      setState((prev) => {
        if (!prev) return prev;
        return runtimeReducer(prev, createEvent(type as never, payload as never, atMs), {
          autoAdvanceAfterSubmit: false,
          autoFinalizeWhenComplete: true,
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!state || !plan) return;
    persistence.saveMachineState(state, { planTitle: plan.title });
  }, [state, persistence, plan]);

  useEffect(() => {
    if (!state?.currentQuestionId) return;
    if (state.session.status !== 'idle') return;
    if (startedRef.current === state.machineId) return;
    startedRef.current = state.machineId;
    emit('START_SESSION', { questionId: state.currentQuestionId });
  }, [emit, state?.currentQuestionId, state?.machineId, state?.session.status]);

  useEffect(() => {
    if (!state) return;
    if (state.phase === 'completed' || state.phase === 'paused' || state.phase === 'error') return;
    const timer = window.setInterval(() => {
      emit('TIMER_TICK', { nowMs: Date.now() });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [emit, state?.machineId, state?.phase]);

  const restart = useCallback(() => {
    emit('RESTART_SESSION', { nowMs: Date.now() });
  }, [emit]);

  const clearSnapshot = useCallback(() => {
    if (!plan) return;
    persistence.deleteMachineSnapshot(plan.machineId);
    startedRef.current = null;
    setState(buildInitialState());
  }, [buildInitialState, persistence, plan]);

  return {
    state,
    progress: state ? mapSessionToPlayPageProgress(state) : null,
    questionIds,
    emit,
    restart,
    clearSnapshot,
  };
}
