import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function UsersPage() {
  const users = await prisma.user.findMany({ include: { role: true } });

  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange">User management</p>
          <h1 className="mt-2 text-3xl font-black text-charcoal">Users</h1>
          <p className="mt-2 text-sm text-charcoal/70">Review learner activity, roles, and account status in one place.</p>
        </div>
        <div className="grid gap-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between rounded-2xl border border-charcoal/10 bg-cream p-4">
              <div>
                <p className="font-semibold text-charcoal">{user.name ?? user.email}</p>
                <p className="text-sm text-charcoal/70">{user.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-orange/10 px-3 py-1 text-sm font-semibold text-orange">{user.role?.name ?? 'STUDENT'}</span>
                <span className="rounded-full bg-charcoal/5 px-3 py-1 text-sm font-semibold text-charcoal/70">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
