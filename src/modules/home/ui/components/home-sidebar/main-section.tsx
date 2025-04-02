"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "#/components/ui/sidebar";
import { useAuth } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const items = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon
  },
  {
    title: "Subscriptions",
    url: "/feed/subscriptions",
    icon: PlaySquareIcon,
    auth: true
  },
  {
    title: "Trending",
    url: "/feed/trending",
    icon: FlameIcon
  }
];

export const MainSection = () => {
  const clerk = useClerk();
  const { isSignedIn } = useAuth();

  const { resolvedTheme } = useTheme();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                className="cursor-pointer"
                isActive={false} // TODO: change to look at current pathname
                onClick={(e) => {
                  if (!isSignedIn && item.auth) {
                    e.stopPropagation();
                    e.preventDefault();
                    return clerk.openSignIn({
                      fallbackRedirectUrl: item.url,
                      appearance: {
                        baseTheme: resolvedTheme === "dark" ? dark : undefined
                      }
                    });
                  }
                }}
              >
                <Link
                  href={item.url}
                  className="flex items-center gap-4"
                  onClick={(e) => {
                    if (!isSignedIn && item.auth) {
                      e.stopPropagation();
                      e.preventDefault();
                      return clerk.openSignIn({
                        fallbackRedirectUrl: item.url,
                        appearance: {
                          baseTheme: resolvedTheme === "dark" ? dark : undefined
                        }
                      });
                    }
                  }}
                >
                  <div>
                    <item.icon className="size-4" />
                  </div>
                  <p className="text-sm">{item.title}</p>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
