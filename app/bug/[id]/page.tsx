import { prisma } from '@/app/lib/prisma';
import Answers from './components/Answers';
import NewAnswer from './components/NewAnswer';

// type PageProps = {
//   params: {
//     id: string;
//   };
// };

export default async function BugPage({params}: {params: Promise<{ id: string }>}) {
  const {id} = await params
  const bugData = await prisma.bug.findFirst({
    where: { id: id },
  });

  const title = bugData?.title ?? 'Title not found';
  const desc = bugData?.desc ?? 'Description not available';
  const userId = bugData?.userId ?? '';

  const userData = await prisma.user.findFirst({
    where: { id: userId },
  });

  const userName = userData?.userName ?? 'Anonymous';

  return (
    <div className="flex flex-col bg-gray-800 min-h-screen px-6 py-8 text-white">
      <p className="text-sm text-gray-400 mb-2">Posted by: {userName}</p>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <hr className="border-gray-600 mb-6" />
      <pre className="text-xl mb-6 whitespace-pre-wrap">{desc}</pre>

      <NewAnswer bugId={id} />
      <Answers bugId={id} />
    </div>
  );
}
