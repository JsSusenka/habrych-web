import React, { useMemo } from "react";
import Head from "next/head";
import {
  AppShell,
  Header,
  Group,
  Text,
  Center,
  Stack,
  Divider,
  NumberInput,
  Footer,
} from "@mantine/core";
import { Slider } from "components/Slider";
import { useSliderStore } from "stores/useSliderStore";

export default function Home() {
  const { count, sliders, sum, setSliderCount } = useSliderStore();

  const average = useMemo<number>(() => sum / count, [sum, count]);

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
              <Text fz="lg">Hodnocení kriterii</Text>
            </Group>
          </Header>
        }
        footer={
          <Footer height={60} p="md">
            <Center>
              {!isNaN(average) && count > 0 && (
                <Text>Průměřný výsledek: {average.toFixed(2)}%</Text>
              )}
            </Center>
          </Footer>
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
        <Center>
          <NumberInput
            defaultValue={2}
            min={0}
            max={100}
            placeholder="Zadejte počet sliderů"
            label="Počet sliderů"
            withAsterisk
            value={count}
            onChange={setSliderCount}
          />
        </Center>

        <Divider my={20} />

        <Stack spacing="xl">
          {sliders.map((slider) => (
            <Slider key={slider.id} id={slider.id} />
          ))}
        </Stack>
      </AppShell>
    </>
  );
}
