import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import './VolumeSlider.scss';

interface VolumeSliderProps {
  onVolumeChange: (normalized: number) => void;
}

export default function VolumeSlider({ onVolumeChange }: VolumeSliderProps) {
  const [value, setValue] = useState<number>(0);

  const handleChange = (val: number[]) => {
    const normalized = val[0] / 100;
    setValue(val[0]);
    onVolumeChange(normalized);
  };

  return (
    <div className="volume-slider-container">
      <Slider.Root
        className="slider-root"
        defaultValue={[0]}
        max={100}
        step={1}
        onValueChange={handleChange}
      >
        <Slider.Track className="slider-track">
          <Slider.Range className="slider-range" />
        </Slider.Track>
        <Slider.Thumb className="slider-thumb" />
      </Slider.Root>
      <p className="currentVolume">{value}%</p>
    </div>
  );
}
