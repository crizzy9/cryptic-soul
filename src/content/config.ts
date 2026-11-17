import { z, defineCollection } from "astro:content";
const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  category: z.string(),
  featured: z.boolean().default(false),
  updatedDate: z.string().optional(),
  heroImage: z.string().optional(),
  githubUrl: z.string().optional(),
  badges: z.array(z.string()).optional(),
  tags: z
    .array(z.string())
    .refine((items) => new Set(items).size === items.length, {
      message: "tags must be unique",
    })
    .optional(),
});

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  // Author-assigned article date; pubDate retains the actual release date for RSS.
  editorialDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  updatedDate: z.string().optional(),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  heroImageCredit: z.string().optional(),
  heroImageSource: z.string().url().optional(),
  badges: z.array(z.string()).optional(),
  tags: z
    .array(z.string())
    .refine((items) => new Set(items).size === items.length, {
      message: "tags must be unique",
    })
    .optional(),
});

const storeSchema = z.object({
  title: z.string(),
  description: z.string(),
  custom_link_label: z.string(),
  custom_link: z.string().optional(),
  updatedDate: z.coerce.date(),
  pricing: z.string().optional(),
  oldPricing: z.string().optional(),
  badges: z.array(z.string()).optional(),
  checkoutUrl: z.string().optional(),
  heroImage: z.string().optional(),
});

export type ProjectSchema = z.infer<typeof projectSchema>;
export type BlogSchema = z.infer<typeof blogSchema>;
export type StoreSchema = z.infer<typeof storeSchema>;

const projectCollection = defineCollection({ schema: projectSchema });
const blogCollection = defineCollection({ schema: blogSchema });
const storeCollection = defineCollection({ schema: storeSchema });

export const collections = {
  project: projectCollection,
  blog: blogCollection,
  store: storeCollection,
};

