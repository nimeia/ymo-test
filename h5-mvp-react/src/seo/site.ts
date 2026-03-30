import { fullQuestionBankConfig } from '../../../h5-question-bank.full';
import seoCatalog from './catalog.json';
import type { ModuleId } from '../../../h5-question-bank.types';

const moduleKeyById = Object.fromEntries(fullQuestionBankConfig.modules.map((module) => [module.id, module.key])) as Record<ModuleId, string>;

export const seoLinks = {
  topics: seoCatalog.topics,
  guides: seoCatalog.guides,
  series: seoCatalog.series ?? [],
  featuredQuestionPages: seoCatalog.featuredQuestionPages,
};

export function toModuleSeoPath(moduleId: ModuleId): string {
  return `/modules/${moduleKeyById[moduleId]}/`;
}

export function toPaperSeoPath(code: string): string {
  return `/papers/${code.toLowerCase()}/`;
}

export function toQuestionSeoPath(questionId: string): string {
  return `/questions/${questionId.toLowerCase()}/`;
}

export function getSiteOrigin(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'https://example.com';
}
