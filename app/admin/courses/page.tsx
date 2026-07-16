import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({ include: { category: true } });

  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange">Course management</p>
            <h1 className="mt-2 text-3xl font-black text-charcoal">Courses</h1>
          </div>
        </div>
        <div className="grid gap-4">
          {courses.map((course) => (
            <div key={course.id} className="rounded-2xl border border-charcoal/10 bg-cream p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-charcoal">{course.title}</h2>
                  <p className="mt-2 text-sm text-charcoal/70">{course.description}</p>
                  <p className="mt-3 text-sm font-semibold text-orange">{course.category.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
