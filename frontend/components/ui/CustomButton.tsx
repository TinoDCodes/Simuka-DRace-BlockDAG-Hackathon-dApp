"use client";
import { extendVariants, Button } from "@heroui/react";

export const CustomButton = extendVariants(Button, {
  variants: {
    color: {
      clear:
        "bg-[#282C34] text-white font-medium font-mono border border-[white]/5 hover:bg-[#23272E] hover:text-white/60 hover:border-[white]/2",
      primary:
        "bg-primary text-[#14161A] font-medium font-mono shadow shadow-primary/80 hover:bg-priimiary/10 hover:text-[#14161A]",
      outlined:
        "bg-transparent text-primary font-medium font-mono border border-primary hover:bg-transparent hover:text-primary/50 hover:border-primary/50",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
