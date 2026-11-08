import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/relic-sweeper/*/*.png', { eager: true });

function shot(lang: Lang, name: string) {
  return files[`/src/assets/relic-sweeper/${lang}/${name}.png`].default;
}

export function screenshots(lang: Lang) {
  return {
    board: shot(lang, '01_board'),
    reveal: shot(lang, '02_exhibit_reveal'),
    museum: shot(lang, '03_museum'),
    map: shot(lang, '05_expedition_map'),
    big: shot(lang, '06_classic_master'),
  };
}
