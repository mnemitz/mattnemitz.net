import {
  Badge,
  Blockquote,
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  Inset,
  Link,
  SegmentedControl,
  Separator,
  Text,
} from "@radix-ui/themes";
import { CurlyBracesIcon, FileIcon } from "lucide-react";
import { Highlight } from "prism-react-renderer";
import { useCallback } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import WithMarkdownLinks from "~/components/WithMarkdownLinks";
import prismTheme from "../../prism-theme";
import cv from "../../static/resume.json" with { type: "json" };

export function meta() {
  return [
    { title: "CV | Matt Nemitz" },
    { name: "description", content: "My CV" },
  ];
}

const FORMATS = ["html", "json"];

const FORMAT_ICONS = {
  html: FileIcon,
  json: CurlyBracesIcon,
} as const;

export async function loader() {
  return cv;
}

export default function CV() {
  const [params, setParams] = useSearchParams();

  const format = params.get("format") || "html";

  const setFormat = useCallback(
    (format: string) => {
      setParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete("format");
        if (format !== "html") {
          newParams.set("format", format);
        }
        return newParams;
      });
    },
    [setParams],
  );

  return (
    <Flex direction="column" width="100%" align="end" gap="4">
      <SegmentedControl.Root
        size={{ initial: "1", sm: "2" }}
        value={format}
        onValueChange={setFormat}
      >
        {FORMATS.map((format) => {
          const Icon = FORMAT_ICONS[format as keyof typeof FORMAT_ICONS];
          return (
            <SegmentedControl.Item value={format} key={format}>
              <Flex gap="2" align="center">
                <Icon size="12" />
                {format.toUpperCase()}
              </Flex>
            </SegmentedControl.Item>
          );
        })}
      </SegmentedControl.Root>
      <Box asChild width="100%">
        <Card size={{ initial: "4", sm: "5" }} asChild>
          <article>
            {format === "html" ? (
              <CVContent />
            ) : format === "json" ? (
              <CVJSON />
            ) : null}
          </article>
        </Card>
      </Box>
    </Flex>
  );
}

function CVContent() {
  return (
    <Flex gap="4" direction={{ initial: "column", md: "row" }}>
      <Flex direction="column" gap="4">
        <Basics />
        <Projects />
        <Text weight="medium" size="5">
          References available on request.
        </Text>
      </Flex>

      <Flex asChild direction={{ initial: "column", md: "row" }}>
        <Inset
          side={{ initial: "bottom", md: "right" }}
          style={{ backgroundColor: "var(--gray-2)" }}
          asChild
        >
          <aside>
            <Box height="100%" display="block" minHeight="1px" asChild>
              <Separator
                orientation={{ initial: "horizontal", md: "vertical" }}
                size="4"
              />
            </Box>
            <Grid columns={{ initial: "1", sm: "2", md: "1" }} gap="4" p="8">
              <Education />
              <Skills />
              <Languages />
              <Interests />
            </Grid>
          </aside>
        </Inset>
      </Flex>
    </Flex>
  );
}

function Experience() {
  const { work } = useLoaderData<typeof loader>();
  return (
    <Flex direction="column" gap="4" py="4">
      <Heading size="8">Work</Heading>
      {work.map((work) => (
        <Flex key={work.company} direction="column" gap="3">
          <Heading size="5">
            {work.position} at {work.company}
          </Heading>
          <Text size="2" color="gray">
            {cvDate(work.startDate)} &ndash; {cvDate(work.endDate)}
          </Text>
          <Text>{work.summary}</Text>
          <ul>
            {work.highlights.map((highlight) => (
              <li key={highlight}>
                <WithMarkdownLinks>{highlight}</WithMarkdownLinks>
              </li>
            ))}
          </ul>
        </Flex>
      ))}
    </Flex>
  );
}

function Basics() {
  const { basics } = useLoaderData<typeof loader>();
  return (
    <Flex direction="column" asChild gap="4">
      <section>
        <Heading size="8">{basics.name}</Heading>
        <Text size="4" color="gray">
          {basics.label}
        </Text>
        <Blockquote>{basics.summary}</Blockquote>
        <Experience />
      </section>
    </Flex>
  );
}

