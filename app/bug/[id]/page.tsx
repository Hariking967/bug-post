import React from 'react';
import Answers from './components/Answers';
import NewAnswer from './components/NewAnswer';
import { prisma } from '@/app/lib/prisma';

type Props = { params: { id: string } };

export default async function BugPage({ params }: Props) {
  const bugData = await prisma.bug.findFirst({
    where: { id: params.id },
  });

  const title = bugData?.title || 'title';
  const desc = bugData?.desc || 'desc';
  const userId = bugData?.userId || 'userId';

  const userData = await prisma.user.findFirst({
    where: { id: userId },
  });

  const userName = userData?.userName || 'Anonymous';

  return (
    <div className="flex flex-col bg-gray-800 min-h-screen px-6 py-8 text-white">
      <p className="text-sm text-gray-400 mb-2">Posted by: {userName}</p>
      <p className="text-4xl font-bold mb-4">{title}</p>
      <hr className="border-gray-600 mb-6" />
      <pre className="text-xl mb-6 whitespace-pre-wrap">{desc}</pre>

      <NewAnswer bugId={params.id} />
      <Answers bugId={params.id} />
    </div>
  );
}
