import {
  Badge,
  Box,
  Card,
  DataList,
  Flex,
  Heading,
  Inset,
  SegmentedControl,
  Separator,
  Text,
} from "@radix-ui/themes";
import { CurlyBracesIcon, FileIcon, ScrollTextIcon } from "lucide-react";
import { useCallback } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import WithMarkdownLinks from "~/components/WithMarkdownLinks";
import cv from "../../static/resume.json" with { type: "json" };

const FORMATS = ["html", "json", "pdf"];

const FORMAT_ICONS = {
  html: FileIcon,
  json: CurlyBracesIcon,
  pdf: ScrollTextIcon,
} as const;

export async function loader() {
  return cv;
}

export type CVLoader = typeof loader;

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
        <Card size={{ initial: "4", sm: "5" }}>
          {format === "html" ? (
            <CVContent />
          ) : format === "json" ? (
            <CVJSON />
          ) : null}
        </Card>
      </Box>
    </Flex>
  );
}

function CVContent() {
  const data = useLoaderData<typeof loader>();

  return (
    <Flex gap="4" direction={{ initial: "column", md: "row" }}>
      <Separator orientation="vertical" size="4" />
      <Flex direction="column" gap="4">
        <Heading size="8">{data.basics.name}</Heading>
        <Text size={{ initial: "2", sm: "3" }} color="gray">
          {data.basics.summary}
        </Text>

        <Flex direction="column" gap="4" py="4">
          <Heading size="8">Work</Heading>
          {data?.work.map((work) => (
            <Flex key={work.company} direction="column" gap="3">
              <Heading size="5">
                {work.position} at {work.company}
              </Heading>
              <Text size="2" color="gray">
                {work.startDate} &ndash; {work.endDate ?? "Present"}
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
      </Flex>

      <Flex asChild direction={{ initial: "column", md: "row" }}>
        <Inset
          side={{ initial: "bottom", md: "right" }}
          style={{ backgroundColor: "var(--gray-2)" }}
        >
          <Box height="100%" display="block" minHeight="1px" asChild>
            <Separator
              orientation={{ initial: "horizontal", md: "vertical" }}
              size="4"
            />
          </Box>
          <Flex
            direction={{ initial: "row", md: "column" }}
            wrap="wrap"
            justify={{ initial: "start", md: "between" }}
            gap="4"
            p="8"
            pr="0"
          >
            <Flex direction="column" gap="6">
              <Heading size="6">Education</Heading>
              {data?.education.map((education) => (
                <Flex key={education.institution} direction="column" gap="3">
                  <Heading size="5">{education.institution}</Heading>
                  <Text size="2" color="gray">
                    {education.startDate} &ndash;{" "}
                    {education.endDate ?? "Present"}
                  </Text>
                  <Text size="2">{education.area}</Text>
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
            </Flex>

            <Flex direction="column" gap="4" justify="between">
              <Heading size="6">Skills</Heading>
              <ul>
                {data.skills.map((skill) => (
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
            </Flex>

            <Flex direction="column" gap="4">
              <Heading size="6">Languages</Heading>
              <DataList.Root orientation="vertical">
                {data?.languages.map(({ language, fluency }) => (
                  <DataList.Item key={language}>
                    <DataList.Label>{language}</DataList.Label>
                    <DataList.Value>{fluency}</DataList.Value>
                  </DataList.Item>
                ))}
              </DataList.Root>
            </Flex>
          </Flex>
        </Inset>
      </Flex>
    </Flex>
  );
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
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    </>
  );
}
