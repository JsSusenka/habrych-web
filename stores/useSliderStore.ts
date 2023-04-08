import { create } from "zustand";
import { v4 as uuid } from "uuid";

export interface Slider {
  id: string;
  value: number;
  multiplier: number;
}

interface SliderState {
  count: number;
  sliders: Slider[];
  addSlider: () => void;
  removeSlider: (id: string) => void;
  updateSliderValue: (id: string, value: number) => void;
  updateSliderMultiplier: (id: string, multiplier: number) => void;
}

export const useSliderStore = create<SliderState>()((set, getState) => ({
  count: 0,
  sliders: [],
  addSlider: () =>
    set((state) => ({
      ...state,
      sliders: [...state.sliders, { id: uuid(), value: 0, multiplier: 1 }],
    })),
  removeSlider: (id) =>
    set((state) => ({
      ...state,
      sliders: state.sliders.filter((filter) => filter.id !== id),
    })),
  updateSliderValue: (id, value) =>
    set((state) => ({
      ...state,
      sliders: state.sliders.map((slider) => {
        if (slider.id === id) slider.value = value;

        return slider;
      }),
    })),
  updateSliderMultiplier: (id, multiplier) =>
    set((state) => ({
      ...state,
      sliders: state.sliders.map((slider) => {
        if (slider.id === id) slider.multiplier = multiplier;

        return slider;
      }),
    })),
}));
