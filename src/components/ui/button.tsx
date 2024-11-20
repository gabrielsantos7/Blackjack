import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import "../Button.css"; 

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={`button ${className}`} // Usa a classe .button do seu CSS
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
