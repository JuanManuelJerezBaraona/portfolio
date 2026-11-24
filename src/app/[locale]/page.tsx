import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { AboutMe, AiProfile, Architecture, Contact, Header, Projects, Skills } from '@/components';
import ScrollScenes from '@/components/motion/ScrollScenes';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      {/* The same order as NAV_LINKS: the navbar marks the active section by it. */}
      <Header />
      <AboutMe />
      <AiProfile />
      <Projects />
      <Architecture />
      <Skills />
      <Contact />
      <ScrollScenes />
    </>
  );
};

export default HomePage;
