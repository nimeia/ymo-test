import { useMemo, useState } from 'react';
import type { RuntimeQuestionPageViewModel, RuntimeStemBlockViewModel } from '../../../h5-runtime-adapter';
import { getQuestionVisualMeta, resolveQuestionImagePath } from '../lib/questionVisuals';

interface Props {
  question: RuntimeQuestionPageViewModel;
  item: RuntimeStemBlockViewModel;
}

export function QuestionFigureRenderer({ question, item }: Props) {
  const [zoomed, setZoomed] = useState(false);
  const meta = useMemo(() => getQuestionVisualMeta(question), [question]);
  const block = item.block;

  if (block.type !== 'image') return null;

  const src = item.resolvedAsset?.path ?? resolveQuestionImagePath(block.imageKey);
  const stageClass = `figure-stage family-${meta.family} aspect-${meta.preferredAspect ?? 'wide'}`;

  return (
    <>
      <figure className={stageClass} style={{ ['--figure-accent' as string]: meta.accent }}>
        <div className="figure-toolbar">
          <div>
            <span className="figure-badge">{meta.label}</span>
            <strong className="figure-title">{block.alt ?? question.question.title}</strong>
          </div>
          <button className="ghost-button" type="button" onClick={() => setZoomed(true)}>
            放大看图
          </button>
        </div>

        <div className="figure-canvas-wrap">
          <div className="figure-canvas-grid" aria-hidden="true" />
          <img className="figure-image" src={src} alt={block.alt ?? question.question.title} loading="lazy" />
        </div>

        <div className="figure-hints">
          {meta.hints.map((hint) => (
            <span key={hint} className="figure-hint-chip">
              {hint}
            </span>
          ))}
        </div>
      </figure>

      {zoomed && (
        <div className="image-modal-backdrop" role="presentation" onClick={() => setZoomed(false)}>
          <div className="image-modal-card" role="dialog" aria-modal="true" onClick={(event: { stopPropagation: () => void }) => event.stopPropagation()}>
            <div className="image-modal-head">
              <div>
                <div className="eyebrow">{meta.label}</div>
                <h3>{block.alt ?? question.question.title}</h3>
              </div>
              <button className="ghost-button" type="button" onClick={() => setZoomed(false)}>
                关闭
              </button>
            </div>
            <div className="image-modal-body">
              <img className="image-modal-img" src={src} alt={block.alt ?? question.question.title} />
            </div>
            <div className="image-modal-hints">
              {meta.hints.map((hint) => (
                <span key={hint} className="figure-hint-chip">
                  {hint}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
