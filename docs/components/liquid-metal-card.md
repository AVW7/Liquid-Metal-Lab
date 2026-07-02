# LiquidMetalCard 🎴

The `LiquidMetalCard` component is a spatial interface container featuring a fluid metallic WebGL border glow and dynamic 3D tilt perspective matching mouse orientation.

---

## Interactive Features

1. **3D Tilt Perspective**: Moves on the X and Y axes relative to the cursor position on hover, returning smoothly to center on mouse leave.
2. **Glow Presets**: Uses distinct shader uniforms to render three color variants:
   - **Silver**: A clean, technical chrome styling.
   - **Gold**: Warm, rich metallic yellow reflections.
   - **Rose**: Elegant pink/red hues mimicking copper or rose gold.

---

## API Reference

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `undefined` | Header title text. |
| `description` | `string` | `undefined` | Supporting subtitle text. |
| `glowColor` | `"silver" \| "gold" \| "rose"` | `"silver"` | Color scheme for the fluid WebGL border uniforms. |
| `interactive` | `boolean` | `true` | Enables or disables the 3D tilt tilt perspective. |
| `className` | `string` | `undefined` | Custom Tailwind classes to extend the main container. |

---

## Code Example

```tsx
import { LiquidMetalCard } from "@/components/ui/liquid-metal-card";

export default function DashboardCard() {
  return (
    <LiquidMetalCard
      title="Advanced Signal Monitor"
      description="Real-time WebGL metrics and system telemetry."
      glowColor="gold"
      className="w-full max-w-sm"
    >
      {/* Children elements render inside the card body */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-xs text-neutral-400">
          <span>Signal Quality</span>
          <span className="font-mono text-yellow-400">98.4%</span>
        </div>
        <div className="h-1 bg-neutral-900 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-500 w-[98.4%]" />
        </div>
      </div>
    </LiquidMetalCard>
  );
}
```

---

## WebGL Color Map Uniforms

The shader uses specific coordinates shifts and channels to alter color temperatures:

| Preset | `u_shiftRed` | `u_shiftBlue` | `u_distortion` | `u_scale` |
| :--- | :---: | :---: | :---: | :---: |
| **Silver** | `0.3` | `0.3` | `0.0` | `8.0` |
| **Gold** | `0.6` | `0.1` | `0.1` | `6.0` |
| **Rose** | `0.5` | `0.4` | `0.05` | `7.0` |
