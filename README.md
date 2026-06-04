# Reno Notice Board

This is a full-stack Next.js (Pages Router) application built for the Reno Web Development Internship assignment.

## Tech Stack
- **Framework:** Next.js (Pages Router)
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Styling:** Tailwind CSS

## How to run the project locally

1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   Create a `.env` file in the root of your project and add your Database URL:
   ```env
   DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://user:password@host:5432/postgres"
   ```
4. Push the Prisma schema to the database (if not already done):
   ```bash
   npx prisma db push
   ```
5. Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## One thing I would improve with more time

If I had more time, I would implement **Image Upload functionality** using a cloud storage solution like AWS S3, Cloudinary, or Supabase Storage. Currently, the "image" field accepts an image URL, which assumes the user already has the image hosted somewhere. Integrating direct file uploads within the form would make the application much more user-friendly.

Additionally, I would add **Pagination** to the list of notices. If the institution has hundreds of notices over time, loading all of them on the home page will become slow and impact performance. Pagination (or infinite scroll) would significantly improve the UX.

## Where and how AI was used

I utilized AI (Antigravity by Google DeepMind) to pair-program this application. The AI assisted me in:
- **Planning and Architecture**: Analyzing the assignment PDF requirements to form a concrete technical plan ensuring all strict rules (like using Pages Router instead of App Router, database-level sorting, server-side validation) were fully met.
- **Code Generation**: The AI generated boilerplate code for Next.js API routes (`req, res` handlers), Prisma schema definition, and React components (`NoticeForm`, `NoticeCard`, and `DeleteModal`). 
- **Tailwind Styling**: Designing responsive, modern-looking cards with Tailwind CSS, including the "Urgent" badging logic.
- **Debugging & Configuration**: When the new Prisma v7 caused schema issues with Supabase URLs (`directUrl` removal), the AI helped quickly downgrade to the stable Prisma v6 to keep development moving smoothly.
