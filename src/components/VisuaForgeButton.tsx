import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // Import the base shadcn Button

const visuaForgeButtonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-vf-blue text-primary-foreground hover:bg-vf-purple/90 animate-glow",
        outline: "border border-vf-blue bg-transparent text-vf-blue hover:bg-vf-blue hover:text-primary-foreground animate-glow",
        secondary: "bg-vf-purple text-primary-foreground hover:bg-vf-blue/90 animate-glow",
        ghost: "hover:bg-vf-gray hover:text-vf-blue",
        link: "text-vf-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface VisuaForgeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof visuaForgeButtonVariants> {
  asChild?: boolean;
}

const VisuaForgeButton = React.forwardRef<HTMLButtonElement, VisuaForgeButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : Button; // Use shadcn Button as base
    return (
      <Comp
        className={cn(visuaForgeButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
VisuaForgeButton.displayName = "VisuaForgeButton";

export { VisuaForgeButton, visuaForgeButtonVariants };