"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme, systemTheme } = useTheme();

  return (
    <SignIn
      appearance={{
        baseTheme:
          (theme === "system" && systemTheme === "dark") || theme === "dark"
            ? dark
            : undefined
      }}
    />
  );
}
