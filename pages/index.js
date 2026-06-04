import { useState, useEffect } from 'react';
import Head from 'next/head';
import NoticeCard from '../components/NoticeCard';
import DeleteModal from '../components/DeleteModal';
import ViewModal from '../components/ViewModal';

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // View Modal State
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [noticeToView, setNoticeToView] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/notices');
      if (!res.ok) throw new Error('Failed to fetch notices');
      const data = await res.json();
      setNotices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (notice) => {
    setNoticeToDelete(notice);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setNoticeToDelete(null);
  };

  const openViewModal = (notice) => {
    setNoticeToView(notice);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setNoticeToView(null);
  };

  const handleDeleteConfirm = async () => {
    if (!noticeToDelete) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/notices/${noticeToDelete.id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete notice');
      
      // Update state to remove deleted notice
      setNotices(notices.filter(n => n.id !== noticeToDelete.id));
      closeDeleteModal();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Notice Board - Reno</title>
      </Head>

      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Notices</h1>
          <p className="text-gray-500 mt-1">Stay updated with the latest events, exams, and general information.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      ) : notices.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
          <p className="text-gray-500 mb-4">No notices found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <NoticeCard 
              key={notice.id} 
              notice={notice} 
              onDeleteClick={openDeleteModal} 
              onViewClick={openViewModal}
            />
          ))}
        </div>
      )}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        title={noticeToDelete?.title}
      />

      <ViewModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        notice={noticeToView}
      />
    </>
  );
}
