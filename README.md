# 🧪 Liquid Metal Lab 💧

An experimental UI playground featuring WebGL fragment shader-powered React components. Experience fluid, dynamic, and organic interactions directly on standard user interface elements.

Built using **Vite + React + TypeScript + Tailwind CSS v4**, this library showcases how to blend high-fidelity GLSL shaders with modern web applications to create a premium, tactile feel.

---

## 🌟 Key Features

- **Dynamic WebGL Shaders**: Embedded shaders reacting in real-time to user events.
- **Organic Interactions**: Multi-ripple click propagation, hover speed acceleration, and 3D tilting perspective cards.
- **Component Suite**: Includes buttons, cards, text inputs, sliders, and toggle switches.
- **Theming & Color Spaces**: Switch seamlessly between **Silver**, **Gold**, and **Rose** liquid presets.
- **Tailwind v4 Integration**: Harnesses the new styling architecture of Tailwind CSS v4.

---

## 🚀 Getting Started

Follow these steps to run the interactive playground locally.

### Prerequisites

Make sure you have Node.js installed (v18+ recommended) and a package manager (npm, pnpm, or yarn).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/liquid-metal-lab.git
   cd liquid-metal-lab
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Open the address output by Vite (typically `http://localhost:5173`) to view the interactive lab.

---

## 📦 Component Library

Here's a breakdown of the custom liquid components available in the lab. For full implementation details, please see the [Documentation](file:///Users/ajadvanwyk/Documents/AG7/AG7.1/docs/architecture.md).

### 1. Liquid Metal Button 🔘
A shader-filled button that spawns WebGL-based ripple waves on click.
- **Aesthetic**: Metallic fluid look with glowing ripples.
- **Interactions**: Press down triggers localized coordinates mapping; hover speeds up ripples; click emits canvas expansion waves.
- **Props**: See [docs/components/liquid-metal-button.md](file:///Users/ajadvanwyk/Documents/AG7/AG7.1/docs/components/liquid-metal-button.md)

### 2. Liquid Metal Card 🎴
A cards container that tilts in 3D space based on the mouse hover position.
- **Aesthetic**: Fluid metallic border with glowing backdrop-filter blur.
- **Interactions**: Tilts dynamically relative to center; WebGL border uniforms change dynamically based on preset.
- **Props**: See [docs/components/liquid-metal-card.md](file:///Users/ajadvanwyk/Documents/AG7/AG7.1/docs/components/liquid-metal-card.md)

### 3. Liquid Metal Input 📝
A text field with a liquid-border border animation.
- **Aesthetic**: Glowing border lines that ripple when active.
- **Interactions**: Focus speeds up the ripple; error state turns the uniform red and increases distortion.
- **Props**: See [docs/components/liquid-metal-input.md](file:///Users/ajadvanwyk/Documents/AG7/AG7.1/docs/components/liquid-metal-input.md)

### 4. Liquid Metal Slider 🎚️
A smooth range slider with liquid thumb animations.
- **Aesthetic**: The drag thumb is a circular WebGL viewport containing active metallic fluid.
- **Interactions**: Grabbing the thumb distorts the fluid structure; moving shifts red/blue uniforms.
- **Props**: See [docs/components/liquid-metal-slider.md](file:///Users/ajadvanwyk/Documents/AG7/AG7.1/docs/components/liquid-metal-slider.md)

### 5. Liquid Metal Switch 🔌
A toggle switch that flows when toggled.
- **Aesthetic**: Fluid toggle switch with metallic glow.
- **Interactions**: Activating/deactivating triggers a high-speed surge animation before stabilizing.
- **Props**: See [docs/components/liquid-metal-switch.md](file:///Users/ajadvanwyk/Documents/AG7/AG7.1/docs/components/liquid-metal-switch.md)

---

## 📂 Project Structure

```
.
├── src/
│   ├── components/
│   │   └── ui/                     # Liquid Metal components
│   │       ├── demo.tsx            # Main laboratory showcase dashboard
│   │       ├── liquid-metal-button.tsx
│   │       ├── liquid-metal-card.tsx
│   │       ├── liquid-metal-input.tsx
│   │       ├── liquid-metal-slider.tsx
│   │       └── liquid-metal-switch.tsx
│   ├── lib/
│   │   └── utils.ts                # Class merging utility
│   ├── App.tsx                     # Renders the demo page
│   ├── main.tsx                    # React application entrypoint
│   └── index.css                   # Global styles & Tailwind entry
├── docs/                           # Detailed developer documentation
│   ├── architecture.md             # How the WebGL/React bridge works
│   └── components/                 # Detailed API docs per component
├── vite.config.ts                  # Vite build config
└── package.json                    # Dependencies & scripts
```

---

## 🎨 Shader Customization

The components use custom GLSL shaders compiled via `@paper-design/shaders`. You can customize the look by adjusting the **WebGL Uniforms** passed to the `ShaderMount` instance:

| Uniform Name | Description | Default Range |
| :--- | :--- | :--- |
| `u_repetition` | Density of liquid metal swirls | `2.0 - 10.0` |
| `u_softness` | Blur/sharpness of fluid boundaries | `0.1 - 0.9` |
| `u_shiftRed` | Red color component shift | `0.0 - 1.0` |
| `u_shiftBlue` | Blue color component shift | `0.0 - 1.0` |
| `u_distortion` | WebGL noise level | `0.0 - 0.5` |
| `u_scale` | Noise calculation scale | `1.0 - 20.0` |

Check out the [Architecture Docs](file:///Users/ajadvanwyk/Documents/AG7/AG7.1/docs/architecture.md) to learn how to add custom uniforms or build new shaders!
