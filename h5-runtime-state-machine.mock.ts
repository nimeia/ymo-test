import { mockRuntimeQuestionPageMap } from './h5-runtime-adapter.mock';
import { createEvent, createRuntimeMachineState, dispatchRuntimeEvents, mapSessionToPlayPageProgress } from './h5-runtime-state-machine';
import type { RuntimeMachineEvent } from './h5-runtime-events.schema';

const questionIds = ['36Y-1', '36Y-2', '36Y-10', '36Y-7'];
const questionMap = Object.fromEntries(questionIds.map((id) => [id, mockRuntimeQuestionPageMap[id]]));

export const mockRuntimeMachineInitialState = createRuntimeMachineState({
  machineId: 'runtime-machine-demo',
  mode: 'mixed_challenge',
  questions: questionMap,
  sessionOptions: {
    sessionId: 'demo-session-001',
    createdAtMs: 1711180800000,
    questionTimersMs: {
      '36Y-1': 15000,
      '36Y-2': 15000,
      '36Y-10': 20000,
      '36Y-7': 20000,
    },
  },
});

export const mockRuntimeEventFlow: RuntimeMachineEvent[] = [
  createEvent('START_SESSION', { questionId: '36Y-1' }, 1711180801000),
  createEvent('CHANGE_DRAFT', { questionId: '36Y-1', answer: { kind: 'numeric', value: 100 }, meta: { touched: true, dirty: true, source: 'keyboard' } }, 1711180803000),
  createEvent('SUBMIT_CURRENT_QUESTION', { questionId: '36Y-1' }, 1711180805000),
  createEvent('GO_TO_NEXT_QUESTION', { autoStart: true }, 1711180806000),
  createEvent('CHANGE_DRAFT', { questionId: '36Y-2', answer: { kind: 'choice', optionIds: ['opt-c'] }, meta: { touched: true, dirty: true, source: 'pointer' } }, 1711180808000),
  createEvent('SUBMIT_CURRENT_QUESTION', { questionId: '36Y-2' }, 1711180810000),
  createEvent('OPEN_REVIEW', { questionId: '36Y-2' }, 1711180812000),
  createEvent('GO_TO_NEXT_QUESTION', { autoStart: true }, 1711180813000),
  createEvent('CHANGE_DRAFT', { questionId: '36Y-10', answer: { kind: 'hotspot_selection', hotspotIds: ['hs-square-1', 'hs-square-2', 'hs-square-3', 'hs-square-4', 'hs-square-big'] }, meta: { touched: true, dirty: true, source: 'pointer' } }, 1711180816000),
  createEvent('SUBMIT_CURRENT_QUESTION', { questionId: '36Y-10' }, 1711180819000),
  createEvent('GO_TO_NEXT_QUESTION', { autoStart: true }, 1711180821000),
  createEvent('CHANGE_DRAFT', { questionId: '36Y-7', answer: { kind: 'choice', optionIds: ['opt-yellow'] }, meta: { touched: true, dirty: true, source: 'pointer' } }, 1711180824000),
  createEvent('SUBMIT_CURRENT_QUESTION', { questionId: '36Y-7' }, 1711180826000),
  createEvent('FINALIZE_SESSION', {}, 1711180828000),
];

export const mockRuntimeMachineFinalState = dispatchRuntimeEvents(
  mockRuntimeMachineInitialState,
  mockRuntimeEventFlow,
);

export const mockRuntimeMachineSummary = {
  machineId: mockRuntimeMachineFinalState.machineId,
  phase: mockRuntimeMachineFinalState.phase,
  currentQuestionId: mockRuntimeMachineFinalState.currentQuestionId,
  progress: mapSessionToPlayPageProgress(mockRuntimeMachineFinalState),
  totals: mockRuntimeMachineFinalState.session.totals,
  resultPage: mockRuntimeMachineFinalState.session.resultPage,
  wrongBook: mockRuntimeMachineFinalState.session.wrongBook,
  eventLogTail: mockRuntimeMachineFinalState.eventLog.slice(-6),
};

export const mockPausedMachineState = dispatchRuntimeEvents(mockRuntimeMachineInitialState, [
  createEvent('START_SESSION', { questionId: '36Y-1' }, 1711180801000),
  createEvent('TIMER_TICK', { nowMs: 1711180804000 }, 1711180804000),
  createEvent('PAUSE_SESSION', {}, 1711180805000),
]);

export const mockRestartedMachineState = dispatchRuntimeEvents(mockRuntimeMachineFinalState, [
  createEvent('RESTART_SESSION', { nowMs: 1711180900000 }, 1711180900000),
]);
