import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LiquidMetalSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export function LiquidMetalSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 50,
  onChange,
  disabled = false,
  className,
  label,
}: LiquidMetalSliderProps) {
  const [internalValue, setInternalValue] = useState(
    value !== undefined ? value : defaultValue
  );
  const shaderRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: External library without types
  const shaderMount = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    const styleId = "shader-slider-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-slider-container canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 50% !important;
        }
      `;
      document.head.appendChild(style);
    }

    const initShader = async () => {
      try {
        if (shaderRef.current) {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
          }

          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 5,
              u_softness: 0.45,
              u_shiftRed: 0.3,
              u_shiftBlue: 0.35,
              u_distortion: 0.05,
              u_contour: 0.05,
              u_angle: 45,
              u_scale: 10,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.5, // speed
          );
        }
      } catch (error) {
        console.error("Failed to load shader for LiquidMetalSlider:", error);
      }
    };

    initShader();

    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = Number(e.target.value);
    setInternalValue(nextVal);
    onChange?.(nextVal);

    // Increase shader speed when dragging
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(1.8);
    }
  };

  const handleMouseUp = () => {
    setIsActive(false);
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(isHovered ? 0.9 : 0.5);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(isActive ? 1.8 : 0.9);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isActive && shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(0.5);
    }
  };

  const percentage = ((internalValue - min) / (max - min)) * 100;

  return (
    <div className={cn("flex flex-col gap-2 w-full select-none", className)}>
      {(label || value !== undefined) && (
        <div className="flex justify-between items-center text-xs font-semibold text-neutral-400 tracking-wider uppercase">
          {label && <span>{label}</span>}
          <span>{internalValue}</span>
        </div>
      )}

      <div className="relative h-6 w-full flex items-center">
        {/* Visual Track Slot */}
        <div className="absolute left-0 right-0 h-1.5 rounded-full bg-neutral-950 border border-neutral-900 overflow-hidden shadow-inner">
          {/* Active Progress Fill */}
          <div
            className="h-full bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-full opacity-60"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Visual Liquid Metal Droplet Thumb */}
        <div
          className={cn(
            "absolute -translate-x-1/2 w-5 h-5 rounded-full bg-neutral-900 border border-neutral-950 shadow-lg pointer-events-none transition-transform duration-300 ease-out",
            (isHovered || isActive) && "scale-125"
          )}
          style={{
            left: `${percentage}%`,
            boxShadow: isActive
              ? "0 4px 14px rgba(0,0,0,0.6), 0 0 8px rgba(255,255,255,0.1)"
              : isHovered
                ? "0 3px 8px rgba(0,0,0,0.4), 0 0 4px rgba(255,255,255,0.05)"
                : "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {/* Liquid Metal Shader layer in thumb */}
          <div
            ref={shaderRef}
            className="shader-slider-container absolute inset-0 rounded-full overflow-hidden"
            style={{
              opacity: disabled ? 0.4 : 1,
            }}
          />

          {/* Glare Reflection overlay on the droplet thumb */}
          <div className="absolute inset-[1px] rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
        </div>

        {/* The Native Range Input overlay */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={internalValue}
          disabled={disabled}
          onChange={handleChange}
          onMouseDown={() => !disabled && setIsActive(true)}
          onMouseUp={handleMouseUp}
          onTouchStart={() => !disabled && setIsActive(true)}
          onTouchEnd={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
        />
      </div>
    </div>
  );
}
