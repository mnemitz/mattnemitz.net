import { Link as RadixLink } from "@radix-ui/themes";
import { Link } from "react-router";

export default function WithMarkdownLinks({ children }: { children: string }) {
  const segments = splitStringWithMarkdownLinks(children);

  if (typeof segments === "string") {
    return segments;
  }

  return segments.map((segment, index) => {
    if (typeof segment === "string") {
      return segment;
    }

    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: This is static, and we need it to be ordinal
      <RadixLink asChild key={index} highContrast weight="medium">
        <Link to={segment.href}>{segment.text}</Link>
      </RadixLink>
    );
  });
}

// Dumbed down RegExp parser for markdown links.
// The actual grammar is context-free, but as long as we avoid using the "[" character on its own after links,
// we can get away with this, and it's way faster than using a proper parser.
export function splitStringWithMarkdownLinks(str: string) {
  const segments = Array.from(
    (function* () {
      for (const match of str.matchAll(
        /(?<start>[^[\]]*)(?:\[)(?<linktext>[^[\]]+)(?:\])(?:\()(?<href>[^()]+)(?:\))(?<tail>[^[]*)/g,
      )) {
        if (!match.groups) continue;

        if (match.groups.start) yield match.groups?.start;

        yield {
          text: match.groups.linktext,
          href: match.groups.href,
        };

        if (match.groups.tail) yield match.groups.tail;
      }
    })(),
  );

  if (segments.length === 0) {
    return str;
  }

  return segments;
}
