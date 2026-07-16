"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    };

    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      setError('Please provide a valid email and password.');
      setLoading(false);
      return;
    }

    const result = await signIn('credentials', { redirect: false, email: data.email, password: data.password });
    if (result?.error) {
      setError('Invalid credentials.');
      setLoading(false);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="mb-1 block text-sm font-semibold text-charcoal">Email</label>
        <input name="email" type="email" required className="w-full rounded-2xl border border-charcoal/10 bg-cream px-4 py-3" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-charcoal">Password</label>
        <input name="password" type="password" required className="w-full rounded-2xl border border-charcoal/10 bg-cream px-4 py-3" />
      </div>
      {error ? <p className="text-sm text-red">{error}</p> : null}
      <button type="submit" disabled={loading} className="w-full rounded-full bg-orange px-4 py-3 font-semibold text-white">
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
