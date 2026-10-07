import { notFound } from 'next/navigation';
import { MICROGRAPH_LAYERS, micrographLayerSvg } from '@/components/Header/Micrograph';

// /micrograph/dendrites.svg and /micrograph/puncta.svg, built once at build
// time; the proxy skips paths with an extension.
export const dynamic = 'force-static';
export const dynamicParams = false;

export const generateStaticParams = () => MICROGRAPH_LAYERS.map((layer) => ({ layer: `${layer}.svg` }));

export const GET = async (_request: Request, { params }: { params: Promise<{ layer: string }> }) => {
  const { layer: file } = await params;
  const layer = MICROGRAPH_LAYERS.find((name) => `${name}.svg` === file);
  if (!layer) notFound();
  return new Response(micrographLayerSvg(layer), {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
};
