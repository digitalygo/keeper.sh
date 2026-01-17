// oxlint-disable-next-line eslint(no-unassigned-import)
import "./globals.css";

import type { FC, PropsWithChildren } from "react";
import { Geist as SansSerifFont, Geist_Mono as MonospaceFont } from "next/font/google";
import { cn } from "@/utils/cn";

const sansSerifFont = SansSerifFont({
  variable: "--font-sans",
})

const monospaceFont = MonospaceFont({
  variable: "--font-mono",
})

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html className="bg-background">
      <body className={cn(sansSerifFont.className, monospaceFont.variable, "antialiased")}>
        {children}
      </body>
    </html>
  )
};

export default Layout;
