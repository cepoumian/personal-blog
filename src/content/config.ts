import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string().max(65, {
        message: "Title cannot be longer than 65 characters",
      }),
      description: z.string().max(165, {
        message: "Description cannot be longer than 165 characters",
      }),
      pubDate: z.date(),
      isDraft: z.boolean().optional(),
      category: z.string().optional(),
    }),
});

const about = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string().max(65, {
        message: "Title cannot be longer than 65 characters",
      }),
    }),
});

export const collections = { posts, about };
