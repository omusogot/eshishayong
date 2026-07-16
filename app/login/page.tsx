import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange">Eshishayong</p>
          <h1 className="mt-2 text-3xl font-black text-charcoal">Welcome back</h1>
          <p className="mt-2 text-sm text-charcoal/70">Sign in to continue your learning journey.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
