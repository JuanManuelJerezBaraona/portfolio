import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { AboutMe, AiProfile, CodeLab, Contact, Header, Projects, Skills } from '@/components';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Header />
      <AboutMe />
      <CodeLab />
      <Projects />
      <AiProfile />
      <Skills />
      <Contact />
    </>
  );
};

export default HomePage;
