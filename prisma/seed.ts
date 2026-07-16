import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const categories = [
  { name: 'Digital Literacy', description: 'Essential digital skills for everyday work and entrepreneurship.' },
  { name: 'Social Media Marketing', description: 'Marketing and communication skills for modern businesses.' },
  { name: 'Agribusiness', description: 'Practical training for farming, logistics, and value chains.' },
  { name: 'Digital Accounting', description: 'Bookkeeping and financial literacy for small businesses.' },
  { name: 'Smartphone Photography', description: 'Creative visual storytelling using everyday phones.' },
  { name: 'Virtual Assistance', description: 'Remote support, organisation, and customer service skills.' },
  { name: 'Basic Web Development', description: 'Foundational web skills and digital product creation.' },
  { name: 'Warehouse Management', description: 'Inventory, supply chain fundamentals, and operations.' }
];

const courses = [
  { title: 'Digital Literacy Essentials', slug: 'digital-literacy-essentials', category: 'Digital Literacy', description: 'Build confidence with digital tools, collaboration, and safe online habits.' },
  { title: 'Social Media for Small Business', slug: 'social-media-for-small-business', category: 'Social Media Marketing', description: 'Create content and campaigns that connect local businesses to customers.' },
  { title: 'Agribusiness Growth Skills', slug: 'agribusiness-growth-skills', category: 'Agribusiness', description: 'Learn practical marketing, records, and logistics for agricultural value chains.' },
  { title: 'Digital Accounting for Entrepreneurs', slug: 'digital-accounting-for-entrepreneurs', category: 'Digital Accounting', description: 'Track income, expenses, and cash flow using simple digital tools.' },
  { title: 'Smartphone Photography for Impact', slug: 'smartphone-photography-for-impact', category: 'Smartphone Photography', description: 'Capture compelling photos for products, stories, and social media.' },
  { title: 'Virtual Assistant Bootcamp', slug: 'virtual-assistant-bootcamp', category: 'Virtual Assistance', description: 'Develop practical remote work skills to support clients and teams.' },
  { title: 'Basic Web Development for Beginners', slug: 'basic-web-development-for-beginners', category: 'Basic Web Development', description: 'Launch your first responsive website with foundational web skills.' },
  { title: 'Warehouse Operations Basics', slug: 'warehouse-operations-basics', category: 'Warehouse Management', description: 'Improve inventory visibility and operation flow in simple, measurable steps.' }
];

async function main() {
  const adminRole = await prisma.role.upsert({ where: { name: 'ADMIN' }, update: {}, create: { name: 'ADMIN' } });
  const instructorRole = await prisma.role.upsert({ where: { name: 'INSTRUCTOR' }, update: {}, create: { name: 'INSTRUCTOR' } });
  const studentRole = await prisma.role.upsert({ where: { name: 'STUDENT' }, update: {}, create: { name: 'STUDENT' } });
  const expertRole = await prisma.role.upsert({ where: { name: 'EXPERT' }, update: {}, create: { name: 'EXPERT' } });

  await prisma.branding.upsert({
    where: { id: 'branding' },
    update: {},
    create: {
      id: 'branding',
      siteName: 'Eshishayong',
      footerText: 'Developed by Eshishayong for inclusive digital skills.',
      primaryColor: '#E86A33',
      secondaryColor: '#E6A532',
      accentColor: '#C23B22'
    }
  });

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    });
  }

  for (const course of courses) {
    const category = await prisma.category.findUnique({ where: { name: course.category } });
    if (!category) continue;
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {},
      create: {
        title: course.title,
        slug: course.slug,
        description: course.description,
        categoryId: category.id
      }
    });
  }

  const passwordHash = await bcrypt.hash('password123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@eshishayong.com' },
    update: {},
    create: {
      email: 'admin@eshishayong.com',
      name: 'Administrator',
      passwordHash,
      roleId: adminRole.id
    }
  });

  await prisma.user.upsert({
    where: { email: 'instructor@eshishayong.com' },
    update: {},
    create: {
      email: 'instructor@eshishayong.com',
      name: 'Amina Instructor',
      passwordHash,
      roleId: instructorRole.id
    }
  });

  await prisma.user.upsert({
    where: { email: 'student@eshishayong.com' },
    update: {},
    create: {
      email: 'student@eshishayong.com',
      name: 'Daniel Student',
      passwordHash,
      roleId: studentRole.id
    }
  });

  await prisma.user.upsert({
    where: { email: 'expert@eshishayong.com' },
    update: {},
    create: {
      email: 'expert@eshishayong.com',
      name: 'Nadia Expert',
      passwordHash,
      roleId: expertRole.id
    }
  });

  await prisma.auditLog.createMany({
    data: [
      { action: 'seed', userId: admin.id, details: 'Initial seed executed' },
      { action: 'seed', details: 'Default branding created' }
    ]
  });
}

main().then(() => prisma.$disconnect()).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
