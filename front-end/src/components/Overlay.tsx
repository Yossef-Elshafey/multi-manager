import { motion } from "framer-motion";
import { useEffect } from "react";

type OverlayProps = {
  children: React.ReactNode;
};

export const Overlay = ({ children }: OverlayProps) => {
  useEffect(() => {
    const navbar = document.querySelector("nav");
    const main = document.querySelector("main");
    document.body.style.overflow = "hidden";

    if (navbar) {
      navbar.style.pointerEvents = "none";
    }

    if (main) {
      main.style.pointerEvents = "none";
    }

    return () => {
      document.body.style.overflow = "auto";

      if (navbar) {
        navbar.style.pointerEvents = "auto";
      }

      if (main) {
        main.style.pointerEvents = "auto";
      }

    };
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute p-4 bg-stone-600 z-50 w-full rounded-md overlay"
      >
        {children}
      </motion.div>
    </>
  );
};
