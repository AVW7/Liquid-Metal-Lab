# LiquidMetalSlider 🎚️

The `LiquidMetalSlider` component is a range controller featuring an interactive sliding thumb built inside a WebGL liquid metal viewport.

---

## Interactive Features

1. **Active Grab Deformation**: Grabbing and dragging the slider thumb increases the shader speed and expands WebGL noise parameters.
2. **Tactile Range**: The track fill expands matching thumb position, with numeric indicator updates mapping value parameters in real-time.
3. **Smooth Calculations**: Custom mouse coordinate conversions map native mouse movement percentages accurately to configured `min`/`max` limits.

---

## API Reference

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `undefined` | Header description displayed above the slider. |
| `min` | `number` | `0` | Minimum value parameter. |
| `max` | `number` | `100` | Maximum value parameter. |
| `step` | `number` | `1` | Increment value granularity. |
| `value` | `number` | `undefined` | Controlled value state. |
| `defaultValue` | `number` | `50` | Uncontrolled default initial value. |
| `onChange` | `(value: number) => void` | `undefined` | Callback triggered during active range adjustment. |
| `disabled` | `boolean` | `false` | Disables user dragging interactions. |

---

## Code Example

```tsx
import React, { useState } from "react";
import { LiquidMetalSlider } from "@/components/ui/liquid-metal-slider";

export default function AudioController() {
  const [volume, setVolume] = useState(75);

  return (
    <div className="w-full max-w-md p-6 bg-neutral-950 rounded-xl space-y-2">
      <LiquidMetalSlider
        label="Output Gain"
        min={0}
        max={100}
        step={5}
        value={volume}
        onChange={setVolume}
      />
      <p className="text-xs text-neutral-500 text-right font-mono">
        Active Gain: {volume}dB
      </p>
    </div>
  );
}
```

---

## WebGL Thumb Details

The slider thumb contains a canvas running these specific WebGL presets:
- **Repetition**: `5` (higher swirl density)
- **Scale**: `10`
- **Softness**: `0.45`
- **Mouse Drag Action**: Increases fluid speed dynamically on mouse down.
- **Cleanup**: Handled via local container boundaries ensuring smooth performance on page destruction.
