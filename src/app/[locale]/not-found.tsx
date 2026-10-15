import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import FuzzyText from '@/components/bits/FuzzyText';
import Magnet from '@/components/bits/Magnet';

const NotFound = () => {
  const t = useTranslations('NotFound');

  return (
    // Clip sideways: the canvas carries room on both sides for the fuzz.
    <section className="flex min-h-[80vh] items-center overflow-x-clip px-4 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <p className="meta text-muted">Error 404</p>
        {/* Out of focus, its channels out of register (added light in
            fluorescence, multiplied stains in brightfield). Hovering it
            brings it into focus. Still with reduced motion. The negative
            margin lines the digits up with the text under them. */}
        <div aria-hidden="true" className="-ml-[3.9rem] mt-2">
          <FuzzyText
            fontSize="clamp(6.5rem, 24vw, 14rem)"
            fontWeight={820}
            fontStretch="expanded"
            baseIntensity={0.2}
            hoverIntensity={0}
            fuzzRange={24}
            colorSplit={1.1}
            transitionDuration={18}
          >
            404
          </FuzzyText>
        </div>
        <h1 className="display mt-4 text-5xl sm:text-7xl">{t('title')}</h1>
        <p className="mt-6 max-w-lg text-lg text-muted">{t('body')}</p>
        <Link href="/#projects" className="btn btn-primary mt-10">
          {t('cta')}
          <Magnet />
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
