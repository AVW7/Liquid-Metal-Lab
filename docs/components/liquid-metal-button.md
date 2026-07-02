# LiquidMetalButton 🔘

The `LiquidMetalButton` component displays a high-fidelity WebGL fluid background that responds dynamically to user pointer movements and clicks.

---

## Interactive Features

1. **WebGL Ripples**: Clicking the button triggers a local coordinate mapping. High-velocity expansion waves ripple outward from the cursor's exact coordinate.
2. **Hover Response**: When hovered, the underlying shader's animation speed transitions to a higher coefficient (`1.2`), making the metal look more active.
3. **Press Effect**: Pressing down shrinks the container slightly and intensifies the shader.

---

## API Reference

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `"Get Started"` | Button text content (used in `"text"` mode). |
| `viewMode` | `"text" \| "icon"` | `"text"` | Layout shape. `"text"` is rectangular, `"icon"` is a circular button enclosing a Sparkle icon. |
| `onClick` | `() => void` | `undefined` | Callback function triggered upon button release. |

---

## Code Example

```tsx
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export default function ActionSection() {
  const handleLaunch = () => {
    console.log("System Initialized!");
  };

  return (
    <div className="flex gap-4 p-8 bg-neutral-950 rounded-xl">
      {/* Rectangular text button */}
      <LiquidMetalButton 
        label="Initialize Core" 
        onClick={handleLaunch} 
        viewMode="text" 
      />

      {/* Circular icon button */}
      <LiquidMetalButton 
        onClick={handleLaunch} 
        viewMode="icon" 
      />
    </div>
  );
}
```

---

## Uniform Parameters

The internal shader initialization passes these WebGL variables:

- **Angle**: `45.0`
- **Scale**: `8.0`
- **Repetition**: `4.0`
- **Softness**: `0.5`
- **Red Shift / Blue Shift**: `0.3 / 0.3` (metallic silver sheen)
