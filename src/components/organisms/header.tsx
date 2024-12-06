import Link from "next/link";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "../ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Cowriter
          </h4>
        </Link>
        <div className="flex px-6 gap-6">
          <Link
            href="/image_grid"
            className={cn(
              "flex items-center text-sm font-medium text-muted-foreground"
              // item.disabled && "cursor-not-allowed opacity-80"
            )}
          >
            <p>Image Grid</p>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
