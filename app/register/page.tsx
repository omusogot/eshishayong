import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black text-charcoal">Create your account</h1>
        <p className="mt-2 text-sm text-charcoal/70">Join Eshishayong to start learning and build your next opportunity.</p>
        <div className="mt-6">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
