import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LiquidMetalSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export function LiquidMetalSwitch({
  checked = false,
  onChange,
  disabled = false,
  className,
  label,
}: LiquidMetalSwitchProps) {
  const [internalChecked, setInternalChecked] = useState(checked);
  const shaderRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: External library without types
  const shaderMount = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    setInternalChecked(checked);
  }, [checked]);

  useEffect(() => {
    const styleId = "shader-switch-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-switch-container canvas {
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
              u_repetition: 6,
              u_softness: 0.45,
              u_shiftRed: 0.35,
              u_shiftBlue: 0.25,
              u_distortion: 0.1,
              u_contour: 0.1,
              u_angle: 45,
              u_scale: 12,
              u_shape: 1,
              u_offsetX: 0.15,
              u_offsetY: -0.15,
            },
            undefined,
            0.6, // Default speed
          );
        }
      } catch (error) {
        console.error("Failed to load shader for LiquidMetalSwitch:", error);
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

  const handleToggle = () => {
    if (disabled) return;
    const nextState = !internalChecked;
    setInternalChecked(nextState);
    onChange?.(nextState);

    // Dynamic feedback on toggle: boost shader speed temporarily to simulate ripple
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.5);
      setTimeout(() => {
        if (shaderMount.current) {
          shaderMount.current.setSpeed(isHovered ? 1.0 : 0.6);
        }
      }, 400);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(1.0);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(0.6);
    }
  };

  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      {label && (
        <span
          className={cn(
            "text-sm font-medium transition-colors duration-200 cursor-pointer",
            disabled ? "text-neutral-600" : "text-neutral-300 hover:text-neutral-100"
          )}
          onClick={handleToggle}
        >
          {label}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={internalChecked}
        disabled={disabled}
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => !disabled && setIsPressed(true)}
        onMouseUp={() => !disabled && setIsPressed(false)}
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          disabled ? "opacity-50 cursor-not-allowed" : "opacity-100",
          internalChecked
            ? "bg-neutral-900 border border-neutral-700/60 shadow-[0_0_12px_rgba(255,255,255,0.05)]"
            : "bg-neutral-950 border border-neutral-800 shadow-inner"
        )}
        style={{
          boxShadow: internalChecked
            ? "inset 0 1px 3px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.05)"
            : "inset 0 2px 4px rgba(0,0,0,0.9)",
        }}
      >
        {/* The Track Inner Light (gives a glowing background slot) */}
        <span
          className={cn(
            "absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none",
            internalChecked
              ? "bg-gradient-to-r from-neutral-800/20 to-neutral-700/30 opacity-100"
              : "opacity-0"
          )}
        />

        {/* The Liquid Metal Slide Knob */}
        <span
          className={cn(
            "pointer-events-none relative block h-5 w-5 rounded-full bg-neutral-900 border border-neutral-950 shadow-md transition-all duration-300 ease-out",
            isPressed ? "scale-90" : "scale-100"
          )}
          style={{
            transform: `translateX(${internalChecked ? "22px" : "3px"})`,
            boxShadow: isHovered
              ? "0 4px 10px rgba(0,0,0,0.4), 0 1px 2px rgba(255,255,255,0.1)"
              : "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {/* Shader layer inside the knob */}
          <span
            ref={shaderRef}
            className="shader-switch-container absolute inset-0 rounded-full overflow-hidden"
            style={{
              opacity: disabled ? 0.4 : 1,
            }}
          />

          {/* Glare Reflection overlay on the knob for 3D metallic feel */}
          <span className="absolute inset-[1px] rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
        </span>
      </button>
    </div>
  );
}
