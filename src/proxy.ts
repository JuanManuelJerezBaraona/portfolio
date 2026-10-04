import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Everything except Next internals, files with an extension and the share
  // cards, which metadata already links with their locale (/es/opengraph-image).
  matcher: '/((?!api|_next|_vercel|.*\\..*|.*(?:opengraph|twitter)-image).*)',
};
