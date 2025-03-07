import type { CollectionEntry } from "astro:content";

export function formatDate(dateString: string) {
  const [month, day, year] = dateString.split("/");
  const date = new Date(`${year}-${month}-${day}`);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function sortPostsByDate(posts: CollectionEntry<"posts">[]) {
  return posts.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
}
