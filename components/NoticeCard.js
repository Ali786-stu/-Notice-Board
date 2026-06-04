import Link from 'next/link';

export default function NoticeCard({ notice, onDeleteClick, onViewClick }) {
  const isUrgent = notice.priority === 'Urgent';

  const badgeColor = isUrgent
    ? 'bg-red-100 text-red-800 border border-red-200'
    : 'bg-blue-100 text-blue-800 border border-blue-200';

  const formattedDate = new Date(notice.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border ${isUrgent ? 'border-red-200' : 'border-gray-100'} flex flex-col h-full`}>
      {notice.image && (
        <div 
          className="w-full h-48 bg-gray-200 overflow-hidden cursor-pointer"
          onClick={() => onViewClick(notice)}
        >
          <img src={notice.image} alt={notice.title} className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="p-5 flex-1 flex flex-col">
        <div 
          className="cursor-pointer group flex-1 flex flex-col"
          onClick={() => onViewClick(notice)}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex space-x-2">
              {isUrgent && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                  Urgent
                </span>
              )}
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}>
                {notice.category}
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">{formattedDate}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
            {notice.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">
            {notice.body}
          </p>
        </div>
        
        <div className="mt-auto pt-4 flex space-x-3 border-t border-gray-100">
          <Link
            href={`/notice/edit/${notice.id}`}
            className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => onDeleteClick(notice)}
            className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
