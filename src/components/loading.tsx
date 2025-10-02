// LoaderOverlay.tsx
import { motion } from "framer-motion";
import { Spinner } from "./ui/shadcn-io/spinner";

interface LoaderOverlayProps {
  show: boolean;
  variant?: "fixed" | "absolute";
  spinnerVariant?: "default" | "pinwheel";
  children?: React.ReactNode;
}

export function Loading({
  show,
  variant = "fixed",
  spinnerVariant = "pinwheel",
  children,
}: LoaderOverlayProps) {
  if (!show) return null;

  const className =
    variant === "fixed"
      ? "fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-xl rounded-md"
      : "absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-background/70 backdrop-blur-xl w-full h-full";

  return (
    <motion.div
      key="loader"
      className={className}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children ? children : <Spinner variant={spinnerVariant} />}
    </motion.div>
  );
}
