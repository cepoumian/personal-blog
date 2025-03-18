import { baseData } from "@/data/siteData";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

// Get all the posts
export async function GET(context: { site: any }) {
  const posts = await getCollection("posts");

  return rss({
    stylesheet: "/rss/styles.xsl",
    title: baseData.title,
    description: baseData.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      category: post.data.category,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
