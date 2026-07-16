import { prisma } from '@/lib/prisma';
import { CourseManager } from '@/components/admin/course-manager';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CoursesPage() {
  const [courses, categories] = await Promise.all([
    prisma.course.findMany({ include: { category: true } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } })
  ]);

  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6 rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange">Course management</p>
          <h1 className="mt-2 text-3xl font-black text-charcoal">Courses</h1>
          <p className="mt-2 text-sm text-charcoal/70">Design and launch richer course journeys from one place.</p>
        </div>

        <CourseManager categories={categories} />

        <div className="grid gap-4">
          {courses.map((course) => (
            <div key={course.id} className="rounded-2xl border border-charcoal/10 bg-cream p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-charcoal">{course.title}</h2>
                  <p className="mt-2 text-sm text-charcoal/70">{course.description}</p>
                  <p className="mt-3 text-sm font-semibold text-orange">{course.category.name}</p>
                </div>
                <a href={`/courses/${course.slug}`} className="rounded-full bg-charcoal px-3 py-2 text-sm font-semibold text-white">Open</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
