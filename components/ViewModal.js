export default function ViewModal({ isOpen, onClose, notice }) {
  if (!isOpen || !notice) return null;

  const isUrgent = notice.priority === 'Urgent';
  const badgeColor = isUrgent
    ? 'bg-red-100 text-red-800 border border-red-200'
    : 'bg-blue-100 text-blue-800 border border-blue-200';

  const formattedDate = new Date(notice.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75 transition-opacity overflow-y-auto">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-xl w-full max-w-2xl p-6 sm:p-8 shadow-xl transform transition-all flex flex-col max-h-[90vh]">
        
        <div className="flex justify-between items-start w-full mb-5">
          <div className="flex space-x-2">
            {isUrgent && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                Urgent
              </span>
            )}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
              {notice.category}
            </span>
          </div>
          <span className="text-sm text-gray-500 font-medium">{formattedDate}</span>
        </div>
        
        <div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
          {notice.image && (
            <div className="w-full mb-5 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src={notice.image} alt={notice.title} className="max-w-full max-h-[400px] object-contain" />
            </div>
          )}
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4" id="modal-title">
            {notice.title}
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed">
              {notice.body}
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
