import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'MR.QuanweiDU',
    description: '记录思考的轨迹。关于代码、逻辑与存在本身。',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map(p => ({
        title: p.data.title,
        pubDate: p.data.pubDate,
        description: p.data.description ?? '',
        link: `/blog/${p.slug}/`,
      })),
    customData: `<language>zh-CN</language>`,
  });
}
