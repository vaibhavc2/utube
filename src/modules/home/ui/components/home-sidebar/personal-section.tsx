"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "#/components/ui/sidebar";
import { useClerk, useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const items = [
  {
    title: "History",
    url: "/playlists/history",
    icon: HistoryIcon,
    auth: true
  },
  {
    title: "Liked Videos",
    url: "/playlists/liked",
    icon: ThumbsUpIcon,
    auth: true
  },
  {
    title: "All Playlists",
    url: "/playlists",
    icon: ListVideoIcon,
    auth: true
  }
];

export const PersonalSection = () => {
  const clerk = useClerk();
  const { isSignedIn } = useAuth();

  const { theme, systemTheme } = useTheme();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>You</SidebarGroupLabel>
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
                        baseTheme:
                          (theme === "system" && systemTheme === "dark") ||
                          theme === "dark"
                            ? dark
                            : undefined
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
                          baseTheme:
                            (theme === "system" && systemTheme === "dark") ||
                            theme === "dark"
                              ? dark
                              : undefined
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
