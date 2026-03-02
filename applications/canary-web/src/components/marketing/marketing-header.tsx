import { PropsWithChildren } from "react";

export function MarketingHeader({ children }: PropsWithChildren) {
  return (
    <header className="flex justify-between items-center gap-2 py-4">
      {children}
    </header>
  )
}

export function MarketingHeaderBranding({ children }: PropsWithChildren) {
  return (
    <>{children}</>
  )
}

export function MarketingHeaderActions({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center gap-2">
      {children}
    </div>
  )
}
