"use client";

import { useAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { pageOverlayActiveAtom } from "@/atoms/page-overlay";

export const PageOverlay = () => {
  const [isActive, setActive] = useAtom(pageOverlayActiveAtom);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-20"
          style={{ backdropFilter: "blur(2px)" }}
          onClick={() => setActive(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        />
      )}
    </AnimatePresence>
  );
};
