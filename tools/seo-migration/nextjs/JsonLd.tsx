// Drop-in for a migrated practice site — copy to src/components/JsonLd.tsx.

/**
 * Renders schema.org nodes as one JSON-LD graph, in the server HTML Google reads.
 * `<` is escaped so text inside the data can't close the script tag.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const graph = { "@context": "https://schema.org", "@graph": [data].flat() };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}
