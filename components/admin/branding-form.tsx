"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function BrandingForm({ branding }: { branding: any }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch('/api/admin/branding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setStatus('Branding updated successfully');
      router.refresh();
    } else {
      setStatus('Unable to update branding.');
    }
    setSaving(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-charcoal">Site name</label>
          <input name="siteName" defaultValue={branding?.siteName ?? 'Eshishayong'} className="w-full rounded-2xl border border-charcoal/10 bg-cream px-4 py-3" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-charcoal">Footer text</label>
          <input name="footerText" defaultValue={branding?.footerText ?? 'Developed by Eshishayong'} className="w-full rounded-2xl border border-charcoal/10 bg-cream px-4 py-3" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-charcoal">Primary color</label>
          <input name="primaryColor" type="color" defaultValue={branding?.primaryColor ?? '#E86A33'} className="h-12 w-full rounded-2xl border border-charcoal/10" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-charcoal">Secondary color</label>
          <input name="secondaryColor" type="color" defaultValue={branding?.secondaryColor ?? '#E6A532'} className="h-12 w-full rounded-2xl border border-charcoal/10" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-charcoal">Accent color</label>
          <input name="accentColor" type="color" defaultValue={branding?.accentColor ?? '#C23B22'} className="h-12 w-full rounded-2xl border border-charcoal/10" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-charcoal">Logo URL</label>
        <input name="logoUrl" defaultValue={branding?.logoUrl ?? ''} className="w-full rounded-2xl border border-charcoal/10 bg-cream px-4 py-3" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-charcoal">Dark logo URL</label>
        <input name="darkLogoUrl" defaultValue={branding?.darkLogoUrl ?? ''} className="w-full rounded-2xl border border-charcoal/10 bg-cream px-4 py-3" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-charcoal">Favicon URL</label>
        <input name="faviconUrl" defaultValue={branding?.faviconUrl ?? ''} className="w-full rounded-2xl border border-charcoal/10 bg-cream px-4 py-3" />
      </div>
      {status ? <p className="text-sm text-charcoal/70">{status}</p> : null}
      <button type="submit" disabled={saving} className="rounded-full bg-orange px-5 py-3 font-semibold text-white">
        {saving ? 'Saving...' : 'Save branding'}
      </button>
    </form>
  );
}
