"use client";

import { useState } from 'react';

export function CourseManager({ categories }: { categories: Array<{ id: string; name: string }> }) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      title: String(formData.get('title') || '').trim(),
      slug: String(formData.get('slug') || '').trim(),
      description: String(formData.get('description') || '').trim(),
      categoryId: String(formData.get('categoryId') || '')
    };

    const response = await fetch('/api/admin/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setStatus(data.error || 'Unable to create the course.');
      return;
    }

    setStatus(`Course created: ${data.course?.title || payload.title}`);
    event.currentTarget.reset();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-3xl border border-charcoal/10 bg-cream p-6">
        <h2 className="text-xl font-black text-charcoal">Create a new course</h2>
        <p className="mt-2 text-sm text-charcoal/70">Publish a new learning path with a starter lesson, quiz, and admin-ready metadata.</p>
        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-charcoal">Title</label>
            <input name="title" required className="w-full rounded-2xl border border-charcoal/10 bg-white px-4 py-3" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-charcoal">Slug</label>
            <input name="slug" className="w-full rounded-2xl border border-charcoal/10 bg-white px-4 py-3" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-charcoal">Category</label>
            <select name="categoryId" className="w-full rounded-2xl border border-charcoal/10 bg-white px-4 py-3">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-charcoal">Description</label>
            <textarea name="description" rows={4} required className="w-full rounded-2xl border border-charcoal/10 bg-white px-4 py-3" />
          </div>
          <button type="submit" disabled={loading} className="rounded-full bg-orange px-4 py-2 font-semibold text-white">
            {loading ? 'Creating…' : 'Create course'}
          </button>
          {status ? <p className="text-sm text-charcoal/70">{status}</p> : null}
        </form>
      </div>

      <div className="rounded-3xl border border-charcoal/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-charcoal">Admin shortcuts</h2>
        <div className="mt-4 space-y-3 text-sm text-charcoal/70">
          <div className="rounded-2xl border border-charcoal/10 bg-cream p-4">New courses now ship with a starter lesson and quiz module for faster onboarding.</div>
          <div className="rounded-2xl border border-charcoal/10 bg-cream p-4">Use the learner dashboard to review featured learning paths and progress snapshots.</div>
          <div className="rounded-2xl border border-charcoal/10 bg-cream p-4">Enrollment and certification views will become richer as the platform grows.</div>
        </div>
      </div>
    </div>
  );
}
