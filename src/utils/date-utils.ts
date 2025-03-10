import type { CollectionEntry } from "astro:content";

export function formatDate(pubDate: Date) {
  const formattedDate = new Date(pubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
}

export function sortPostsByDate(posts: CollectionEntry<"posts">[]) {
  return posts.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
}
