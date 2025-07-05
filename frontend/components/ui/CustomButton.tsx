"use client";
import { extendVariants, Button } from "@heroui/react";

export const CustomButton = extendVariants(Button, {
  variants: {
    color: {
      clear:
        "bg-[#282C34] text-white font-medium font-mono border border-[white]/5 hover:bg-[#23272E] hover:text-[#14161A] hover:border-[white]/2",
      primary:
        "bg-[#10B77F] text-[#14161A] font-medium font-mono shadow shadow-[#10B77F40] hover:bg-[#0D9668] hover:text-[#14161A]",
      outlined:
        "bg-[#23272E] text-[#10B77F] font-medium font-mono border border-[#10B77F4D] hover:bg-transparent hover:text-[#10B77F]/80 hover:border-[#10B77F99]",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
