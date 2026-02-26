import {
  Navbar,
  Header,
  AboutMe,
  Projects,
  Skills,
  ContactForm,
  Footer,
} from '@/components';

const HomePage = () => {
  return (
    <div className="page-background min-h-screen">
      <div className="grid-overlay fixed inset-0 z-0" aria-hidden="true" />
      <div className="circuit-overlay fixed inset-0 z-0" aria-hidden="true" />
      <div className="circuit-sweep-overlay fixed inset-0 z-0" aria-hidden="true" />
      <Navbar />
      <main className="relative z-10">
        <Header />
        <AboutMe />
        <Projects />
        <Skills />
        <ContactForm />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
