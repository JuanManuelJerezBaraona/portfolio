import { AboutMe, Contact, Header, Projects, Skills } from '@/components';
import Ticker from '@/components/ui/Ticker';

const HomePage = () => {
  return (
    <>
      <Header />
      <Ticker />
      <AboutMe />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
};

export default HomePage;
