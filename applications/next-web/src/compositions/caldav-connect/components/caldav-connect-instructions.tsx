import type { FC, PropsWithChildren } from "react";

export const CalDAVConnectInstructions: FC<PropsWithChildren> = ({ children }) => {
  if (!children) return null;

  return (
    <div className="text-sm text-foreground-muted space-y-2 px-2 py-4">
      {children}
    </div>
  );
};
