"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// ? Whenever you want to create a new route, just add a new object inside the below array.
const SIDE_BAR_LINKS = [
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

function SideBar() {
  const pathName = usePathname();

  return (
    <div className=" w-[250px] h-screen pt-4 border-r px-2 md:flex flex-col gap-4 hidden ">
      {SIDE_BAR_LINKS.map((l) => (
        <Link
          href={l.url}
          key={l.name}
        >
          {/* //! The styles in the below div and p tag are repetitive. When free, make sure to refactor them. tailwind clx is good for it. Read docs */}
          <div
            className={
              pathName === l.url
                ? `bg-black p-2 rounded-sm`
                : "bg-white text-center p-2 rounded-sm"
            }
          >
            <p
              className={
                pathName === l.url
                  ? `text-white  text-center`
                  : "text-black text-center"
              }
            >
              {l.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SideBar;
