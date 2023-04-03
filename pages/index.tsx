import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  AppShell,
  Header,
  Group,
  Text,
  Center,
  Slider,
  Stack,
  Divider,
  NumberInput,
  Footer,
} from "@mantine/core";
import { usePrevious } from "@mantine/hooks";

interface CustomSliderProps {
  setSum: React.Dispatch<React.SetStateAction<number>>;
}

function CustomSlider({ setSum }: CustomSliderProps) {
  const [value, setValue] = useState<number>(0);
  const previousValue = usePrevious(value);

  useEffect(() => {
    const diff = value - (previousValue ? previousValue : 0);

    setSum((prev) => {
      return prev + diff;
    });
  }, [value]);

  return (
    <Slider
      my={10}
      onChangeEnd={setValue}
      marks={[
        { value: 20, label: "20%" },
        { value: 50, label: "50%" },
        { value: 80, label: "80%" },
      ]}
    />
  );
}

export default function Home() {
  const [sliderCount, setSliderCount] = useState<number | "">(0);
  const [sliderSum, setSliderSum] = useState<number>(0);

  const sliders = useMemo<number[]>(
    () => Array.from({ length: +sliderCount }, (_, i) => i + 1),
    [sliderCount]
  );

  return (
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
            <Text>
              Průměřný výsledek: {(sliderSum / +sliderCount).toFixed(2)}%
            </Text>
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
          value={sliderCount}
          onChange={setSliderCount}
        />
      </Center>

      <Divider my={20} />

      <Stack spacing="xl">
        {sliders.map((slider) => (
          <CustomSlider key={`slider-${slider}`} setSum={setSliderSum} />
        ))}
      </Stack>
    </AppShell>
  );
}
