import Link from 'next/link';

const stats = [
  { label: 'Active learners', value: '3.2k' },
  { label: 'Skills launched', value: '48' },
  { label: 'Certificates issued', value: '1.1k' }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(230,165,50,0.25),_transparent_50%)] px-4 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="rounded-3xl border border-charcoal/10 bg-white/80 p-8 shadow-sm backdrop-blur md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="inline-flex rounded-full bg-orange/10 px-3 py-1 text-sm font-semibold text-orange">Eshishayong LMS</p>
              <h1 className="text-4xl font-black tracking-tight text-charcoal sm:text-5xl">Grow skills, opportunity, and impact in one place.</h1>
              <p className="text-lg text-charcoal/70">A polished monolithic learning platform with admin tools, course delivery, progress tracking, certificates, and gamification built for rapid launch.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/login" className="rounded-full bg-charcoal px-5 py-3 font-semibold text-cream">Login</Link>
              <Link href="/register" className="rounded-full bg-orange px-5 py-3 font-semibold text-white">Create account</Link>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-charcoal/10 bg-cream p-4">
                <p className="text-3xl font-black text-charcoal">{stat.value}</p>
                <p className="text-sm text-charcoal/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
