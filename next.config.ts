import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/i18n/request.ts",
  experimental: {
    // Messages are compiled at build time, so the ICU parser (formatjs,
    // ~16 KB compressed) stays out of the client bundle. It rules out t.raw.
    messages: { path: "./src/i18n/messages", format: "json", locales: "infer", precompile: true },
  },
});

const nextConfig: NextConfig = {
  images: {
    // AVIF first (~20–30% lighter than WebP on the screenshots), WebP as fallback.
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
