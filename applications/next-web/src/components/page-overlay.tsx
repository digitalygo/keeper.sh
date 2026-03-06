"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { pageOverlayActiveAtom } from "@/atoms/page-overlay";

export const PageOverlay = () => {
  const [isActive, setActive] = useAtom(pageOverlayActiveAtom);
  const pathname = usePathname();

  useEffect(() => {
    setActive(false);
  }, [pathname, setActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <m.div
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
