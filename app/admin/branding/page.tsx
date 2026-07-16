import { prisma } from '@/lib/prisma';
import { BrandingForm } from '@/components/admin/branding-form';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BrandingPage() {
  const branding = await prisma.branding.findFirst();

  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-5xl rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange">Admin branding</p>
          <h1 className="mt-2 text-3xl font-black text-charcoal">Branding & settings</h1>
          <p className="mt-2 text-sm text-charcoal/70">Configure logos, footer text, and theme colors across the learning environment.</p>
        </div>
        <BrandingForm branding={branding} />
      </div>
    </main>
  );
}
