import type { JsonLdNode } from "@/lib/seo/json-ld";

type JsonLdProps = {
  data: JsonLdNode | JsonLdNode[];
};

export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      dangerouslySetInnerHTML={{ __html: json }}
      type="application/ld+json"
    />
  );
}
