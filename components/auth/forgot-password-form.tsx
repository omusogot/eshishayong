"use client";

import { useState } from 'react';

export function ForgotPasswordForm() {
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    setMessage(`If ${email} is registered, a reset link can be sent next.`);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-semibold text-charcoal">Email</label>
        <input name="email" type="email" required className="w-full rounded-2xl border border-charcoal/10 bg-cream px-4 py-3" />
      </div>
      {message ? <p className="text-sm text-charcoal/70">{message}</p> : null}
      <button type="submit" className="w-full rounded-full bg-orange px-4 py-3 font-semibold text-white">Send reset link</button>
    </form>
  );
}
