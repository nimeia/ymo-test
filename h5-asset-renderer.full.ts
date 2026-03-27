import { mockAssetRendererBundle } from './h5-asset-renderer.mock';
import { fullQuestionContentRecords } from './h5-question-content.full';
import type { AssetItem, AssetRendererBundle } from './h5-asset-renderer.schema';

const FULL_IMAGE_KEYS = Array.from(
  new Set(
    fullQuestionContentRecords.flatMap((record) => record.assets.imageKeys ?? []),
  ),
).sort();

const EXTRA_IMAGE_ASSETS: AssetItem[] = FULL_IMAGE_KEYS.filter(
  (key) => !mockAssetRendererBundle.assets.some((asset) => asset.key === key),
).map((key) => {
  const paper = key.split('-')[0];
  return {
    key,
    kind: 'image',
    path: `/assets/questions/${paper}/${key}`,
    width: 1200,
    height: 900,
    alpha: true,
    fitSuggested: 'contain',
    background: 'transparent',
    preload: false,
    tags: ['question', paper],
  } satisfies AssetItem;
});

const paperGroups = Array.from(new Set(FULL_IMAGE_KEYS.map((key) => key.split('-')[0]))).map((paper) => ({
  key: `question_images_${paper.toLowerCase()}`,
  label: `${paper} 题图`,
  assetKeys: FULL_IMAGE_KEYS.filter((key) => key.startsWith(`${paper}-`)),
}));

export const fullAssetRendererBundle: AssetRendererBundle = {
  ...mockAssetRendererBundle,
  assets: [...mockAssetRendererBundle.assets, ...EXTRA_IMAGE_ASSETS],
  groups: [...mockAssetRendererBundle.groups, ...paperGroups],
};
