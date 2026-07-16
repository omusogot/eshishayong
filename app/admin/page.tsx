import Link from 'next/link';

const modules = [
  { title: 'Users', href: '/admin/users' },
  { title: 'Branding', href: '/admin/branding' },
  { title: 'Courses', href: '/admin/courses' }
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange">Admin console</p>
        <h1 className="mt-2 text-3xl font-black text-charcoal">Eshishayong admin hub</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {modules.map((module) => (
            <Link key={module.title} href={module.href} className="rounded-2xl border border-charcoal/10 bg-cream p-5 font-semibold text-charcoal">
              {module.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
