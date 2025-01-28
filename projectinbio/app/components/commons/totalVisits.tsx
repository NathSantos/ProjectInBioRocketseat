import { auth } from '@/lib/auth';
import PortalButton from '@/components/commons/portalButton';
import { manageAuth } from '@/actions/manage-auth';

import { TrendingUp } from 'lucide-react';

export default async function TotalVisits({
  totalVisits = 0,
  showBar = false,
}: {
  totalVisits?: number;
  showBar?: boolean;
}) {
  const session = await auth();

  return (
    <div
      className='w-min whitespace-nowrap flex items-center gap-5 bg-background-secondary
    border border-border-primary px-8 py-3 rounded-xl shadow-lg'
    >
      <span className='text-white font-bold'>Total de Visitas</span>
      <div className='flex items-center gap-2 text-accent-green'>
        <span className='text-3xl font-bold'>{totalVisits}</span>
        <TrendingUp />
      </div>
      {showBar && (
        <div className='flex items-center gap-2'>
          {session?.user.isSubscribed && <PortalButton />}
          <form action={manageAuth}>
            <button>Sair</button>
          </form>
        </div>
      )}
    </div>
  );
}
