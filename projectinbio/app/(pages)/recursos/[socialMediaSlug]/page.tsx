import FAQ from '@/components/landingPage/faq';
import Header from '@/components/landingPage/header';
import Hero from '@/components/landingPage/hero';
import Pricing from '@/components/landingPage/pricing';
import VideoExplanation from '@/components/landingPage/videoExplanation';
import { getTextBySlug } from '@/server/getTextBySlug';

import { notFound } from 'next/navigation';

export default async function LinkInBio({
  params,
}: {
  params: Promise<{ socialMediaSlug: string }>;
}) {
  const { socialMediaSlug } = await params;
  const texts = await getTextBySlug(socialMediaSlug);
  if (!texts) {
    return notFound();
  }
  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <Hero texts={texts} />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  );
}
