import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const courseId = String(payload.courseId || '').trim();

  if (!courseId) {
    return NextResponse.json({ error: 'Course id is required.' }, { status: 400 });
  }

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) {
    return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
  }

  const existing = await prisma.enrollment.findFirst({
    where: { userId: session.user.id, courseId }
  });

  if (existing) {
    return NextResponse.json({ success: true, enrolled: true, enrollment: existing });
  }

  const enrollment = await prisma.enrollment.create({
    data: {
      userId: session.user.id,
      courseId,
      status: 'ACTIVE',
      progress: 0
    }
  });

  await prisma.progress.create({
    data: {
      userId: session.user.id,
      courseId,
      completed: false,
      score: 0,
      xp: 0,
      coins: 0
    }
  }).catch(() => undefined);

  return NextResponse.json({ success: true, enrolled: true, enrollment });
}
