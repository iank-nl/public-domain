import type { Lang } from './index';

/** Client quotes for the Testimonials component. Replace every [TODO] before publishing. */
export const testimonialLabels = {
  en: { tag: 'What clients say' },
  nl: { tag: 'Wat klanten zeggen' },
};

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const testimonials: Record<Lang, Testimonial[]> = {
  en: [
    {
      quote: '[TODO: testimonial from a security or code review client, one or two sentences about the result]',
      name: '[TODO: name]',
      role: '[TODO: role, e.g. CTO]',
      company: '[TODO: company type, e.g. SaaS company]',
    },
    {
      quote: '[TODO: testimonial from an agency you did white-label work for]',
      name: '[TODO: name]',
      role: '[TODO: role, e.g. agency owner]',
      company: '[TODO: company type, e.g. digital agency]',
    },
    {
      quote: '[TODO: testimonial from a server management or retainer client]',
      name: '[TODO: name]',
      role: '[TODO: role, e.g. operations manager]',
      company: '[TODO: company type, e.g. online retailer]',
    },
  ],
  nl: [
    {
      quote: '[TODO: testimonial van een klant voor een security- of codereview, een of twee zinnen over het resultaat]',
      name: '[TODO: naam]',
      role: '[TODO: functie, bijv. CTO]',
      company: '[TODO: type bedrijf, bijv. SaaS-bedrijf]',
    },
    {
      quote: '[TODO: testimonial van een bureau waarvoor je white-label werk deed]',
      name: '[TODO: naam]',
      role: '[TODO: functie, bijv. eigenaar bureau]',
      company: '[TODO: type bedrijf, bijv. digitaal bureau]',
    },
    {
      quote: '[TODO: testimonial van een klant voor serverbeheer of een beheerabonnement]',
      name: '[TODO: naam]',
      role: '[TODO: functie, bijv. operationeel manager]',
      company: '[TODO: type bedrijf, bijv. webwinkel]',
    },
  ],
};
