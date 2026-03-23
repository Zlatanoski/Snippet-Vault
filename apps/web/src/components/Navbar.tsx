import { useState } from "react";
import { Code2, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface NavLink {
  label: string;
  hasDropdown?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Product", hasDropdown: true },
  { label: "Docs", hasDropdown: true },
  { label: "About", hasDropdown: true },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
            <Code2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            Snippet Vault
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ label, hasDropdown }) => (
            <Button
              key={label}
              variant="ghost"
              size="sm"
              className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              {label}
              {hasDropdown && <ChevronDown className="ml-0.5 h-3.5 w-3.5 opacity-50" />}
            </Button>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            size="sm"
            className="border border-blue-200 bg-blue-300 text-blue-600 hover:bg-blue-50"
          >
            Sponsor
          </Button>
          <Button
            size="sm"
            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            variant="ghost"
          >
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72">
            <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>

            <nav className="mt-6 flex flex-col gap-1">
              {NAV_LINKS.map(({ label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="sm"
                  className="justify-start text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  {label}
                </Button>
              ))}
            </nav>

            <Separator className="my-4" />

       '
            <div className="flex flex-col gap-2">
              <Button className="w-full border border-blue-200 bg-white text-blue-600 hover:bg-blue-50">
                Sign In
              </Button>
              <Button className="w-full bg-blue-300 text-white hover:bg-blue-700">
                Get Started
              </Button>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </nav>
  );
}