import { SiBluesky, SiGithub } from "@icons-pack/react-simple-icons";
import {
  Avatar,
  Box,
  Card,
  DataList,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import type React from "react";

// import type { Route } from "./+types/home";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <Flex direction="column" justify="center" align="center" gap="9" my="9">
      <Heading size="8">👋 Hey there! I'm...</Heading>
      <BusinessCard />
      <Text size="6">You can find me on...</Text>
      <Grid
        columns={{ initial: "2", sm: "3" }}
        gap="4"
        width="100%"
        maxWidth="650px"
        justify="center"
      >
        <SocialCard
          href="https://github.com/mnemitz"
          icon={<SiGithub />}
          name="GitHub"
          handle="@mnemitz"
        />
        <SocialCard
          href="https://www.linkedin.com/in/matt-nemitz/"
          icon={null}
          name="LinkedIn"
          handle="matt-nemitz"
        />
        <SocialCard
          href="https://bluesky.app/profile/mattnemitz.com"
          icon={<SiBluesky />}
          name="Bluesky"
          handle="mattnemitz.com"
        />
      </Grid>
    </Flex>
  );
}

function BusinessCard() {
  return (
    <Box asChild maxWidth="650px" width="100%">
      <Card size="5">
        <Flex
          direction={{ initial: "column", sm: "row" }}
          gap="8"
          align={{ initial: "center", sm: "start" }}
        >
          <Avatar size="9" fallback="MN" radius="full" />
          <Flex
            direction="column"
            gap="5"
            width="100%"
            align={{ initial: "center", sm: "start" }}
          >
            <Heading size="8">Matt Nemitz</Heading>
            <DataList.Root
              size="3"
              orientation={{ initial: "vertical", xs: "horizontal" }}
            >
              <DataList.Item>
                <DataList.Item>
                  <DataList.Label>Occupation</DataList.Label>
                  <DataList.Value>Software Engineer</DataList.Value>
                </DataList.Item>
              </DataList.Item>
              <DataList.Item>
                <DataList.Item>
                  <DataList.Label>Location</DataList.Label>
                  <DataList.Value>London, UK</DataList.Value>
                </DataList.Item>
              </DataList.Item>
              <DataList.Item>
                <DataList.Item>
                  <DataList.Label>Favorite color</DataList.Label>
                  <DataList.Value>
                    <Text color="green" size="3">
                      Green
                    </Text>
                  </DataList.Value>
                </DataList.Item>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Currently at</DataList.Label>
                <DataList.Value>Speechmatics</DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}

function SocialCard({
  href,
  icon,
  name,
  handle,
}: {
  href: string;
  icon: React.ReactNode;
  name: string;
  handle: string;
}) {
  return (
    <Card size="3" asChild>
      <a href={href} target="_blank">
        <Flex gap="2">
          {icon}
          <Flex direction="column">
            <Text weight="bold">{name}</Text>
            <Text size="2" color="gray">
              {handle}
            </Text>
          </Flex>
        </Flex>
      </a>
    </Card>
  );
}
