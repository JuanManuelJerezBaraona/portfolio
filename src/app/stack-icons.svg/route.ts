import { stackSprite } from '@/components/Skills/icons';

// Built once at build time, like the favicons; the proxy skips paths with an extension.
export const dynamic = 'force-static';

export const GET = () =>
  new Response(stackSprite(), {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
