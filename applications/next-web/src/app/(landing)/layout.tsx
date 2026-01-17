import type { FC, PropsWithChildren } from "react";

const LandingLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="max-w-md mx-auto px-2">
      {children}
    </main>
  )
}

export default LandingLayout;
