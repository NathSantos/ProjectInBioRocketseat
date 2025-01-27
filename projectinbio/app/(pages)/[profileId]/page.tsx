import ProjectCard from '@/components/commons/projectCard';
import TotalVisits from '@/components/commons/totalVisits';
import UserCard from '@/components/commons/userCard';
import { getProfileData } from '@/server/getProfileData';
import { auth } from '@/lib/auth';
import NewProject from '@/(pages)/[profileId]/newProject';

import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;
  const session = await auth();

  const profileData = await getProfileData(profileId);
  if (!profileData) return notFound();

  const isOwner = profileData.userId === session?.user?.id;

  // TODO: get projects
  // TODO: adicionar page view
  // TODO: se o usuário não estiver mais no trial, não deixar ver o projeto e redirecionar para a página de upgrade

  return (
    <div className='relative h-screen flex p-20 overflow-hidden'>
      <div className='fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary'>
        <span>Você está usando a versão trial.</span>
        <Link href={`/${profileId}/upgrade`}>
          <button className='text-accent-green font-bold underline'>
            Faça o upgrade agora!
          </button>
        </Link>
      </div>
      <div className='w-1/2 flex justify-center h-min'>
        <UserCard />
      </div>
      <div className='w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto'>
        <ProjectCard srcImg='/project1.jpg' />
        <ProjectCard srcImg='/project2.jpg' />
        <ProjectCard srcImg='/project1.jpg' />
        <ProjectCard srcImg='/project2.jpg' />
        <ProjectCard srcImg='/project1.jpg' />
        <ProjectCard srcImg='/project2.jpg' />
        <ProjectCard srcImg='/project1.jpg' />
        {isOwner && <NewProject profileId={profileId} />}
      </div>
      <div className='absolute bottom-4 right-0 left-0 w-min mx-auto'>
        <TotalVisits />
      </div>
    </div>
  );
}
