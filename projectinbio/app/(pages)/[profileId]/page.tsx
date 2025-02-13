import ProjectCard from '@/components/commons/projectCard';
import TotalVisits from '@/components/commons/totalVisits';
import UserCard from '@/components/commons/userCard/userCard';
import { getProfileData, getProfileProjects } from '@/server/getProfileData';
import { auth } from '@/lib/auth';
import NewProject from '@/(pages)/[profileId]/newProject';
import { getDownloadURLFromPath } from '@/lib/firebase';
import { increaseProfileVisits } from '@/actions/increase-profile-visits';

import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProjectInBio - Perfil',
  description: 'ProjectInBio - A plataforma de gestão de projetos em biologia.',
};

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;
  const session = await auth();

  const profileData = await getProfileData(profileId);
  if (!profileData) return notFound();

  const projects = await getProfileProjects(profileId);

  const isOwner = profileData.userId === session?.user?.id;

  if (!isOwner) {
    await increaseProfileVisits(profileId);
  }

  if (isOwner && !session?.user.isSubscribed && !session?.user.isTrial) {
    redirect(`/${profileId}/upgrade`);
  }

  // TODO: get projects
  // TODO: adicionar page view
  // TODO: se o usuário não estiver mais no trial, não deixar ver o projeto e redirecionar para a página de upgrade

  return (
    <div className='relative h-screen flex p-20 overflow-hidden'>
      {session?.user.isTrial && !session.user.isSubscribed && (
        <div className='fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary'>
          <span>Você está usando a versão trial.</span>
          <Link href={`/${profileId}/upgrade`}>
            <button className='text-accent-green font-bold'>
              Faça o upgrade agora!
            </button>
          </Link>
        </div>
      )}
      <div className='w-1/2 flex justify-center h-min'>
        <UserCard profileData={profileData} isOwner={isOwner} />
      </div>
      <div className='w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto'>
        {projects.map(async (project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOwner={isOwner}
            img={(await getDownloadURLFromPath(project.imagePath)) || ''}
          />
        ))}
        {isOwner && <NewProject profileId={profileId} />}
      </div>
      <div className='absolute bottom-4 right-0 left-0 w-min mx-auto'>
        <TotalVisits totalVisits={profileData.totalVisits} showBar />
      </div>
    </div>
  );
}
