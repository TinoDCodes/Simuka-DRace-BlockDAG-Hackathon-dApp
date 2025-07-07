"use client";
import { extendVariants, Button } from "@heroui/react";

export const CustomButton = extendVariants(Button, {
  variants: {
    color: {
      clear:
        "bg-[#282C34] text-white font-medium font-mono border border-[white]/5 hover:bg-[#23272E] hover:text-white/60 hover:border-[white]/2 hover:scale-95 transition-all",
      primary:
        "bg-primary text-[#14161A] font-medium font-mono shadow shadow-primary/80 hover:bg-primary/60 hover:text-[#14161A] hover:scale-95",
      outlined:
        "bg-transparent text-primary font-medium font-mono border border-primary hover:bg-transparent hover:text-primary/50 hover:border-primary/50 hover:scale-95 transition-all",
      date: "bg-white/5 text-zinc-400 font-mono hover:bg-tertiary hover:text-white disabled:bg-tertiary disabled:text-white disabled:opacity-75 transition-all",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
