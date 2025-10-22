import React from "react";
import { ThemeSwitcher } from "./theme-switcher";
import MobileNav from "./MobileNav";

function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center border-b border-b-foreground/10  px-4 py-2">
      <h1 className="font-semibold">Oppressed Watch Portal</h1>
      <div className="flex gap-2 items-center">
        <ThemeSwitcher />
        <MobileNav />
      </div>
    </nav>
  );
}

export default Navbar;
