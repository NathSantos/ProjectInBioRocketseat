import Hero from '@/components/landingPage/hero';
import Header from '@/components/landingPage/header';
import VideoExplanation from '@/components/landingPage/videoExplanation';

export default function Home() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Hero />
      <Header />
      <VideoExplanation />
      {/*
    <Pricing/>
    <FAQ/> */}
    </div>
  );
}
