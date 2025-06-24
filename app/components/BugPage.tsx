import React from 'react';
import Link from 'next/link';
import { prisma } from '@/app/lib/prisma';

export default async function BugPage() {
  const bugDatas = await prisma.bug.findMany();

  const bugContent = await Promise.all(
    bugDatas.map(async (bug) => {
      const userData = await prisma.user.findFirst({
        where: { id: bug.userId || '' },
      });

      const userName = userData?.userName || 'Anonymous';

      return (
        <Link key={bug.id} href={`/bug/${bug.id}`}>
          <div className="flex flex-row gap-4 p-4 m-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all shadow-md cursor-pointer">
            <div className="flex flex-col w-[90vw]">
              <p className="text-3xl m-3 truncate">{bug.title}</p>
              <p className="text-3xl m-3 truncate">{bug.desc}</p>
              <p className="text-3xl m-3">Posted by: {userName}</p>
              <p>{bug.answered} answered</p>
            </div>
          </div>
        </Link>
      );
    })
  );

  return <div className="flex flex-col">{bugContent}</div>;
}
