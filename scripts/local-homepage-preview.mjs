import { existsSync } from 'node:fs';
import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const enabled = process.env.VP_PRIVATE_PREVIEW === '1';
const localRoot = new URL('../.local-preview/', import.meta.url);
const localCase = new URL('hms-loistl.astro', localRoot);
const mediaFiles = ['roh-1.jpg', 'roh-1.mp4', 'roh-2.jpg', 'roh-2.mp4', 'reel.jpg', 'reel.mp4'];
const mediaSources = mediaFiles.map(file => new URL(`media/${file}`, localRoot));
const caseReady = enabled && existsSync(localCase);
const mediaReady = enabled && mediaSources.every(file => existsSync(file));

export const privatePreviewFlags = {
  'import.meta.env.VP_LOCAL_CASE_READY': JSON.stringify(caseReady),
  'import.meta.env.VP_LOCAL_MEDIA_READY': JSON.stringify(mediaReady),
};

/** @returns {import('astro').AstroIntegration} */
export function localHomepagePreview() {
  return {
    name: 'vibeperform-local-homepage-preview',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        if (caseReady) injectRoute({
          pattern: '/de/fallstudien/hms-loistl',
          entrypoint: fileURLToPath(localCase),
        });
      },
      'astro:build:done': async ({ dir }) => {
        if (!mediaReady) return;
        const target = new URL('lokale-vorschau-vp/', dir);
        await mkdir(target, { recursive: true });
        await Promise.all(mediaSources.map((source, index) => copyFile(source, new URL(mediaFiles[index], target))));
      },
    },
  };
}
