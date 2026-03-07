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
    cover: z.string().optional(), // ← 封面图路径，可不填
  }),
});

const links = defineCollection({
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    description: z.string().optional(),
    category: z.enum(['设计', '工具', '阅读', '思考', '其他']),
   personal: z.string().default("false"), // true = 自用收藏，false = 推荐给读者
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
    platform: z.enum(['YouTube', 'B站', '抖音', 'Vimeo', '其他']),
    url: z.string().url(),
    description: z.string().optional(),
    descriptionZh: z.string().optional(),
    pubDate: z.date(),
  }),
});

export const collections = { blog, books, links, tracks, videos };
