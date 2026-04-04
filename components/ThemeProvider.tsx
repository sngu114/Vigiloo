"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import HackerBackground from "./HackerBackground";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <HackerBackground />
      {children}
    </NextThemesProvider>
  );
}