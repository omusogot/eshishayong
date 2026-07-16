import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange">Profile</p>
        <h1 className="mt-2 text-3xl font-black text-charcoal">Manage your account</h1>
        <div className="mt-6 space-y-4 rounded-2xl border border-charcoal/10 bg-cream p-5">
          <div>
            <p className="text-sm text-charcoal/60">Name</p>
            <p className="font-semibold text-charcoal">{session.user.name}</p>
          </div>
          <div>
            <p className="text-sm text-charcoal/60">Email</p>
            <p className="font-semibold text-charcoal">{session.user.email}</p>
          </div>
          <div>
            <p className="text-sm text-charcoal/60">Role</p>
            <p className="font-semibold text-charcoal">{session.user.role}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
