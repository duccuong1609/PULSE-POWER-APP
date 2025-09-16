import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import type React from "react";
import { animationConfig } from "@/config/animation-config";

type StartButtonProps = {
  saved: boolean;
  toggleSaved: () => void;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
};

const AnimationButton = ({
  saved,
  afterIcon = <IconStar />,
  beforeIcon = <IconStarFilled />,
  toggleSaved,
}: StartButtonProps) => {
  return (
    <>
      <Button
        onClick={toggleSaved}
        variant={saved ? "selected" : "outline"}
        className="cursor-pointer transition-all duration-200 absolute top-4 right-4"
      >
        <motion.span
          key={saved ? "filled" : "outline"}
          variants={animationConfig.rotateAndFade}
          initial="initial"
          animate="animate"
          className="inline-block"
        >
          {saved ? beforeIcon : afterIcon}
        </motion.span>
      </Button>
    </>
  );
};

export default AnimationButton;
