'use client';
import { Button } from "./ui/button"
import { cn } from "../lib/utils"
import { motion } from "framer-motion"

export function AnimatedButton({
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return (
    (<motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block">
      <Button
        className={cn("shadow-lg", className)}
        variant={variant}
        size={size}
        {...props}>
        {children}
      </Button>
    </motion.div>)
  );
}