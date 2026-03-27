import type { ChangeEvent } from 'react';
import type { GridCell, QuestionWidgetSchema } from '../../../h5-question-bank.types';
import type { RuntimeSubmissionAnswer } from '../../../h5-runtime-judge.schema';

interface Props {
  widget: QuestionWidgetSchema;
  draft?: RuntimeSubmissionAnswer;
  hotspotCount?: number;
  onChange: (answer: RuntimeSubmissionAnswer | undefined) => void;
}

function getChoiceIds(answer?: RuntimeSubmissionAnswer): string[] {
  return answer?.kind === 'choice' ? answer.optionIds : [];
}

function getTextInputValue(answer?: RuntimeSubmissionAnswer): string {
  if (answer?.kind === 'numeric') return String(answer.value ?? '');
  if (answer?.kind === 'free_text') return answer.text ?? '';
  return '';
}

function getGridValue(answer: RuntimeSubmissionAnswer | undefined, cellId: string): string {
  if (answer?.kind !== 'grid_fill') return '';
  return String(answer.cells[cellId] ?? '');
}

function getSlotValue(answer: RuntimeSubmissionAnswer | undefined, slotId: string): string {
  if (answer?.kind !== 'slot_mapping') return '';
  const value = answer.mapping[slotId];
  if (Array.isArray(value)) return value[0] ?? '';
  return String(value ?? '');
}

function toggleChoice(current: string[], optionId: string, multi: boolean): string[] {
  if (multi) {
    return current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId];
  }
  return [optionId];
}

export function QuestionInteractionPanel({ widget, draft, hotspotCount, onChange }: Props) {
  if (widget.kind === 'text_input') {
    const isTextMode = widget.keyboard === 'text' || widget.answerFormat === 'text';
    return (
      <div className="panel-section">
        <label className="field-label">请输入答案</label>
        <input
          className="number-input"
          inputMode={isTextMode ? 'text' : 'numeric'}
          placeholder={widget.placeholder}
          value={getTextInputValue(draft)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            if (!value) {
              onChange(undefined);
              return;
            }
            onChange(
              isTextMode
                ? {
                    kind: 'free_text',
                    text: value,
                  }
                : {
                    kind: 'numeric',
                    value,
                  },
            );
          }}
        />
      </div>
    );
  }

  if (widget.kind === 'single_choice' || widget.kind === 'multi_choice') {
    const selected = getChoiceIds(draft);
    const multi = widget.kind === 'multi_choice';
    return (
      <div className="panel-section">
        <div className="choice-grid">
          {widget.options.map((option) => {
            const active = selected.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                className={`choice-chip ${active ? 'is-active' : ''}`}
                onClick={() =>
                  onChange({
                    kind: 'choice',
                    optionIds: toggleChoice(selected, option.id, multi),
                  })
                }
              >
                <span className="choice-label">{option.label}</span>
                <span className="choice-value">{String(option.value)}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (widget.kind === 'drag_number_grid') {
    return (
      <div className="panel-section">
        <div className="grid-board" style={{ gridTemplateColumns: `repeat(${inferGridCols(widget.cells)}, minmax(56px, 1fr))` }}>
          {widget.cells.map((cell) => (
            <GridCellEditor
              key={cell.id}
              cell={cell}
              value={getGridValue(draft, cell.id)}
              tokens={widget.tokens.map((token) => String(token.value))}
              onChange={(value) =>
                onChange({
                  kind: 'grid_fill',
                  cells: {
                    ...(draft?.kind === 'grid_fill' ? draft.cells : {}),
                    [cell.id]: value,
                  },
                })
              }
            />
          ))}
        </div>
      </div>
    );
  }

  if (
    widget.kind === 'drag_number_slots' ||
    widget.kind === 'drag_blank' ||
    widget.kind === 'drag_symbol' ||
    widget.kind === 'drag_drop'
  ) {
    return (
      <div className="panel-section">
        <div className="slot-list">
          {widget.slots.map((slot) => (
            <label key={slot.id} className="slot-item">
              <span className="field-label">{slot.placeholder ?? slot.id}</span>
              <select
                className="select-input"
                value={getSlotValue(draft, slot.id)}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  onChange({
                    kind: 'slot_mapping',
                    mapping: {
                      ...(draft?.kind === 'slot_mapping' ? draft.mapping : {}),
                      [slot.id]: event.target.value,
                    },
                  })
                }
              >
                <option value="">请选择</option>
                {widget.tokens.map((token) => (
                  <option key={token.id} value={token.id}>
                    {token.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (widget.kind === 'click_highlight' || widget.kind === 'click_count') {
    const selected = draft?.kind === 'hotspot_selection' ? draft.hotspotIds : [];
    return (
      <div className="panel-section">
        <div className="hint-box">{widget.targetHint}</div>
        <div className="click-answer-card">
          <div>
            <div className="field-label">当前已点选</div>
            <strong>
              {selected.length}
              {hotspotCount ? ` / ${hotspotCount}` : ''}
            </strong>
          </div>
          <button className="ghost-button" type="button" onClick={() => onChange(undefined)}>
            清空当前点选
          </button>
        </div>
      </div>
    );
  }

  if (
    widget.kind === 'rotate_cube' ||
    widget.kind === 'observe_3d' ||
    widget.kind === 'animation_demo' ||
    widget.kind === 'step_animation'
  ) {
    const selected = getChoiceIds(draft);
    return (
      <div className="panel-section">
        <div className="hint-box">{widget.targetHint}</div>
        {widget.options?.length ? (
          <div className="choice-grid">
            {widget.options.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`choice-chip ${selected.includes(option.id) ? 'is-active' : ''}`}
                onClick={() => onChange({ kind: 'choice', optionIds: [option.id] })}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="placeholder-box">当前题型只接了观察区，正式动画资源后续替换。</div>
        )}
      </div>
    );
  }

  return (
    <div className="panel-section">
      <div className="placeholder-box">当前 widget = {widget.kind}，建议用自定义 renderer 继续扩展。</div>
      <textarea
        className="json-textarea"
        placeholder="输入 JSON payload"
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(
            event.target.value
              ? {
                  kind: 'custom',
                  payload: { raw: event.target.value },
                }
              : undefined,
          )
        }
      />
    </div>
  );
}

function inferGridCols(cells: GridCell[]): number {
  return Math.max(...cells.map((cell) => cell.col), 1);
}

function GridCellEditor({
  cell,
  value,
  tokens,
  onChange,
}: {
  cell: GridCell;
  value: string;
  tokens: string[];
  onChange: (value: string) => void;
}) {
  if (cell.locked) {
    return <div className="grid-cell is-locked">{String(cell.presetValue ?? '')}</div>;
  }

  return (
    <label className="grid-cell">
      <select className="grid-select" value={value} onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}>
        <option value="">-</option>
        {tokens.map((token) => (
          <option key={token} value={token}>
            {token}
          </option>
        ))}
      </select>
    </label>
  );
}
