import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function SiteFooter() {
  const branding = await prisma.branding.findFirst();

  return (
    <footer className="border-t border-charcoal/10 bg-white/60 px-4 py-6 text-center text-sm text-charcoal/70">
      <p>{branding?.footerText ?? 'Developed by Eshishayong'}</p>
    </footer>
  );
}
