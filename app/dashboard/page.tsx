import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const [courses, users, branding] = await Promise.all([
    prisma.course.count(),
    prisma.user.count(),
    prisma.branding.findFirst()
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
      </div>
    </main>
  );
}
