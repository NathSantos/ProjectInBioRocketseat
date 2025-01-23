import Hero from '@/components/landingPage/hero';
import Header from '@/components/landingPage/header';

export default function Home() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Hero />
      <Header />
      {/*
    <VideoExplanation/>
    <Pricing/>
    <FAQ/> */}
    </div>
  );
}
