"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const NAV_LINKS = [
  {
    name: "Profile",
    url: "/protected/dashboard/profile",
  },
  {
    name: "Professional details",
    url: "/protected/dashboard/professional-details",
  },
  {
    name: "Tasks & Teams",
    url: "/protected/dashboard/tasksAndTeams",
  },
  {
    name: "Settings",
    url: "/protected/dashboard/settings",
  },
];

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  // This function is used by the links to close the menu on navigation
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    // This nav is shown only on mobile (block) and hidden from 'md' up (md:hidden)
    // Added a border for better separation in both modes.
    <div className="md:hidden p-4  border-gray-200 dark:border-neutral-800">
      {/* Hamburger Menu Icon Button */}
      <button
        onClick={toggleMenu}
        aria-label="Open navigation menu"
      >
        {/* Icon color now adapts to the theme */}
        <Menu className="w-5 h-5 text-black dark:text-white" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        // The overlay background now switches for dark mode.
        <div className="fixed inset-0 bg-white dark:bg-black z-50 p-4">
          {/* Close Button (X icon) */}
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleMenu}
              aria-label="Close navigation menu"
            >
              {/* Icon color now adapts to the theme */}
              <X className="w-6 h-6 text-black dark:text-white" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathName === link.url;

              return (
                <Link
                  href={link.url}
                  key={link.name}
                  onClick={handleLinkClick}
                  className={`
                  p-3 rounded-md text-center text-lg font-medium transition-colors
                  ${
                    isActive
                      ? // Active state: high contrast for both modes
                        "bg-black text-white dark:bg-white dark:text-black"
                      : // Inactive state: subtle colors with hover effect for both modes
                        "bg-gray-100 text-black hover:bg-gray-200 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                  }
                `}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
