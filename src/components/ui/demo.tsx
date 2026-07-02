import { useState } from "react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { LiquidMetalCard } from "@/components/ui/liquid-metal-card";
import { LiquidMetalSwitch } from "@/components/ui/liquid-metal-switch";
import { LiquidMetalInput } from "@/components/ui/liquid-metal-input";
import { LiquidMetalSlider } from "@/components/ui/liquid-metal-slider";
import { Sparkles, Sliders, Activity, Compass, Cpu, Palette } from "lucide-react";

export default function LiquidMetalButtonDemo() {
  // Connected state for the dashboard
  const [inputText, setInputText] = useState("Dynamic Card Title");
  const [sliderVal, setSliderVal] = useState(60);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [cardColor, setCardColor] = useState<"silver" | "gold" | "rose">("silver");

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 flex flex-col gap-10">
      {/* Header section */}
      <header className="flex flex-col gap-2 border-b border-neutral-900 pb-6 text-center md:text-left md:flex-row md:justify-between md:items-end">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-neutral-400 animate-pulse" />
            <span className="text-xs font-bold text-neutral-500 tracking-widest uppercase">
              Experimental UI
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl flex items-center justify-center md:justify-start gap-3">
            <Activity className="text-neutral-400 h-8 w-8" />
            Liquid Metal Lab
          </h1>
          <p className="text-neutral-500 text-sm max-w-md mt-1">
            An interactive playground demonstrating custom WebGL shader-based interface components. Hover, click, and drag to see fluid reactions.
          </p>
        </div>
        <div className="flex gap-2 justify-center mt-4 md:mt-0">
          <button
            onClick={() => setCardColor("silver")}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              cardColor === "silver"
                ? "bg-neutral-800 text-white border-neutral-700 shadow-md"
                : "bg-neutral-950 text-neutral-400 border-neutral-900 hover:text-white"
            }`}
          >
            Silver
          </button>
          <button
            onClick={() => setCardColor("gold")}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              cardColor === "gold"
                ? "bg-neutral-800/80 text-yellow-200 border-yellow-800/40 shadow-[0_0_10px_rgba(234,179,8,0.1)]"
                : "bg-neutral-950 text-neutral-400 border-neutral-900 hover:text-white"
            }`}
          >
            Gold
          </button>
          <button
            onClick={() => setCardColor("rose")}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              cardColor === "rose"
                ? "bg-neutral-800/80 text-rose-200 border-rose-800/40 shadow-[0_0_10px_rgba(244,63,94,0.1)]"
                : "bg-neutral-950 text-neutral-400 border-neutral-900 hover:text-white"
            }`}
          >
            Rose
          </button>
        </div>
      </header>

      {/* Main interactive showcase */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Side: Live Preview Panel (3D Card) */}
        <div className="col-span-1 md:col-span-7 flex flex-col gap-6">
          <h2 className="text-xs font-bold text-neutral-500 tracking-wider uppercase flex items-center gap-1.5">
            <Compass className="h-4 w-4" /> Live Render Preview
          </h2>

          <LiquidMetalCard
            title={inputText || "Unnamed Node"}
            description="Hover over this card to interact with the 3D tilt perspective. The border color adapts dynamically using WebGL uniforms."
            glowColor={cardColor}
            className="min-h-[220px]"
          >
            <div className="flex flex-col gap-4 mt-6 pt-4 border-t border-neutral-900/60">
              <div className="flex justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <Palette className="h-3.5 w-3.5" /> Fluid Preset
                </span>
                <span className="capitalize font-mono text-neutral-300">
                  {cardColor} Shader
                </span>
              </div>
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Signal Resonance</span>
                <span className="font-mono text-neutral-300">{sliderVal}%</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Console Interceptor</span>
                <span className="font-mono text-neutral-300">
                  {switchChecked ? "ONLINE" : "OFFLINE"}
                </span>
              </div>

              {/* A subtle glowing bar driven by the slider */}
              <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden border border-neutral-900 mt-2">
                <div
                  className="h-full bg-neutral-400 transition-all duration-300"
                  style={{
                    width: `${sliderVal}%`,
                    opacity: switchChecked ? 0.8 : 0.2,
                  }}
                />
              </div>
            </div>
          </LiquidMetalCard>
        </div>

        {/* Right Side: Command Deck (Controls Panel) */}
        <div className="col-span-1 md:col-span-5 flex flex-col gap-6">
          <h2 className="text-xs font-bold text-neutral-500 tracking-wider uppercase flex items-center gap-1.5">
            <Sliders className="h-4 w-4" /> Controller Modules
          </h2>

          <div className="rounded-2xl border border-neutral-900 bg-neutral-950 p-6 flex flex-col gap-6">
            {/* Input Module */}
            <div className="flex flex-col gap-2">
              <LiquidMetalInput
                label="Node Name (Input)"
                placeholder="Enter card title..."
                value={inputText}
                onChange={setInputText}
                helperText="Fades in flowing liquid-metal borders on focus, and ripples on typing."
              />
            </div>

            {/* Slider Module */}
            <div className="flex flex-col gap-2 pt-2 border-t border-neutral-900/60">
              <LiquidMetalSlider
                label="Resonance Frequency"
                min={0}
                max={100}
                value={sliderVal}
                onChange={setSliderVal}
              />
              <p className="text-xs text-neutral-500 mt-1 leading-normal">
                Adjusts the slider. The slider thumb scales and flows actively on drag.
              </p>
            </div>

            {/* Switch Module */}
            <div className="flex flex-col gap-2 pt-4 border-t border-neutral-900/60">
              <LiquidMetalSwitch
                label="Link System Power"
                checked={switchChecked}
                onChange={setSwitchChecked}
              />
              <p className="text-xs text-neutral-500 mt-1 leading-normal">
                Toggles system status. The toggle knob features a high-gloss liquid droplet shader.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional UI Component Examples Grid */}
      <section className="flex flex-col gap-6 mt-6">
        <h2 className="text-xs font-bold text-neutral-500 tracking-wider uppercase flex items-center gap-1.5">
          <Cpu className="h-4 w-4" /> Full Component Palette Catalog
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Buttons Variant */}
          <div className="rounded-2xl border border-neutral-900 bg-neutral-950 p-6 flex flex-col justify-between min-h-[200px]">
            <div>
              <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-neutral-400" /> Buttons
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                WebGL shader-powered button controls. Includes textual labeling and minimal icon mode.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <LiquidMetalButton
                label={switchChecked ? "Action" : "Standby"}
                onClick={() => console.log("Button clicked")}
              />
              <LiquidMetalButton viewMode="icon" onClick={() => console.log("Icon clicked")} />
            </div>
          </div>

          {/* Card 2: Preset Cards */}
          <LiquidMetalCard
            title="Gold Preset Variant"
            description="A premium variation utilizing warmth uniforms to simulate molten gold."
            glowColor="gold"
            className="min-h-[200px]"
            interactive={true}
          >
            <div className="text-xs text-yellow-500/80 font-mono mt-4">
              Preset: u_repetition = 3
            </div>
          </LiquidMetalCard>

          {/* Card 3: Rose Preset */}
          <LiquidMetalCard
            title="Rose Gold Variant"
            description="A delicate metallic layout matching copper/rose profiles."
            glowColor="rose"
            className="min-h-[200px]"
            interactive={true}
          >
            <div className="text-xs text-rose-500/80 font-mono mt-4">
              Preset: u_angle = 60
            </div>
          </LiquidMetalCard>
        </div>
      </section>
    </div>
  );
}
