import type { PrismTheme } from "prism-react-renderer";

export default {
  plain: {
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["string"],
      style: {
        color: "var(--accent-11)",
      },
    },
    {
      types: ["property"],
      style: {
        color: "var(--brown-11)",
      },
    },
  ],
} satisfies PrismTheme;
