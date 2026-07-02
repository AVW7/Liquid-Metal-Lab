import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LiquidMetalInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  helperText?: string;
  error?: boolean;
  onChange?: (value: string) => void;
}

export function LiquidMetalInput({
  label,
  helperText,
  error,
  onChange,
  disabled,
  className,
  onFocus,
  onBlur,
  ...props
}: LiquidMetalInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState((props.defaultValue || props.value || "") as string);
  const shaderRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: External library without types
  const shaderMount = useRef<any>(null);

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value as string);
    }
  }, [props.value]);

  useEffect(() => {
    const styleId = "shader-input-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-input-container canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 8px !important;
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
              u_repetition: 4,
              u_softness: 0.5,
              u_shiftRed: error ? 0.7 : 0.3, // Redder if error
              u_shiftBlue: error ? 0.1 : 0.3,
              u_distortion: 0.05,
              u_contour: 0.05,
              u_angle: 45,
              u_scale: 8,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.4, // Default speed
          );
        }
      } catch (error) {
        console.error("Failed to load shader for LiquidMetalInput:", error);
      }
    };

    initShader();

    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, [error]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(1.2); // Speed up flow on focus
    }
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(0.4); // Slow down flow when inactive
    }
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    onChange?.(val);

    // Ripple effect: temporarily increase speed on keypress
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.2);
      setTimeout(() => {
        if (shaderMount.current) {
          shaderMount.current.setSpeed(isFocused ? 1.2 : 0.4);
        }
      }, 200);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <label className="text-xs font-semibold text-neutral-400 tracking-wider uppercase select-none">
          {label}
        </label>
      )}
      
      <div
        className={cn(
          "relative rounded-lg p-[1px] transition-all duration-300 overflow-hidden",
          disabled && "opacity-50"
        )}
        style={{
          boxShadow: isFocused
            ? "0 4px 20px -5px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)"
            : "none",
        }}
      >
        {/* Liquid Metal Shader Border Layer */}
        <div
          ref={shaderRef}
          className="shader-input-container absolute inset-0 rounded-lg pointer-events-none"
          style={{
            opacity: isFocused ? 0.9 : 0.25,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Input Wrapper - Masks the shader behind to form a 1px border */}
        <div className="relative rounded-lg bg-neutral-950">
          <input
            {...props}
            value={value}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "w-full px-3.5 py-2.5 text-sm bg-neutral-950/80 backdrop-blur-xl border border-transparent rounded-lg text-neutral-100 placeholder-neutral-600 focus:outline-none transition-all duration-300",
              disabled && "cursor-not-allowed"
            )}
          />
        </div>
      </div>

      {helperText && (
        <span
          className={cn(
            "text-xs leading-normal select-none",
            error ? "text-red-400" : "text-neutral-500"
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}
