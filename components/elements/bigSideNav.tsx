"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { Languages, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { NAVLIST } from "@/constants/application";

export default function BigSideNav() {
  const pathname = usePathname();
  const { theme, systemTheme } = useTheme();

  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <header className="absolute left-0 top-4 z-10 items-center">
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="__button_pressed absolute left-0 top-20 z-50 hidden h-9 w-4 rounded-none rounded-r-md bg-background pl-0 shadow-md sm:block"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="border-none shadow-lg sm:max-w-xs"
          >
            <nav className="grid gap-4 text-lg font-medium">
              <Link href="/">
                {isDark ? (
                  <Image
                    src="/logos/CGSP_dark.png"
                    alt="logo"
                    width={240}
                    height={52}
                  />
                ) : (
                  <Image
                    src="/logos/CGSP_light.png"
                    alt="logo"
                    width={240}
                    height={52}
                  />
                )}

                <span className="sr-only">China Global South Project</span>
              </Link>

              {NAVLIST.map((item) => (
                <Link key={item.name} href={item.link}>
                  <SheetClose
                    className={`__button_pressed flex w-full items-center gap-4 rounded-lg p-2 px-2.5 hover:text-foreground ${
                      pathname === item.path
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    } `}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </SheetClose>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function TranslationToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="__muted">
          <Languages className="h-5 w-5" strokeWidth={1.5} />
          <span className="sr-only">Translation</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuLabel>Translations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>English</DropdownMenuItem>
        <DropdownMenuItem>French</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
