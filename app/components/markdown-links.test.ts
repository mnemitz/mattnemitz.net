import { describe, expect, it } from "vitest";
import { splitStringWithMarkdownLinks } from "./WithMarkdownLinks";

describe("splitStringWithMarkdownLinks", () => {
  it("should split a string with markdown links", () => {
    const str = "[Google](https://google.com) and [GitHub](https://github.com)";
    const result = splitStringWithMarkdownLinks(str);
    expect(result).toEqual([
      {
        text: "Google",
        href: "https://google.com",
      },
      " and ",
      {
        text: "GitHub",
        href: "https://github.com",
      },
    ]);
  });

  it("should return a single string if there are no markdown links", () => {
    const str = "Hello, world!";
    const result = splitStringWithMarkdownLinks(str);
    expect(result).toEqual(str);
  });
});
