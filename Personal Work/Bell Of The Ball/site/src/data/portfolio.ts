/*
 * Portfolio archive — read from the folder tree, not from a list in this file.
 *
 *   public/photos/portfolio/<category>/<event>/
 *
 * A folder IS an event. Drop a photo into it and the photo is in the event;
 * take it out and it's gone. Nothing here needs editing to add either one.
 * See public/photos/portfolio/_README.md for the maintenance workflow.
 *
 * This module runs at BUILD TIME only (it reads the filesystem), so it is
 * imported from portfolio.astro's frontmatter and the result is handed to the
 * grid as a prop. Types live in ./portfolio-types so the browser bundle can
 * import them without dragging `node:fs` along.
 *
 * The grid still renders one cover per event, so page weight stays flat as the
 * archive grows — an event's other photos only enter the DOM when its lightbox
 * opens.
 *
 * TODO(client) — DATES. `date` is optional and unset everywhere: nothing is
 * dated because no date is known, and inventing one on a portfolio piece is
 * exactly the kind of claim PRODUCT.md rules out. Add "date" to an event.json
 * and the lightbox renders it automatically.
 *
 * EXCLUDED, and must stay excluded (PRODUCT.md) — do not drop these into any
 * event folder:
 *   - table-4x3-01.jpg — a celebration-of-life table bearing a deceased
 *     person's photograph.
 *   - table-16x9-01.jpg — shows a real couple's full names and wedding date.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { PortfolioData, PortfolioEvent, PortfolioPhoto } from './portfolio-types';

const ARCHIVE_DIR = path.join(process.cwd(), 'public', 'photos', 'portfolio');
const PUBLIC_ROOT = '/photos/portfolio';
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

/** Folder name -> display label, for cases plain title-casing gets wrong. */
const CATEGORY_LABELS: Record<string, string> = {
  'rentals-and-products': 'Rentals & Products',
};

/** Filter-bar order. Categories not listed here follow, alphabetically. */
const CATEGORY_ORDER = ['Weddings', 'Corporate', 'Celebrations', 'Rentals & Products'];

/** Filenames that describe nothing, so they can't stand in as alt text. */
const PLACEHOLDER_NAME = /^(cover|img|image|photo|pic|dsc|dscn|p|final|edit|export)?[-_ ]?\d*$/i;

/** Facet variants the tiles can use; a slug with no explicit shape hashes into these. */
const SHAPE_POOL = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

interface EventManifest {
  title?: string;
  description?: string;
  date?: string;
  order?: number;
  shape?: number;
  /** Filename in this folder, or an absolute /photos/... path to borrow one. */
  cover?: string;
  /** Absolute /photos/... paths to photos that live outside this folder. */
  include?: string[];
  /** Filename or absolute path -> alt text. Anything missing falls back to the filename. */
  alt?: Record<string, string>;
}

/** "blue-wedding_dessert-table" -> "Blue wedding dessert table" */
function humanize(name: string): string {
  const words = name.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function titleCase(name: string): string {
  return name
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function readDirs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.') && !e.name.startsWith('_'))
    .map((e) => e.name)
    .sort();
}

function readImages(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && !e.name.startsWith('.') && IMAGE_EXT.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort();
}

function readManifest(dir: string): EventManifest {
  const file = path.join(dir, 'event.json');
  if (!fs.existsSync(file)) return {};
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as EventManifest;
  } catch (err) {
    throw new Error(`Invalid JSON in ${path.relative(process.cwd(), file)}: ${(err as Error).message}`);
  }
}

/** Stable per-slug facet, so tiles stay varied without anyone picking a number. */
function hashShape(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return SHAPE_POOL[h % SHAPE_POOL.length];
}

function buildEvent(
  categoryDir: string,
  category: string,
  slug: string
): { event: PortfolioEvent; order: number } | null {
  const dir = path.join(ARCHIVE_DIR, categoryDir, slug);
  const manifest = readManifest(dir);
  const files = readImages(dir);
  const borrowed = (manifest.include ?? []).filter((p) => typeof p === 'string' && p.startsWith('/'));

  // A filename resolves inside this folder; anything starting with / is a photo
  // that lives elsewhere on the site (a hero/services/about slot, say).
  const toSrc = (ref: string) => (ref.startsWith('/') ? ref : `${PUBLIC_ROOT}/${categoryDir}/${slug}/${ref}`);
  const title = manifest.title?.trim() || titleCase(slug);
  const altFor = (ref: string): string => {
    const written = manifest.alt?.[ref];
    if (written) return written;
    // No hand-written alt: the filename is the next best description — unless
    // it's a placeholder name like cover.jpg or IMG_2043.jpg, which says
    // nothing, in which case the event title at least gives some context.
    const base = path.basename(ref, path.extname(ref));
    return PLACEHOLDER_NAME.test(base) ? title : humanize(base);
  };
  const photo = (ref: string): PortfolioPhoto => ({ src: toSrc(ref), alt: altFor(ref) });

  // Cover: whatever event.json names, else a file called cover.*, else the
  // first photo in the folder alphabetically.
  const coverRef = manifest.cover ?? files.find((f) => /^cover\./i.test(f)) ?? files[0];
  if (!coverRef) {
    // A folder with no photos and no borrowed cover has nothing to show yet.
    return null;
  }

  const rest = [
    ...files.filter((f) => f !== coverRef),
    ...borrowed.filter((p) => p !== coverRef),
  ];

  return {
    event: {
      slug,
      title,
      description: manifest.description?.trim() ?? '',
      category,
      date: manifest.date,
      shape: manifest.shape ?? hashShape(slug),
      cover: photo(coverRef),
      photos: rest.map(photo),
    },
    order: manifest.order ?? Number.MAX_SAFE_INTEGER,
  };
}

export function loadPortfolio(): PortfolioData {
  const events: Array<PortfolioEvent & { _order: number }> = [];
  const found = new Set<string>();

  for (const categoryDir of readDirs(ARCHIVE_DIR)) {
    const category = CATEGORY_LABELS[categoryDir] ?? titleCase(categoryDir);
    for (const slug of readDirs(path.join(ARCHIVE_DIR, categoryDir))) {
      const built = buildEvent(categoryDir, category, slug);
      if (!built) continue;
      events.push({ ...built.event, _order: built.order });
      found.add(category);
    }
  }

  events.sort((a, b) => {
    const ca = CATEGORY_ORDER.indexOf(a.category);
    const cb = CATEGORY_ORDER.indexOf(b.category);
    const ra = ca === -1 ? CATEGORY_ORDER.length : ca;
    const rb = cb === -1 ? CATEGORY_ORDER.length : cb;
    if (ra !== rb) return ra - rb;
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    if (a._order !== b._order) return a._order - b._order;
    return a.slug.localeCompare(b.slug);
  });

  const known = CATEGORY_ORDER.filter((c) => found.has(c));
  const extra = [...found].filter((c) => !CATEGORY_ORDER.includes(c)).sort();

  return {
    events: events.map(({ _order, ...event }) => event),
    categories: ['All', ...known, ...extra],
  };
}
