import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const categoryId = payload.categoryId as string | undefined;
  const title = String(payload.title || '').trim();
  const description = String(payload.description || '').trim();
  const slug = String(payload.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')).trim();

  if (!title || !description) {
    return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
  }

  const category = categoryId
    ? await prisma.category.findUnique({ where: { id: categoryId } })
    : await prisma.category.findFirst();

  if (!category) {
    return NextResponse.json({ error: 'Category not found.' }, { status: 404 });
  }

  const course = await prisma.course.create({
    data: {
      title,
      slug,
      description,
      categoryId: category.id
    }
  });

  await prisma.lesson.create({
    data: {
      title: `Welcome to ${title}`,
      description: 'Kick off your learning journey with the course overview.',
      content: 'This lesson introduces the course goals, learning outcomes, and what learners should expect.',
      courseId: course.id
    }
  });

  const quiz = await prisma.quiz.create({
    data: {
      title: `${title} check-in`,
      type: 'QUIZ',
      courseId: course.id
    }
  });

  await prisma.question.createMany({
    data: [
      {
        prompt: 'What is the main goal of this course?',
        options: ['Build confidence and job-ready skills', 'Avoid all practice', 'Only browse the dashboard'],
        answer: 'Build confidence and job-ready skills',
        quizId: quiz.id
      },
      {
        prompt: 'Which habit supports steady learning progress?',
        options: ['Practise consistently', 'Skip all lessons', 'Ignore feedback'],
        answer: 'Practise consistently',
        quizId: quiz.id
      }
    ]
  });

  return NextResponse.json({ success: true, course });
}
