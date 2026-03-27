import { useEffect, useMemo, useState } from 'react';
import type { HotspotGeometry } from '../../../h5-question-content.schema';
import type { RuntimeQuestionPageViewModel, RuntimeStemBlockViewModel } from '../../../h5-runtime-adapter';
import type { RuntimeSubmissionAnswer } from '../../../h5-runtime-judge.schema';
import { getQuestionVisualMeta, resolveQuestionImagePath } from '../lib/questionVisuals';

interface Props {
  question: RuntimeQuestionPageViewModel;
  item: RuntimeStemBlockViewModel;
  draft?: RuntimeSubmissionAnswer;
  onChange?: (answer: RuntimeSubmissionAnswer | undefined) => void;
}

export function QuestionFigureRenderer({ question, item, draft, onChange }: Props) {
  const [zoomed, setZoomed] = useState(false);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const meta = useMemo(() => getQuestionVisualMeta(question), [question]);
  const block = item.block;

  if (block.type !== 'image') return null;

  const src = item.resolvedAsset?.path ?? resolveQuestionImagePath(block.imageKey);
  const blockHotspots = question.hotspots.filter((hotspot) => hotspot.imageKey === block.imageKey);
  const layerOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        blockHotspots
          .map((hotspot) => (typeof hotspot.meta?.layer === 'string' ? hotspot.meta.layer : null))
          .filter((value): value is string => !!value),
      ),
    );
    return values;
  }, [blockHotspots]);

  useEffect(() => {
    setActiveLayer(layerOptions[0] ?? null);
  }, [question.questionId, layerOptions]);

  const selectedIds = draft?.kind === 'hotspot_selection' ? draft.hotspotIds : [];
  const hotspotWidget = question.interaction.widget.kind === 'click_highlight' || question.interaction.widget.kind === 'click_count'
    ? question.interaction.widget
    : null;
  const supportsDirectClick = blockHotspots.length > 0 && !!onChange;
  const visibleHotspots =
    layerOptions.length > 1 && activeLayer
      ? blockHotspots.filter((hotspot) => hotspot.meta?.layer === activeLayer)
      : blockHotspots;
  const stageClass = `figure-stage family-${meta.family} aspect-${meta.preferredAspect ?? 'wide'}`;

  return (
    <>
      <figure className={stageClass} style={{ ['--figure-accent' as string]: meta.accent }}>
        <div className="figure-toolbar">
          <div>
            <span className="figure-badge">{meta.label}</span>
            <strong className="figure-title">{block.alt ?? question.question.title}</strong>
          </div>
          <div className="figure-toolbar-actions">
            {supportsDirectClick ? (
              <span className="figure-counter">
                已点 {selectedIds.length} / {question.judge.answer?.kind === 'hotspot_selection' ? question.judge.answer.hotspotIds.length : blockHotspots.length}
              </span>
            ) : null}
            <button className="ghost-button" type="button" onClick={() => setZoomed(true)}>
              放大看图
            </button>
          </div>
        </div>

        {layerOptions.length > 1 ? (
          <div className="figure-layer-bar">
            {layerOptions.map((layer) => (
              <button
                key={layer}
                type="button"
                className={`figure-layer-chip ${activeLayer === layer ? 'is-active' : ''}`}
                onClick={() => setActiveLayer(layer)}
              >
                {formatLayerLabel(layer)}
              </button>
            ))}
          </div>
        ) : null}

        <div className={`figure-canvas-wrap ${supportsDirectClick ? 'is-interactive' : ''}`}>
          <div className="figure-canvas-grid" aria-hidden="true" />
          <img className="figure-image" src={src} alt={block.alt ?? question.question.title} loading="lazy" />
          {supportsDirectClick ? (
            <svg className="figure-hotspot-svg" viewBox="0 0 1 1" preserveAspectRatio="none">
              {visibleHotspots.map((hotspot) => {
                const selected = selectedIds.includes(hotspot.id);
                return (
                  <g
                    key={hotspot.id}
                    className={`hotspot-group ${selected ? 'is-active' : ''} style-${String(hotspot.meta?.displayStyle ?? 'default')}`}
                    onClick={(event: { stopPropagation: () => void }) => {
                      event.stopPropagation();
                      onChange?.({
                        kind: 'hotspot_selection',
                        hotspotIds: toggleHotspotId(
                          selectedIds,
                          hotspot.id,
                          hotspotWidget?.maxSelectable,
                        ),
                      });
                    }}
                  >
                    {renderHotspotShape(hotspot.geometry)}
                    {shouldRenderHotspotLabel(hotspot) ? renderHotspotLabel(hotspot.geometry, getHotspotLabel(hotspot)) : null}
                  </g>
                );
              })}
            </svg>
          ) : null}
        </div>

        <div className="figure-hints">
          {meta.hints.map((hint) => (
            <span key={hint} className="figure-hint-chip">
              {hint}
            </span>
          ))}
          {supportsDirectClick ? <span className="figure-hint-chip is-accent">支持图上直接点选作答</span> : null}
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
            <div className="image-modal-body is-figure-modal">
              <div className="image-modal-figure-wrap">
                <img className="image-modal-img" src={src} alt={block.alt ?? question.question.title} />
                {supportsDirectClick ? (
                  <svg className="figure-hotspot-svg is-modal" viewBox="0 0 1 1" preserveAspectRatio="none">
                    {visibleHotspots.map((hotspot) => {
                      const selected = selectedIds.includes(hotspot.id);
                      return (
                        <g key={hotspot.id} className={`hotspot-group ${selected ? 'is-active' : ''} style-${String(hotspot.meta?.displayStyle ?? 'default')}`}>
                          {renderHotspotShape(hotspot.geometry)}
                          {shouldRenderHotspotLabel(hotspot) ? renderHotspotLabel(hotspot.geometry, getHotspotLabel(hotspot)) : null}
                        </g>
                      );
                    })}
                  </svg>
                ) : null}
              </div>
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

function formatLayerLabel(layer: string): string {
  return layer.replace('x', ' × ');
}

function toggleHotspotId(selectedIds: string[], hotspotId: string, maxSelectable?: number): string[] {
  if (selectedIds.includes(hotspotId)) {
    return selectedIds.filter((item) => item !== hotspotId);
  }
  if (maxSelectable && selectedIds.length >= maxSelectable) {
    return selectedIds;
  }
  return [...selectedIds, hotspotId];
}

function renderHotspotShape(geometry: HotspotGeometry) {
  if (geometry.shape === 'circle') {
    return <circle className="hotspot-shape" cx={geometry.cx} cy={geometry.cy} r={geometry.r} />;
  }
  if (geometry.shape === 'rect') {
    return <rect className="hotspot-shape" x={geometry.x} y={geometry.y} width={geometry.width} height={geometry.height} rx={0.01} />;
  }
  return <polygon className="hotspot-shape" points={geometry.points.map((point) => `${point.x},${point.y}`).join(' ')} />;
}

function renderHotspotLabel(geometry: HotspotGeometry, label: string) {
  const center = getHotspotCenter(geometry);
  return (
    <text className="hotspot-label" x={center.x} y={center.y} textAnchor="middle" dominantBaseline="middle">
      {label}
    </text>
  );
}

function getHotspotCenter(geometry: HotspotGeometry): { x: number; y: number } {
  if (geometry.shape === 'circle') {
    return { x: geometry.cx, y: geometry.cy };
  }
  if (geometry.shape === 'rect') {
    return { x: geometry.x + geometry.width / 2, y: geometry.y + geometry.height / 2 };
  }
  const xs = geometry.points.map((point) => point.x);
  const ys = geometry.points.map((point) => point.y);
  return {
    x: xs.reduce((sum, value) => sum + value, 0) / xs.length,
    y: ys.reduce((sum, value) => sum + value, 0) / ys.length,
  };
}

function shouldRenderHotspotLabel(hotspot: RuntimeQuestionPageViewModel['hotspots'][number]): boolean {
  const style = String(hotspot.meta?.displayStyle ?? '');
  return style === 'ghost-cube' || style === 'tile-gap';
}

function getHotspotLabel(hotspot: RuntimeQuestionPageViewModel['hotspots'][number]): string {
  const style = String(hotspot.meta?.displayStyle ?? '');
  if (style === 'ghost-cube') return '?';
  if (style === 'tile-gap') return '补';
  return hotspot.label;
}
