import Hero from '@/components/landingPage/hero';
import Header from '@/components/landingPage/header';
import VideoExplanation from '@/components/landingPage/videoExplanation';
import Pricing from '@/components/landingPage/pricing';
import FAQ from '@/components/landingPage/faq';
import { getSEOTags } from '@/lib/seo';

import { Metadata } from 'next';

export const metadata: Metadata = getSEOTags({
  appName: 'ProjectInBio',
  appDescription:
    'ProjectInBio - Seus projetos e redes sociais em um único link',
  keywords: ['ProjectInBio', 'projetos', 'redes sociais', 'link'],
  appDomain: 'https://micro-saas-course-projectinbio-bice.vercel.app/',
  canonicalUrlRelative: '/',
});

export default function Home() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Hero />
      <Header />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  );
}
