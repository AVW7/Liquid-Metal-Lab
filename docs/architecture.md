# 🏗️ WebGL Architecture & React Bridge

This document details the architectural decisions and implementation patterns used to bridge custom GLSL WebGL fragment shaders with React components in **Liquid Metal Lab**.

---

## 1. The React-to-WebGL Bridge

Direct manipulation of WebGL in React can quickly lead to desynchronization between state and render cycles. To solve this, we use the `ShaderMount` class from `@paper-design/shaders` as a controller that wraps a canvas container.

### Mounting Pattern

Each component utilizes a React container `useRef` to mount the WebGL canvas, and a mutable ref to store the running shader instance.

```tsx
import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { useEffect, useRef } from "react";

export function LiquidMetalComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shaderMount = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current) {
      // 1. Clean up existing WebGL contexts
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
      }

      // 2. Mount new shader context
      shaderMount.current = new ShaderMount(
        containerRef.current,
        liquidMetalFragmentShader,
        {
          u_repetition: 4,
          u_softness: 0.5,
          u_shiftRed: 0.3,
          u_shiftBlue: 0.3,
          u_distortion: 0.1,
          u_contour: 0.1,
          u_angle: 45,
          u_scale: 8,
          u_shape: 1,
        },
        undefined,
        0.5 // animation speed scale
      );
    }

    // 3. Cleanup on unmount to prevent WebGL memory leaks
    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, []); // Only re-mount if initialization parameters change

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
}
```

---

## 2. canvas Overlays & CSS Layouts

WebGL renders to a `<canvas>` element. We inject a container class overlay stylesheet inside a React `useEffect` to ensure correct layout and bounding-box rules:

```css
.shader-container canvas {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  border-radius: inherit !important; /* Matches container shape */
}
```

### Pointer Events Pass-through
To ensure standard HTML elements (such as text input cursor interactions, buttons, and slider drag handlers) remain interactive, the WebGL canvas is styled with `pointer-events-none`. Hover states are intercepted at the wrapper element level and passed into WebGL uniforms.

---

## 3. Dynamic Uniform Updates

WebGL values (Uniforms) like speed, distortion, and color shifts are modified dynamically based on mouse coordinates, focus, or click states.

- **Speed Modulations**: Hovering or focus triggers the `setSpeed()` function:
  ```ts
  shaderMount.current.setSpeed(1.5); // Fast fluid reaction
  ```
- **State Feedback**: Slider drags adjust coordinate translations; buttons record click offsets to start canvas ripple animations.

---

## 4. Performance Guidelines

Because WebGL contexts are limited by the browser and GPU memory, follow these guidelines to keep the app lightweight and high-performance:

1. **Context Cleanup**: Always return a cleanup function in `useEffect` that calls `shaderMount.destroy()`. Failing to do so will result in `Webgl: Context lost` warnings or crashing browser tabs.
2. **Re-mount Minimization**: Only re-instantiate `ShaderMount` if the fragment shader source code changes. For simple uniform tweaks (e.g. changing glow preset), update uniforms directly (if supported by your wrapper) or rebuild specifically without full page re-renders.
3. **Targeted Viewports**: Keep WebGL canvases as small as possible. Use them for borders, buttons, and small highlights rather than full-viewport high-resolution overlays.
