"use client";

import type { FC, PropsWithChildren } from "react";

import { useSyncHoverSetter } from "../contexts/sync-hover-context";
import { Button } from "@keeper.sh/ui";

const SyncCalendarsButton: FC<PropsWithChildren> = ({ children }) => {
  const setIsSyncHovered = useSyncHoverSetter();

  return (
    <Button
      href="/playground/register"
      variant="primary"
      onMouseEnter={() => setIsSyncHovered(true)}
      onMouseLeave={() => setIsSyncHovered(false)}
    >
      {children}
    </Button>
  );
};

export { SyncCalendarsButton };
