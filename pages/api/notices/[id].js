import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const { title, body, category, priority, publishDate, image } = req.body;

      // Server-side Input Validation
      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
      }
      if (!body || body.trim() === '') {
        return res.status(400).json({ error: 'Body is required' });
      }
      if (!category || !['Exam', 'Event', 'General'].includes(category)) {
        return res.status(400).json({ error: 'Valid category is required' });
      }
      if (!priority || !['Normal', 'Urgent'].includes(priority)) {
        return res.status(400).json({ error: 'Valid priority is required' });
      }
      if (!publishDate || isNaN(new Date(publishDate).getTime())) {
        return res.status(400).json({ error: 'Valid publish date is required' });
      }

      const notice = await prisma.notice.update({
        where: { id },
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image || null,
        },
      });

      return res.status(200).json(notice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update notice' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.notice.delete({
        where: { id },
      });
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete notice' });
    }
  }

  res.setHeader('Allow', ['PUT', 'PATCH', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
