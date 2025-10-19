import React from "react";
import { ThemeSwitcher } from "./theme-switcher";

function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center border-b border-b-foreground/10 h-16 px-4">
      <h1 className="font-semibold">Oppressed Watch Portal</h1>
      <ThemeSwitcher />
    </nav>
  );
}

export default Navbar;
