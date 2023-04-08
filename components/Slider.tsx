import { Slider as SliderBase } from "@mantine/core";
import { useSliderStore } from "stores/useSliderStore";

interface SliderProps {
  id: string;
}

//TODO: slider multipliers

export function Slider({}: SliderProps) {
  return (
    <SliderBase
      my={10}
      onChangeEnd={(value) => console.log(value)}
      marks={[
        { value: 20, label: "20%" },
        { value: 50, label: "50%" },
        { value: 80, label: "80%" },
      ]}
    />
  );
}
