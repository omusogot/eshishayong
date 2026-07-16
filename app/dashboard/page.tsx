import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const [courses, users, branding, recentCourses, progressEntries] = await Promise.all([
    prisma.course.count(),
    prisma.user.count(),
    prisma.branding.findFirst(),
    prisma.course.findMany({ take: 3, orderBy: { createdAt: 'desc' }, include: { category: true } }),
    prisma.progress.findMany({ take: 4, orderBy: { updatedAt: 'desc'}})
  ]);

  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange">Dashboard</p>
          <h1 className="mt-2 text-3xl font-black text-charcoal">Welcome, {session.user.name ?? 'Learner'}</h1>
          <p className="mt-2 text-sm text-charcoal/70">{branding?.footerText ?? 'Developed by Eshishayong'}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-charcoal/10 bg-white p-6">
            <p className="text-sm text-charcoal/60">Courses</p>
            <p className="mt-2 text-3xl font-black text-charcoal">{courses}</p>
          </div>
          <div className="rounded-3xl border border-charcoal/10 bg-white p-6">
            <p className="text-sm text-charcoal/60">Users</p>
            <p className="mt-2 text-3xl font-black text-charcoal">{users}</p>
          </div>
          <div className="rounded-3xl border border-charcoal/10 bg-white p-6">
            <p className="text-sm text-charcoal/60">Brand</p>
            <p className="mt-2 text-3xl font-black text-charcoal">{branding?.siteName ?? 'Eshishayong'}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-charcoal">Featured learning paths</h2>
              <a href="/admin/courses" className="text-sm font-semibold text-orange">Manage</a>
            </div>
            <div className="mt-4 space-y-3">
              {recentCourses.map((course) => (
                <a key={course.id} href={`/courses/${course.slug}`} className="block rounded-2xl border border-charcoal/10 bg-cream p-4">
                  <p className="font-semibold text-charcoal">{course.title}</p>
                  <p className="mt-1 text-sm text-charcoal/70">{course.category.name}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-charcoal">Recent progress</h2>
            <div className="mt-4 space-y-3">
              {progressEntries.map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-charcoal/10 bg-cream p-4">
                  <p className="font-semibold text-charcoal">{entry.score}% complete</p>
                  <p className="mt-1 text-sm text-charcoal/70">XP {entry.xp} • Coins {entry.coins}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
