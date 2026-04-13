"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import HackerBackground from "./HackerBackground";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "next-themes";

function ThemeGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    // List of routes that MUST stay in light mode
    const lightOnlyRoutes = ["/", "/signup"];
    
    if (lightOnlyRoutes.includes(pathname)) {
      setTheme("light");
    }
  }, [pathname, setTheme]);

  return <>{children}</>;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ThemeGuard>
        <HackerBackground />
        {children}
      </ThemeGuard>
    </NextThemesProvider>
  );
}