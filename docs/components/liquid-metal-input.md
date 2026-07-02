# LiquidMetalInput 📝

The `LiquidMetalInput` component wraps a standard HTML input field, replacing default borders with a reactive WebGL liquid outline that pulses dynamically.

---

## Interactive Features

1. **Focus Acceleration**: Focus transitions the WebGL animation speed from `0.4` to `1.2`, providing active tactile feedback to typing.
2. **Dynamic Error Rendering**: Passing the `error` prop alters shader uniforms to increase red hues and expand distortion coordinates.
3. **Floating Labels**: The label transitions dynamically into a compact header above the input when content is typed or the field is focused.

---

## API Reference

### Props

*Extends standard HTML input attributes (except for `onChange` which accepts plain strings).*

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `undefined` | Floating input label. |
| `helperText` | `string` | `undefined` | Detail text displayed below the field. |
| `error` | `boolean` | `false` | When true, renders error states and shift shader uniforms to red. |
| `onChange` | `(value: string) => void` | `undefined` | Callback returning the raw input value. |
| `disabled` | `boolean` | `false` | Disables user interaction. |

---

## Code Example

```tsx
import React, { useState } from "react";
import { LiquidMetalInput } from "@/components/ui/liquid-metal-input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleValidation = (val: string) => {
    setEmail(val);
    setError(!val.includes("@"));
  };

  return (
    <div className="w-full max-w-sm p-6 bg-neutral-950 rounded-xl space-y-4">
      <LiquidMetalInput
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={handleValidation}
        error={error}
        helperText={error ? "Please enter a valid email address." : "Required."}
      />
    </div>
  );
}
```

---

## Technical Specifics

When `error={true}` is set:
- `u_shiftRed` switches to `0.7` (intense glowing crimson).
- `u_shiftBlue` shifts to `0.1`.
- Animation flow resets to emphasize the alert state.
