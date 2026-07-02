import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LiquidMetalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  glowColor?: "silver" | "gold" | "rose";
  interactive?: boolean;
}

export function LiquidMetalCard({
  title,
  description,
  children,
  className,
  glowColor = "silver",
  interactive = true,
  ...props
}: LiquidMetalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shaderRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: External library without types
  const shaderMount = useRef<any>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Set up uniforms depending on the glow color
  const uniforms = React.useMemo(() => {
    switch (glowColor) {
      case "gold":
        return {
          u_repetition: 3,
          u_softness: 0.4,
          u_shiftRed: 0.6,
          u_shiftBlue: 0.1,
          u_distortion: 0.1,
          u_contour: 0.1,
          u_angle: 30,
          u_scale: 6,
          u_shape: 1,
          u_offsetX: 0.2,
          u_offsetY: -0.2,
        };
      case "rose":
        return {
          u_repetition: 4,
          u_softness: 0.45,
          u_shiftRed: 0.5,
          u_shiftBlue: 0.4,
          u_distortion: 0.05,
          u_contour: 0.05,
          u_angle: 60,
          u_scale: 7,
          u_shape: 1,
          u_offsetX: 0.05,
          u_offsetY: -0.05,
        };
      case "silver":
      default:
        return {
          u_repetition: 4,
          u_softness: 0.5,
          u_shiftRed: 0.3,
          u_shiftBlue: 0.3,
          u_distortion: 0,
          u_contour: 0,
          u_angle: 45,
          u_scale: 8,
          u_shape: 1,
          u_offsetX: 0.1,
          u_offsetY: -0.1,
        };
    }
  }, [glowColor]);

  useEffect(() => {
    const styleId = "shader-card-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-card-container canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 16px !important;
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
            uniforms,
            undefined,
            0.4, // speed
          );
        }
      } catch (error) {
        console.error("Failed to load shader for LiquidMetalCard:", error);
      }
    };

    initShader();

    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, [uniforms]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation angle (max 8 degrees)
    const rX = -(mouseY / (height / 2)) * 8;
    const rY = (mouseX / (width / 2)) * 8;

    setRotate({ x: rX, y: rY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(0.9);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(0.4);
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative rounded-2xl p-[1px] transition-all duration-300 ease-out",
        interactive && "cursor-pointer"
      )}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        transform: isHovered && interactive
          ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.02)`
          : "rotateX(0deg) rotateY(0deg) scale(1)",
        boxShadow: isHovered
          ? "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px 5px rgba(255, 255, 255, 0.03)"
          : "0 10px 30px -15px rgba(0, 0, 0, 0.5)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Liquid Metal Shader Border & Subtle Background Glow */}
      <div
        ref={shaderRef}
        className="shader-card-container absolute inset-0 -z-10 rounded-2xl overflow-hidden pointer-events-none"
        style={{
          opacity: isHovered ? 0.95 : 0.65,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Card Body - Semitranslucent Glassmorphism */}
      <div
        className={cn(
          "w-full h-full rounded-2xl bg-neutral-950/85 backdrop-blur-xl p-6 flex flex-col justify-between border border-white/5",
          "transition-colors duration-300",
          isHovered && "bg-neutral-950/75 border-white/10",
          className
        )}
        style={{
          transform: "translateZ(10px)",
        }}
      >
        <div>
          {title && (
            <h3 className="text-lg font-semibold text-neutral-100 mb-1 tracking-tight">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-neutral-400 font-normal leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {children && <div className="mt-4 text-neutral-300">{children}</div>}
      </div>
    </div>
  );
}
