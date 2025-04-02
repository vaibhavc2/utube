import Image from "next/image";
import Link from "next/link";
import { SidebarTrigger } from "#/components/ui/sidebar";
import { ThemeToggle } from "#/components/ui/theme-toggle";
import { SearchInput } from "./search-input";
import { AuthButton } from "#/modules/auth/ui/components/auth-button";

export const HomeNavbar = () => {
  return (
    // TODO: add bg colors according to the theme: dark and light(not-dark)
    <nav className="bg-background dark:bg-background fixed top-0 right-0 left-0 z-50 flex h-16 items-center px-2 pr-5">
      <div className="flex w-full items-center gap-4">
        {/* Menu & Logo */}
        <div className="flex flex-shrink-0 items-center">
          <SidebarTrigger />
          <Link href={"/"}>
            <div className="flex items-center gap-2 p-4">
              <Image src={"/logo.svg"} alt="Logo" width={32} height={32} />
              <p className="text-xl font-semibold tracking-tight">uTube</p>
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mx-auto flex max-w-[720px] flex-1 justify-center">
          <SearchInput />
        </div>

        {/* Right Side */}
        <div className="flex flex-shrink-0 items-center gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Auth Button */}
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
