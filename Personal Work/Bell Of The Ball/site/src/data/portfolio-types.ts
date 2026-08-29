/*
 * Shapes shared by the build-time loader (src/data/portfolio.ts, which reads
 * the filesystem) and the browser-side grid. Kept apart from the loader so the
 * React island never pulls `node:fs` into the client bundle.
 */

export type PortfolioCategory = string;

export interface PortfolioPhoto {
  src: string;
  alt: string;
}

export interface PortfolioEvent {
  slug: string;
  title: string;
  description: string;
  category: PortfolioCategory;
  /** Human-readable, e.g. "June 2025". Omitted until the client confirms. */
  date?: string;
  /** Facet variant for the grid tile. */
  shape: number;
  cover: PortfolioPhoto;
  /** Shown in the lightbox, after the cover. Loaded only when opened. */
  photos: PortfolioPhoto[];
}

export interface PortfolioData {
  events: PortfolioEvent[];
  /** Filter bar options: 'All' followed by every category folder that has events. */
  categories: Array<PortfolioCategory | 'All'>;
}
