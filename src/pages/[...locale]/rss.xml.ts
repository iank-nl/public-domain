import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../../site.config';
import { dictionaries, getArticles, href, localePaths, slugOf, type Lang } from '../../i18n';

export function getStaticPaths() {
  return localePaths();
}

export async function GET(context: APIContext) {
  const lang = context.props.lang as Lang;
  const articles = await getArticles(lang);

  return rss({
    title: `${site.name}: ${dictionaries[lang].knowledge.title}`,
    description: dictionaries[lang].knowledge.lede,
    site: site.url,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.date,
      link: href(lang, `/knowledge/${slugOf(article)}/`),
    })),
  });
}
