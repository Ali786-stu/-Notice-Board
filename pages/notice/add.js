import Head from 'next/head';
import NoticeForm from '../../components/NoticeForm';

export default function AddNotice() {
  return (
    <>
      <Head>
        <title>Create Notice - Reno</title>
      </Head>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Notice</h1>
        <p className="text-gray-500 mt-1">Fill out the form below to publish a new notice to the board.</p>
      </div>

      <NoticeForm />
    </>
  );
}
