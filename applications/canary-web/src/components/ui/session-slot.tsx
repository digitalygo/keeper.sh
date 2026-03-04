import type { PropsWithChildren, ReactNode } from "react";
import { tv } from "tailwind-variants";
import { useSession } from "../../hooks/use-session";
import { FadeIn } from "./fade-in";

interface SessionSlotProps {
  authenticated: ReactNode;
  unauthenticated: ReactNode;
}

const slotLayer = tv({
  base: "col-start-1 row-start-1 flex items-center justify-end gap-2",
  variants: {
    visible: {
      true: "visible",
      false: "invisible",
    },
  },
});

const slotContainer = tv({
  base: "",
  variants: {
    resolved: {
      true: "visible",
      false: "invisible",
    },
  },
});

function SlotLayer({ visible, children }: PropsWithChildren<{ visible: boolean }>) {
  return (
    <div className={slotLayer({ visible })}>
      {children}
    </div>
  );
}

export function SessionSlot({ authenticated, unauthenticated }: SessionSlotProps) {
  const { user, isLoading } = useSession();
  const resolved = !isLoading;

  return (
    <FadeIn direction="from-top" className={slotContainer({ resolved })}>
      <div className="grid grid-cols-[1fr] grid-rows-[1fr]">
        <SlotLayer visible={resolved && !!user}>{authenticated}</SlotLayer>
        <SlotLayer visible={resolved && !user}>{unauthenticated}</SlotLayer>
      </div>
    </FadeIn>
  );
}
