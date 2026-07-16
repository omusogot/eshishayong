import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { category: true, lessons: true, quizzes: true }
  });

  if (!course) notFound();

  const lessonCount = course.lessons.length;
  const quizCount = course.quizzes.length;

  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange">Course overview</p>
          <h1 className="mt-2 text-3xl font-black text-charcoal">{course.title}</h1>
          <p className="mt-3 text-sm text-charcoal/70">{course.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-charcoal/70">
            <span className="rounded-full bg-orange/10 px-3 py-1 font-semibold text-orange">{course.category.name}</span>
            <span className="rounded-full bg-charcoal/5 px-3 py-1">{lessonCount} lessons</span>
            <span className="rounded-full bg-charcoal/5 px-3 py-1">{quizCount} quiz modules</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="rounded-3xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-charcoal">What you will learn</h2>
            <ul className="mt-4 space-y-3 text-sm text-charcoal/70">
              <li>• Build practical skills through structured lessons and checkpoints.</li>
              <li>• Track your progress through the course journey and completion milestones.</li>
              <li>• Apply your learning with short quizzes and simple feedback loops.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-charcoal">Continue learning</h2>
            <div className="mt-4 space-y-3">
              {course.lessons.map((lesson) => (
                <Link key={lesson.id} href={`/courses/${course.slug}/lessons/${lesson.id}`} className="block rounded-2xl border border-charcoal/10 bg-cream p-4">
                  <p className="font-semibold text-charcoal">{lesson.title}</p>
                  <p className="mt-1 text-sm text-charcoal/70">{lesson.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
