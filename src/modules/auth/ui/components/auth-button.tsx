"use client";

import { Button } from "#/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export function AuthButton() {
  const { theme, systemTheme } = useTheme();

  return (
    <>
      {/* TODO: add menu items for Studio and User profile */}
      <SignedIn>
        <UserButton
          appearance={{
            baseTheme:
              (theme === "system" && systemTheme === "dark") || theme === "dark"
                ? dark
                : undefined
          }}
        />
      </SignedIn>

      <SignedOut>
        <SignInButton
          mode="modal"
          appearance={{
            baseTheme:
              (theme === "system" && systemTheme === "dark") || theme === "dark"
                ? dark
                : undefined
          }}
        >
          <Button
            variant="outline"
            className="cursor-pointer rounded-full border-blue-500/20 px-4 text-sm font-medium text-blue-600 shadow-none hover:text-blue-500 [&_svg]:size-6"
          >
            <UserCircleIcon className="size-4 pl-2" />
            <p className="pr-2 pb-0.5 align-middle">Sign In</p>
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
