import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LessonPage({ params }: { params: Promise<{ slug: string; lessonId: string }> }) {
  const { slug, lessonId } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { lessons: true, quizzes: true }
  });

  if (!course) notFound();

  const lesson = course.lessons.find((item) => item.id === lessonId);
  if (!lesson) notFound();

  const nextLesson = course.lessons.find((item) => item.id !== lesson.id);

  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange">Lesson progress</p>
          <h1 className="mt-2 text-3xl font-black text-charcoal">{lesson.title}</h1>
          <p className="mt-3 text-sm text-charcoal/70">{lesson.description}</p>
          <div className="mt-6 rounded-2xl border border-charcoal/10 bg-cream p-5">
            <p className="whitespace-pre-line text-sm text-charcoal/80">{lesson.content}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-charcoal">Continue your path</h2>
            <p className="mt-2 text-sm text-charcoal/70">Mark this lesson as complete and move to the next step in the course.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <form action={async () => {
                'use server';
                await prisma.progress.upsert({
                  where: { id: `${course.id}:${lesson.id}` },
                  update: {},
                  create: { id: `${course.id}:${lesson.id}`, userId: 'demo-user', courseId: course.id, completed: true, xp: 25, coins: 5 }
                });
                redirect(`/courses/${course.slug}`);
              }}>
                <button className="rounded-full bg-orange px-4 py-2 font-semibold text-white">Mark lesson complete</button>
              </form>
              {nextLesson ? (
                <Link href={`/courses/${course.slug}/lessons/${nextLesson.id}`} className="rounded-full border border-charcoal/10 px-4 py-2 font-semibold text-charcoal">Next lesson</Link>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-charcoal">Quiz available</h2>
            <p className="mt-2 text-sm text-charcoal/70">A short assessment is ready for you after this lesson.</p>
            {course.quizzes.length ? (
              <Link href={`/courses/${course.slug}/quiz/${course.quizzes[0].id}`} className="mt-4 inline-flex rounded-full bg-charcoal px-4 py-2 font-semibold text-cream">Open quiz</Link>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
