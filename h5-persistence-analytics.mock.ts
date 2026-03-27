import { mockRuntimeEventFlow, mockRuntimeMachineFinalState, mockRuntimeMachineInitialState } from './h5-runtime-state-machine.mock';
import { runtimeReducer } from './h5-runtime-state-machine';
import { MemoryStorageDriver, createRuntimeAnalyticsTracker, createRuntimePersistenceAdapter, BufferedAnalyticsSink } from './h5-persistence-adapter';
import { mockRuntimeQuestionPageMap } from './h5-runtime-adapter.mock';

export const mockPersistenceDriver = new MemoryStorageDriver();

export const mockPersistenceAdapter = createRuntimePersistenceAdapter(mockPersistenceDriver, {
  appNamespace: 'ymo.h5.demo',
  snapshotVersion: '1',
  maxSnapshotCount: 8,
  eventLogTailLimit: 12,
});

export const mockAnalyticsSink = new BufferedAnalyticsSink();
export const mockAnalyticsTracker = createRuntimeAnalyticsTracker(mockAnalyticsSink, {
  includeTimerTicks: false,
  includeDraftChanged: true,
  traceId: 'trace-demo-001',
});

let previousState = mockRuntimeMachineInitialState;
export const mockTrackedAnalyticsEvents = mockRuntimeEventFlow.flatMap((event: import('./h5-runtime-events.schema').RuntimeMachineEvent) => {
  const nextState = runtimeReducer(previousState, event);
  const analyticsEvents = mockAnalyticsTracker.trackTransition({
    event,
    before: previousState,
    after: nextState,
  });
  previousState = nextState;
  return analyticsEvents;
});

export const mockSavedSnapshot = mockPersistenceAdapter.saveMachineState(mockRuntimeMachineFinalState, {
  source: 'mock-flow',
});

export const mockLoadedSnapshot = mockPersistenceAdapter.loadMachineSnapshot(mockRuntimeMachineFinalState.machineId);

export const mockHydratedMachineState = mockPersistenceAdapter.hydrateMachineState(
  mockRuntimeMachineFinalState.machineId,
  mockRuntimeQuestionPageMap,
);

export const mockAnalyticsBufferRecord = mockPersistenceAdapter.saveAnalyticsBuffer(
  mockRuntimeMachineFinalState.machineId,
  mockTrackedAnalyticsEvents,
);

export const mockPersistenceSummary = {
  snapshots: mockPersistenceAdapter.listSnapshots(),
  savedSnapshotMeta: mockSavedSnapshot.meta,
  loadedFound: mockLoadedSnapshot.found,
  hydratedPhase: mockHydratedMachineState?.phase,
  hydratedCurrentQuestionId: mockHydratedMachineState?.currentQuestionId,
  analyticsBufferedCount: mockAnalyticsBufferRecord.events.length,
  analyticsPreview: mockTrackedAnalyticsEvents.slice(0, 6).map((item: import('./h5-persistence-analytics.schema').RuntimeAnalyticsEvent) => ({
    name: item.name,
    questionId: item.context.question?.questionId,
    phase: item.context.phase,
  })),
};

export const mockDeleteResults = {
  removedAnalyticsBuffer: mockPersistenceAdapter.clearAnalyticsBuffer(mockRuntimeMachineFinalState.machineId),
  removedSnapshot: mockPersistenceAdapter.deleteMachineSnapshot(mockRuntimeMachineFinalState.machineId),
};
