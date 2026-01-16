// oxlint-disable-next-line eslint(no-unassigned-import)
import "./globals.css";

import { Suspense, cache, use } from "react";
import type { PropsWithChildren, ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Analytics } from '@vercel/analytics/next';

import { Geist as googleFont, Geist_Mono as googleMonoFont } from "next/font/google";
import { headers } from "next/headers";
import { clsx } from "clsx";

const font = googleFont({
  subsets: ["latin"],
});

const monoFont = googleMonoFont({
  subsets: ["latin"],
  variable: "--font-mono",
});

const viewport: Viewport = {
  initialScale: 1,
  themeColor: "#ffffff",
  width: "device-width",
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>): ReactNode => (
  <html lang="en">
    <head>
    </head>
    <body className={clsx(font.className, monoFont.variable, "bg-background antialiased")}>
      <Suspense>
        {children}
      </Suspense>
    </body>
  </html>
);

export { viewport };
export default RootLayout;
