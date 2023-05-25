import React from "react";
import Head from "next/head";
import { AppShell, Header, Group, Text } from "@mantine/core";
import Link from "next/link";

export default function Logic() {
  return (
    <>
      <Head>
        <title>Nadějná věc</title>
      </Head>
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            <Group my={5}>
              <Text fz="lg"> Logické výrazy</Text>
              <Text fz="lg" component={Link} href="/" c="blue">
                Hodnocení kriterii
              </Text>
            </Group>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        pepa
      </AppShell>
    </>
  );
}
