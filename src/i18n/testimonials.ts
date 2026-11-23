import type { Lang } from './index';

/**
 * Client quotes for the Testimonials component. The block stays hidden while a list is empty.
 * Only add real quotes, with a generic attribution and no names or company details, e.g.:
 *   { quote: 'Clear findings and the fixes were done within a week.', attribution: 'CTO, SaaS company' }
 */
export const testimonialLabels = {
  en: { tag: 'What clients say' },
  nl: { tag: 'Wat klanten zeggen' },
};

interface Testimonial {
  quote: string;
  /** Role and type of organisation, e.g. "Owner, digital agency". */
  attribution: string;
}

export const testimonials: Record<Lang, Testimonial[]> = {
  en: [],
  nl: [],
};
