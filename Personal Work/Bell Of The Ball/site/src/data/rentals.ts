/*
 * Machine rental photos — read from the folder, same idea as the portfolio.
 *
 *   public/photos/rentals/
 *
 * Drop a photo in and it appears on the homepage rentals strip; take it out
 * and it's gone. The filename becomes the caption, so name the file after the
 * machine: cotton-candy-machine.jpg -> "Cotton Candy Machine". An optional
 * rentals.json in that folder overrides the caption or supplies alt text.
 *
 * Runs at BUILD TIME (it reads the filesystem), so call it from a page's
 * frontmatter — never from a client component. With no photos in the folder it
 * returns an empty array and the strip doesn't render at all, which is why the
 * homepage looks exactly as it does today until the first photo lands.
 *
 * See public/photos/rentals/_README.md.
 */
import fs from 'node:fs';
import path from 'node:path';

const RENTALS_DIR = path.join(process.cwd(), 'public', 'photos', 'rentals');
const PUBLIC_ROOT = '/photos/rentals';
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

export interface RentalPhoto {
  src: string;
  /** Caption under the photo, e.g. "Cotton Candy Machine". */
  name: string;
  alt: string;
}

interface RentalsManifest {
  /** Filename -> { name, alt }, both optional. */
  [filename: string]: { name?: string; alt?: string } | undefined;
}

/** "cotton-candy-machine" -> "Cotton Candy Machine" */
function titleCase(name: string): string {
  return name
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function readManifest(): RentalsManifest {
  const file = path.join(RENTALS_DIR, 'rentals.json');
  if (!fs.existsSync(file)) return {};
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as RentalsManifest;
  } catch (err) {
    throw new Error(`Invalid JSON in public/photos/rentals/rentals.json: ${(err as Error).message}`);
  }
}

export function loadRentals(): RentalPhoto[] {
  if (!fs.existsSync(RENTALS_DIR)) return [];
  const manifest = readManifest();

  return fs
    .readdirSync(RENTALS_DIR, { withFileTypes: true })
    .filter(
      (e) => e.isFile() && !e.name.startsWith('.') && !e.name.startsWith('_') && IMAGE_EXT.has(path.extname(e.name).toLowerCase())
    )
    .map((e) => e.name)
    .sort()
    .map((file) => {
      const entry = manifest[file] ?? {};
      const name = entry.name?.trim() || titleCase(path.basename(file, path.extname(file)));
      return {
        src: `${PUBLIC_ROOT}/${file}`,
        name,
        // Without written alt the caption already names the thing pictured,
        // so lead with it rather than repeating the filename.
        alt: entry.alt?.trim() || `${name}, available to rent from Bell of the Ball`,
      };
    });
}
