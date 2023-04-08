import { create } from "zustand";
import { v4 as uuid } from "uuid";

export interface Slider {
  id: string;
  value: number;
  multiplier: number;
}

interface SliderState {
  count: number;
  sum: number;
  sliders: Slider[];
  addSlider: () => void;
  removeSlider: (id: string) => void;
  updateSliderValue: (id: string, value: number) => void;
  updateSliderMultiplier: (id: string, multiplier: number) => void;
  setSliderCount: (count: number) => void;
  setSliderSum: (sum: number) => void;
  calculateSliderSum: () => void;
}

export const useSliderStore = create<SliderState>()((set, getState) => ({
  count: 0,
  sum: 0,
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
  updateSliderValue: (id, value) => {
    const { calculateSliderSum } = getState();

    set((state) => ({
      ...state,
      sliders: state.sliders.map((slider) => {
        if (slider.id === id) slider.value = value;

        return slider;
      }),
    }));

    return calculateSliderSum();
  },
  updateSliderMultiplier: (id, multiplier) =>
    set((state) => ({
      ...state,
      sliders: state.sliders.map((slider) => {
        if (slider.id === id) slider.multiplier = multiplier;

        return slider;
      }),
    })),
  setSliderCount: (count) => {
    const {
      count: prevSliderCount,
      sliders,
      addSlider,
      calculateSliderSum,
    } = getState();

    const sliderCountDiff = count - prevSliderCount;

    for (let i = 0; i < Math.abs(sliderCountDiff); i++)
      sliderCountDiff > 0 ? addSlider() : sliders.pop();

    set((state) => ({
      ...state,
      count,
    }));

    return calculateSliderSum();
  },
  setSliderSum: (sum) =>
    set((state) => ({
      ...state,
      sum,
    })),
  calculateSliderSum: () => {
    const { sliders } = getState();

    let sum = 0;

    for (const slider of sliders) sum += slider.value;

    return set((state) => ({
      ...state,
      sum,
    }));
  },
}));
