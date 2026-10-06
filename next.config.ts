import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // AVIF first (~20–30% lighter than WebP on the screenshots), WebP as fallback.
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
