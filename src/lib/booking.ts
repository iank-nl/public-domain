import { site } from '../site.config';

/**
 * The Cal.com link with UTM parameters, which Cal.com stores with each booking and shows to the host
 * under the booking details. Only the button position and the page path go along, never personal data.
 */
export function bookingHref(position: string, page: string) {
  const url = new URL(site.bookingUrl);
  url.searchParams.set('utm_source', 'iank.nl');
  url.searchParams.set('utm_medium', position);
  url.searchParams.set('utm_content', page);
  return url.href;
}
