import type { APIRoute } from 'astro';
import painterDemo from '../../preview/maler.html?raw';

export function getStaticPaths() {
  return import.meta.env.VP_PRIVATE_PREVIEW === '1' ? [{ params: { demo: 'maler' } }] : [];
}

export const GET: APIRoute = () => new Response(painterDemo, {
  headers: { 'content-type': 'text/html; charset=utf-8' },
});
