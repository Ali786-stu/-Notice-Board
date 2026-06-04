import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Urgent-first ordering done at the database level via orderBy
      // Since 'Urgent' > 'Normal' alphabetically, 'desc' puts Urgent first
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: 'desc' },
          { publishDate: 'desc' }
        ],
      });
      return res.status(200).json(notices);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch notices' });
    }
  }

  if (req.method === 'POST') {
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

      const notice = await prisma.notice.create({
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image || null,
        },
      });

      return res.status(201).json(notice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create notice' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
