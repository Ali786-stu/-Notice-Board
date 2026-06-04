import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NoticeForm({ initialData = null }) {
  const router = useRouter();
  const isEditing = !!initialData;
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    body: initialData?.body || '',
    category: initialData?.category || 'General',
    priority: initialData?.priority || 'Normal',
    publishDate: initialData?.publishDate 
      ? new Date(initialData.publishDate).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0],
    image: initialData?.image || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditing ? `/api/notices/${initialData.id}` : '/api/notices';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      router.push('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="E.g. Mid-term Examination Schedule"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">Body *</label>
          <textarea
            id="body"
            name="body"
            required
            rows={5}
            value={formData.body}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Detailed description of the notice..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Exam">Exam</option>
              <option value="Event">Event</option>
              <option value="General">General</option>
            </select>
          </div>

          <div>
            <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700 mb-1">Publish Date *</label>
            <input
              type="date"
              id="publishDate"
              name="publishDate"
              required
              value={formData.publishDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="priority"
                value="Normal"
                checked={formData.priority === 'Normal'}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Normal</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="priority"
                value="Urgent"
                checked={formData.priority === 'Urgent'}
                onChange={handleChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700 font-medium text-red-600">Urgent</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional Bonus)</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Notice' : 'Create Notice'}
        </button>
      </div>
    </form>
  );
}
