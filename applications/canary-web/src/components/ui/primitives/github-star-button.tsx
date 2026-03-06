import { useState, useEffect } from "react";
import Star from "lucide-react/dist/esm/icons/star";
import { AnimatePresence } from "motion/react";
import { ButtonText, ExternalLinkButton } from "./button";
import { FadeIn } from "./fade-in";

const SCROLL_THRESHOLD = 32;

export function GithubStarButton() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY <= SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <FadeIn direction="from-right">
          <ExternalLinkButton size="compact" variant="ghost" href="https://github.com" target="_blank" rel="noreferrer">
            <Star size={14} />
            <ButtonText>403</ButtonText>
          </ExternalLinkButton>
        </FadeIn>
      )}
    </AnimatePresence>
  );
}
