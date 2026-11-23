# Search Console and Bing Webmaster Tools

Manual steps to get iank.nl into Google Search Console and Bing Webmaster Tools. This file lives in the repo root on purpose: everything in `docs/` is published.

What the site already provides:

- `https://iank.nl/sitemap-index.xml`, with every EN and NL page and hreflang pairs (404 is left out).
- `https://iank.nl/robots.txt`, which points to the sitemap.
- A unique title and description, a canonical URL and `hreflang` links (en, nl, x-default) on every page.

## 1. Verify the domain in Google Search Console (Cloudflare DNS)

1. Go to <https://search.google.com/search-console> and choose **Add property** → **Domain**. Enter `iank.nl` (no `https://`, no `www`). A domain property covers http/https, every subdomain, and `/nl/`.
2. Google shows a TXT record like `google-site-verification=…`. Copy it.
3. In Cloudflare: **iank.nl** → **DNS** → **Records** → **Add record**.
   - Type: `TXT`
   - Name: `@`
   - Content: the full `google-site-verification=…` value
   - TTL: Auto
4. Back in Search Console, click **Verify**. It is usually instant. If it fails, wait a few minutes and try again.

Leave the TXT record in place. Removing it un-verifies the property.

The meta-tag fallback: if you ever need the **URL prefix** method instead, put the code in `verification.google` in `src/site.config.ts` and rebuild. The tag is only output when the field is filled in.

## 2. Submit the sitemap

1. Search Console → **Sitemaps**.
2. Enter `sitemap-index.xml` and click **Submit**.
3. The status should show **Success** with about 40 discovered pages.

## 3. Import the site into Bing Webmaster Tools

1. Go to <https://www.bing.com/webmasters> and sign in.
2. Choose **Import from Google Search Console** and allow access. Bing copies the verified site and its sitemaps, so no DNS record is needed for Bing.
3. Check under **Sitemaps** that `https://iank.nl/sitemap-index.xml` is listed. Add it by hand if it isn't.

Fallback without the import: add the site manually and verify with Bing's CNAME/XML option, or put the code in `verification.bing` in `src/site.config.ts` (output as `msvalidate.01`).

## 4. What to check after 2 to 4 weeks

Data trickles in over the first weeks, so judge trends, not single days.

- **Pages → Indexed / Not indexed** (Search Console): are the offers, service, case-study and article pages indexed in both languages? For anything under "Not indexed", read the reason. "Crawled, currently not indexed" on a few pages is normal early on. "Duplicate, Google chose different canonical" between an EN and NL page points to an hreflang problem.
- **Performance → Queries**: which searches show the site (impressions) and which get clicks. Look for queries that match an offer, such as Laravel security audit, serverbeheer uitbesteden or AWS cost review, and note which page ranks for them.
- **Performance → Pages**: impressions and CTR per page. A page with many impressions and few clicks is a candidate for a better title or description.
- **EN vs NL**: in Performance, filter **Page** on URLs containing `/nl/`, and compare with the rest. Also look at **Countries** (Netherlands/Belgium vs. elsewhere). If Dutch searchers land on English pages, check the hreflang links.
- **Bing**: the same checks under **Search Performance** and **Site Explorer**.
- **Compare with Umami**: which landing pages and referrers end in `book-call`, `offer-quote` or `intake-submit` events.
