import Header from '@/components/landingPage/header';
import PlanButtons from '@/(pages)/[profileId]/upgrade/planButtons';

export default async function UpgradePage() {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-4'>
      <Header />
      <h2 className='text-2xl font-bold'>Escolha o plano</h2>
      <PlanButtons />
    </div>
  );
}
