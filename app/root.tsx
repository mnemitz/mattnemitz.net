import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "@radix-ui/themes/styles.css";
import "./app.css";
import { Card, Code, Flex, Heading, Text, Theme } from "@radix-ui/themes";
import { AlertCircleIcon } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Nav } from "./components/Nav";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // supressHydrationWarning is needed for next-themes
    // https://www.npmjs.com/package/next-themes
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* OpenGraph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Matt Nemitz" />
        <meta property="og:title" content="Matt Nemitz - Software Engineer" />
        <meta
          property="og:description"
          content="Software Engineer based in London, UK. Currently working at Speechmatics."
        />
        <meta property="og:image" content="/headshot.jpg" />
        <meta property="og:image:alt" content="Matt Nemitz headshot" />
        <meta property="og:url" content="https://mattnemitz.net" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Matt Nemitz - Software Engineer" />
        <meta
          name="twitter:description"
          content="Software Engineer based in London, UK. Currently working at Speechmatics."
        />
        <meta name="twitter:image" content="/headshot.jpg" />
        <meta name="twitter:image:alt" content="Matt Nemitz headshot" />

        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Matt Nemitz" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#46a758" />

        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider attribute="class">
          <Theme accentColor="grass" grayColor="sand">
            <Flex direction="column">
              <Nav />
              {children}
            </Flex>
          </Theme>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Sorry, something went wrong...";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <Flex direction="column" asChild gap="8" maxWidth="1300px" m="auto" p="8">
      <main>
        <AlertCircleIcon color="var(--red-8)" size="72" />
        <Heading size="8">{message}</Heading>
        <Text size="3">{details}</Text>
        {stack && (
          <Card
            asChild
            variant="ghost"
            style={{ backgroundColor: "var(--accent-2)" }}
            data-accent-color="red"
          >
            <pre className="w-full p-4 overflow-x-auto">
              <Code variant="ghost" size="2">
                {stack}
              </Code>
            </pre>
          </Card>
        )}
      </main>
    </Flex>
  );
}
