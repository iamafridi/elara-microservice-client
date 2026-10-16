"use client";

import React from "react";
import Link from "next/link";

interface ElaraLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  inverted?: boolean;
  className?: string;
  href?: string;
}

export default function ElaraLogo({
  size = "md",
  showTagline = true,
  inverted = false,
  className = "",
  href = "/",
}: ElaraLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  const taglineSizes = {
    sm: "text-[8px]",
    md: "text-[9px]",
    lg: "text-xs",
  };

  const content = (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Dynamic SVG Vector Mark */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-emerald-700 to-teal-900 p-1.5 shadow-md shadow-primary/20 transition-transform duration-300 group-hover:scale-105 border border-white/20 shrink-0`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Bengali Lotus Petal / Stylized E Curves */}
          <path
            d="M8 9C8 7.89543 8.89543 7 10 7H30C31.1046 7 32 7.89543 32 9V12C32 13.1046 31.1046 14 30 14H15V17H26C27.1046 17 28 17.8954 28 19V21C28 22.1046 27.1046 23 26 23H15V26H30C31.1046 26 32 26.8954 32 28V31C32 32.1046 31.1046 33 30 33H10C8.89543 33 8 32.1046 8 31V9Z"
            fill="white"
          />
          {/* Subtle Amber Leaf Accent */}
          <circle cx="28" cy="19.5" r="3" fill="#F59E0B" />
          <path
            d="M12 11L12 29"
            stroke="#A7F3D0"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-sans font-black tracking-tight ${textSizes[size]} ${
              inverted ? "text-white" : "text-ink"
            }`}
          >
            Elara
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        {showTagline && (
          <span
            className={`font-mono font-bold tracking-widest uppercase mt-0.5 ${taglineSizes[size]} ${
              inverted ? "text-emerald-400" : "text-primary"
            }`}
          >
            Bangladesh Super App
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Elara Bangladesh Home">
        {content}
      </Link>
    );
  }

  return content;
}
