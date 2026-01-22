import type { FC, PropsWithChildren } from "react";
import { Header } from "@/compositions/header/header";

const LandingLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  )
}

export default LandingLayout;
