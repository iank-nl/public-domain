import { getCollection, type CollectionEntry } from 'astro:content';
import { en } from './en';
import { nl } from './nl';

export type Lang = 'en' | 'nl';
export type Track = 'software' | 'product' | 'workflow' | 'foundations';
export type Article = CollectionEntry<'knowledge'>;

export const trackTones: Record<Track, string> = {
  software: 'tone-4',
  product: 'tone-1',
  workflow: 'tone-2',
  foundations: 'tone-3',
};
export const dictionaries = { en, nl };

/** Paths for every page under src/pages/[...locale]/. English has no prefix. */
export function localePaths() {
  return [
    { params: { locale: undefined }, props: { lang: 'en' as Lang } },
    { params: { locale: 'nl' }, props: { lang: 'nl' as Lang } },
  ];
}

export function href(lang: Lang, path: string) {
  return lang === 'en' ? path : `/nl${path}`;
}

export function slugOf(article: Article) {
  return article.id.split('/').slice(1).join('/');
}

export async function getArticles(lang: Lang) {
  const all = await getCollection('knowledge', (entry) => entry.id.startsWith(`${lang}/`));
  return all.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime() || a.data.title.localeCompare(b.data.title),
  );
}

export function formatDate(lang: Lang, date: Date) {
  return new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}

export function readingMinutes(body: string | undefined) {
  const words = (body ?? '').replace(/^import .*$/gm, '').split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
