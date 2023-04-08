import { Slider as SliderBase } from "@mantine/core";
import { useSliderStore } from "stores/useSliderStore";

interface SliderProps {
  id: string;
}

//TODO: slider multipliers

export function Slider({ id }: SliderProps) {
  const { updateSliderValue } = useSliderStore();

  return (
    <SliderBase
      my={10}
      onChangeEnd={(value) => updateSliderValue(id, value)}
      marks={[
        { value: 20, label: "20%" },
        { value: 50, label: "50%" },
        { value: 80, label: "80%" },
      ]}
    />
  );
}