function Projects() {
  const { projects } = useLoaderData<typeof loader>();
  return (
    <Flex direction="column" asChild>
      <section>
        <Heading size="8">Projects</Heading>
        <ul>
          {projects.map((project) => (
            <li key={project.name}>
              <Text>
                <Link href={project.url} target="_blank">
                  {project.name}
                </Link>
                &nbsp;&mdash;&nbsp;
                <WithMarkdownLinks>{project.description}</WithMarkdownLinks>
              </Text>
            </li>
          ))}
        </ul>
      </section>
    </Flex>
  );
}

function Education() {
  const { education } = useLoaderData<typeof loader>();
  return (
    <Flex direction="column" asChild>
      <section>
        <Heading size="6" mb="4">
          Education
        </Heading>
        {education.map((education) => (
          <Flex key={education.institution} direction="column" gap="3">
            <Heading size="5">{education.institution}</Heading>
            <Text size="2" color="gray">
              {cvDate(education.startDate)} &ndash; {cvDate(education.endDate)}
            </Text>
            <Text size="2">
              {education.studyType} in {education.area}
            </Text>
            <Text size="2">
              <ul>
                {education.courses.map((course) => (
                  <li key={course}>
                    <WithMarkdownLinks>{course}</WithMarkdownLinks>
                  </li>
                ))}
              </ul>
            </Text>
          </Flex>
        ))}
      </section>
    </Flex>
  );
}

function Languages() {
  const { languages } = useLoaderData<typeof loader>();
  return (
    <Flex direction="column" asChild>
      <section>
        <Heading size="6">Languages</Heading>
        <ul>
          {languages.map(({ language, fluency, notes, isoCode }) => (
            <li key={language}>
              <Text size="2">
                <Text weight="bold">{fluency}</Text> {language}
                <br />
                <Box asChild mb="2">
                  <Blockquote size="2" lang={isoCode} weight="light">
                    {notes}
                  </Blockquote>
                </Box>
              </Text>
            </li>
          ))}
        </ul>
      </section>
    </Flex>
  );
}

function Skills() {
  const { skills } = useLoaderData<typeof loader>();
  return (
    <Flex direction="column" justify="between" asChild>
      <section>
        <Heading size="6">Skills</Heading>
        <ul>
          {skills.map((skill) => (
            <li key={skill.name}>
              <Text size="2">
                <Text weight="bold">{skill.level}</Text> in {skill.name}
              </Text>
              <Flex wrap="wrap" gap="2" mb="2">
                {skill.keywords.map((keyword) => (
                  <Badge variant="surface" key={keyword}>
                    {keyword}
                  </Badge>
                ))}
              </Flex>
            </li>
          ))}
        </ul>
      </section>
    </Flex>
  );
}

function Interests() {
  const { interests } = useLoaderData<typeof loader>();
  return (
    <Flex direction="column" asChild>
      <section>
        <Heading size="6">Interests</Heading>
        <ul>
          {interests.map(({ name, keywords }) => (
            <li key={name}>
              <Text size="2">
                <Text weight="bold">{name}</Text>
              </Text>
              <Flex wrap="wrap" gap="2" mb="2">
                {keywords.map((keyword) => (
                  <Badge variant="surface" key={keyword}>
                    {keyword}
                  </Badge>
                ))}
              </Flex>
            </li>
          ))}
        </ul>
      </section>
    </Flex>
  );
}

function cvDate(date?: string) {
  if (!date) {
    return "Present";
  }
  return new Date(date).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

function CVJSON() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Inset side="top">
        <Flex direction="column" justify="between" height="65px">
          <Flex px="6" align="center" height="100%">
            <Flex asChild gap="2">
              <Text
                size="2"
                color="gray"
                style={{ fontFamily: "var(--code-font-family)" }}
              >
                <FileIcon size="16" />
                mattnemitz-cv.json
              </Text>
            </Flex>
          </Flex>
          <Separator orientation="horizontal" size="4" />
        </Flex>
      </Inset>
      <Box asChild p="3">
        <Highlight
          language="json"
          code={JSON.stringify(data, null, 2)}
          theme={prismTheme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: Static data
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: Static data
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </Box>
    </>
  );
}
