import Head from 'next/head';
import NoticeForm from '../../../components/NoticeForm';
import prisma from '../../../lib/prisma';

export default function EditNotice({ notice, error }) {
  if (error) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Notice - Reno</title>
      </Head>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Notice</h1>
        <p className="text-gray-500 mt-1">Update the details of the notice below.</p>
      </div>

      <NoticeForm initialData={notice} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const notice = await prisma.notice.findUnique({
      where: { id },
    });

    if (!notice) {
      return {
        props: { error: 'Notice not found.' },
      };
    }

    // Serialize date for Next.js props
    return {
      props: {
        notice: {
          ...notice,
          publishDate: notice.publishDate.toISOString(),
          createdAt: notice.createdAt.toISOString(),
          updatedAt: notice.updatedAt.toISOString(),
        }
      }
    };
  } catch (error) {
    return {
      props: { error: 'Failed to load notice.' },
    };
  }
}
