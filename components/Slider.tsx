import { Grid, NumberInput, Slider as SliderBase } from "@mantine/core";
import { useSliderStore } from "stores/useSliderStore";
import React from "react";

interface SliderProps {
  id: string;
}

//TODO: slider multipliers

export function Slider({ id }: SliderProps) {
  const { updateSliderValue, updateSliderMultiplier } = useSliderStore();

  return (
    <Grid align="center">
      <Grid.Col span={11}>
        <SliderBase
          onChangeEnd={(value) => updateSliderValue(id, value)}
          marks={[
            { value: 20, label: "20%" },
            { value: 50, label: "50%" },
            { value: 80, label: "80%" },
          ]}
        />
      </Grid.Col>
      <Grid.Col span={1}>
        <NumberInput
          defaultValue={1}
          min={1}
          max={100}
          label="Násobič hodnoty"
          onChange={(value) => updateSliderMultiplier(id, +value)}
          withAsterisk
        />
      </Grid.Col>
    </Grid>
  );
}
