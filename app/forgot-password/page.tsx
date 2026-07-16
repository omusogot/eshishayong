import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black text-charcoal">Reset your password</h1>
        <p className="mt-2 text-sm text-charcoal/70">Enter your email and we’ll prepare a reset link for the next step.</p>
        <div className="mt-6">
          <ForgotPasswordForm />
        </div>
      </div>
    </main>
  );
}
