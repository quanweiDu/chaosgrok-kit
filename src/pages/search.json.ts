import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  const books = await getCollection('books');
  const links = await getCollection('links');

  const index = [
    ...posts.map(p => ({
      type: 'blog',
      slug: p.slug,
      title: p.data.title,
      titleZh: p.data.titleZh ?? '',
      description: p.data.description ?? p.data.descriptionZh ?? '',
      url: `/blog/${p.slug}`,
    })),
    ...books.map(b => ({
      type: 'books',
      slug: b.slug,
      title: b.data.title,
      titleZh: b.data.titleZh ?? '',
      description: b.data.description ?? '',
      url: `/books/${b.slug}`,
    })),
    ...links.map(l => ({
      type: 'links',
      slug: l.slug,
      title: l.data.title,
      titleZh: '',
      description: l.data.description ?? '',
      url: l.data.url,
    })),
  ];

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
