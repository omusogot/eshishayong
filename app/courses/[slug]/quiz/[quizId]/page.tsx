import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function QuizPage({ params }: { params: Promise<{ slug: string; quizId: string }> }) {
  const { slug, quizId } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { quizzes: { include: { questions: true } } }
  });

  if (!course) notFound();

  const quiz = course.quizzes.find((item) => item.id === quizId);
  if (!quiz) notFound();

  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange">Quiz submission</p>
          <h1 className="mt-2 text-3xl font-black text-charcoal">{quiz.title}</h1>
          <p className="mt-3 text-sm text-charcoal/70">Complete the quick check-in to confirm your understanding.</p>
        </div>

        <div className="rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
          <form action={async (formData: FormData) => {
            'use server';
            let score = 0;
            for (const question of quiz.questions) {
              const answer = String(formData.get(question.id) || '').trim();
              if (answer === question.answer) score += 1;
            }
            await prisma.progress.create({
              data: {
                id: `${course.id}:${quiz.id}`,
                userId: 'demo-user',
                courseId: course.id,
                completed: true,
                score,
                xp: score * 15,
                coins: score * 3
              }
            }).catch(() => undefined);
          }} className="space-y-6">
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="rounded-2xl border border-charcoal/10 bg-cream p-5">
                <p className="font-semibold text-charcoal">{index + 1}. {question.prompt}</p>
                <div className="mt-3 space-y-2">
                  {question.options.map((option) => (
                    <label key={option} className="flex items-center gap-2 text-sm text-charcoal/80">
                      <input type="radio" name={question.id} value={option} className="h-4 w-4" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-orange px-4 py-2 font-semibold text-white">Submit quiz</button>
              <Link href={`/courses/${course.slug}`} className="rounded-full border border-charcoal/10 px-4 py-2 font-semibold text-charcoal">Back to course</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
