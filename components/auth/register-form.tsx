"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string
    };

    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      setError('Please fill out all fields correctly.');
      setLoading(false);
      return;
    }

    const response = await fetch('/api/register', { method: 'POST', body: JSON.stringify(data) });
    if (!response.ok) {
      setError('Unable to create account.');
      setLoading(false);
      return;
    }

    router.push('/login');
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="mb-1 block text-sm font-semibold text-charcoal">Name</label>
        <input name="name" required className="w-full rounded-2xl border border-charcoal/10 bg-cream px-4 py-3" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-charcoal">Email</label>
        <input name="email" type="email" required className="w-full rounded-2xl border border-charcoal/10 bg-cream px-4 py-3" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-charcoal">Password</label>
        <input name="password" type="password" required className="w-full rounded-2xl border border-charcoal/10 bg-cream px-4 py-3" />
      </div>
      {error ? <p className="text-sm text-red">{error}</p> : null}
      <button type="submit" disabled={loading} className="w-full rounded-full bg-charcoal px-4 py-3 font-semibold text-cream">
        {loading ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  );
}
