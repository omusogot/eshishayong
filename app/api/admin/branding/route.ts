import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const payload = await request.json();
  const existing = await prisma.branding.findFirst();

  if (existing) {
    await prisma.branding.update({
      where: { id: existing.id },
      data: {
        siteName: payload.siteName ?? existing.siteName,
        footerText: payload.footerText ?? existing.footerText,
        logoUrl: payload.logoUrl ?? existing.logoUrl,
        darkLogoUrl: payload.darkLogoUrl ?? existing.darkLogoUrl,
        faviconUrl: payload.faviconUrl ?? existing.faviconUrl,
        primaryColor: payload.primaryColor ?? existing.primaryColor,
        secondaryColor: payload.secondaryColor ?? existing.secondaryColor,
        accentColor: payload.accentColor ?? existing.accentColor
      }
    });
  } else {
    await prisma.branding.create({
      data: {
        siteName: payload.siteName ?? 'Eshishayong',
        footerText: payload.footerText ?? 'Developed by Eshishayong',
        logoUrl: payload.logoUrl,
        darkLogoUrl: payload.darkLogoUrl,
        faviconUrl: payload.faviconUrl,
        primaryColor: payload.primaryColor ?? '#E86A33',
        secondaryColor: payload.secondaryColor ?? '#E6A532',
        accentColor: payload.accentColor ?? '#C23B22'
      }
    });
  }

  return NextResponse.json({ success: true });
}
