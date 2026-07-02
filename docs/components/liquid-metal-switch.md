# LiquidMetalSwitch 🔌

The `LiquidMetalSwitch` is a custom boolean toggle switch containing a fluid metallic WebGL viewport in the switch thumb, triggering energetic ripple dynamics on toggle.

---

## Interactive Features

1. **Toggle Acceleration Surge**: Activating or deactivating the switch boosts the WebGL animation speed from standard `0.6` to `2.5` temporarily. The speed then decays smoothly back to rest, simulating fluid momentum.
2. **Smooth Slide Transition**: Left/right positioning is governed by CSS class updates mapping layout offsets smoothly using CSS transitions.
3. **Hover Scaling**: Mouse enters scale the circular thumb slightly, expanding the WebGL shader boundary representation.

---

## API Reference

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `undefined` | Supporting label text rendered alongside the toggle. |
| `checked` | `boolean` | `false` | Controlled state representing the active boolean value. |
| `onChange` | `(checked: boolean) => void` | `undefined` | Callback triggered when the switch value changes. |
| `disabled` | `boolean` | `false` | Prevents interactivity and dims layout representation. |

---

## Code Example

```tsx
import React, { useState } from "react";
import { LiquidMetalSwitch } from "@/components/ui/liquid-metal-switch";

export default function SystemToggles() {
  const [active, setActive] = useState(true);

  return (
    <div className="flex flex-col gap-4 p-6 bg-neutral-950 rounded-xl">
      <LiquidMetalSwitch
        label="Enable High-Fidelity Mode"
        checked={active}
        onChange={setActive}
      />
      <p className="text-xs text-neutral-400">
        System is currently: <span className="font-bold">{active ? "ENGAGED" : "BYPASSED"}</span>
      </p>
    </div>
  );
}
```

---

## WebGL Toggle Kinetics

The kinetic feedback uses a decay timer:
```ts
// Boost speed on toggle action
if (shaderMount.current?.setSpeed) {
  shaderMount.current.setSpeed(2.5); // high kinetic energy
  
  // Decays back to normal speed (0.6) over 800ms
  setTimeout(() => {
    shaderMount.current?.setSpeed(0.6);
  }, 800);
}
```
This decay mechanism gives the liquid metal switch a heavy, premium physical presence.
