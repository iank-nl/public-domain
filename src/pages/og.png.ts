import sharp from 'sharp';
import { site } from '../site.config';

/** The social preview image, drawn at build time so it follows the site name. */
export async function GET() {
  const name = site.name.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#f8f3e8"/>
    <text x="72" y="170" font-family="Georgia, serif" font-size="96" fill="#1d1914">${name}</text>
    <text x="72" y="244" font-family="Georgia, serif" font-size="44" fill="#5b5246">Software, secure all the way down.</text>
    <path fill="#efe2c4" d="M0 350C200 300 410 390 620 346S1000 296 1200 340V630H0Z"/>
    <path fill="#e6ab7c" d="M0 420C240 470 430 396 660 430S1010 470 1200 412V630H0Z"/>
    <path fill="#9dbdb7" d="M0 500C170 468 370 470 590 506S1000 540 1200 480V630H0Z"/>
    <path fill="#6a5b4e" d="M0 570C280 606 510 590 760 560S1040 590 1200 576V630H0Z"/>
  </svg>`;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
