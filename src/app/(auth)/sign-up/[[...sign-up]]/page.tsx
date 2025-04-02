"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme, systemTheme } = useTheme();

  return (
    <SignUp
      appearance={{
        baseTheme:
          (theme === "system" && systemTheme === "dark") || theme === "dark"
            ? dark
            : undefined
      }}
    />
  );
}
