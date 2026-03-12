import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    titleZh: z.string().optional(),
    pubDate: z.date(),
    description: z.string().optional(),
    descriptionZh: z.string().optional(),
    audio: z.string().optional(),
  }),
});

const books = defineCollection({
  schema: z.object({
    title: z.string(),
    titleZh: z.string().optional(),
    price: z.string(),
    buyLink: z.string().url(),
    description: z.string(),
    descriptionZh: z.string().optional(),
    cover: z.string().optional(),
  }),
});

const links = defineCollection({
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    description: z.string().optional(),
    category: z.enum(['设计', '开发', '阅读', '思考', '工具', '音乐', '影像', '商业', '写作']),
    personal: z.string().default("false"),
  }),
});

const tracks = defineCollection({
  schema: z.object({
    num: z.string(),
    name: z.string(),
    file: z.string(),
  }),
});

const videos = defineCollection({
  schema: z.object({
    title: z.string(),
    titleZh: z.string().optional(),
    platform: z.enum(['YouTube', 'B站', '抖音', 'Vimeo', '自制', '其他']).optional(),
    url: z.string().url().optional(),
    file: z.string().optional(),
    cover: z.string().optional(),
    description: z.string().optional(),
    descriptionZh: z.string().optional(),
    pubDate: z.date(),
  }),
});

const ai = defineCollection({
  schema: z.object({
    title: z.string(),
    titleZh: z.string().optional(),
    pubDate: z.date(),
    description: z.string().optional(),
    models: z.array(z.string()).optional(),   // 模型/工具标签，如 ["GPT-4", "Claude"]
    refs: z.array(z.string().url()).optional(), // 外部参考链接
  }),
});

const blockchain = defineCollection({
  schema: z.object({
    title: z.string(),
    titleZh: z.string().optional(),
    pubDate: z.date(),
    description: z.string().optional(),
    chains: z.array(z.string()).optional(),   // 链名标签，如 ["ETH", "SOL"]
    refs: z.array(z.string().url()).optional(),
  }),
});

const crypto = defineCollection({
  schema: z.object({
    title: z.string(),
    titleZh: z.string().optional(),
    pubDate: z.date(),
    description: z.string().optional(),
    coins: z.array(z.string()).optional(),    // 币种标签，如 ["BTC", "ETH"]
    refs: z.array(z.string().url()).optional(),
  }),
});

export const collections = { blog, books, links, tracks, videos, ai, blockchain, crypto };
