"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  const pathname = usePathname();
  const activeLinkStyle =
    "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded dark:text-white";
  const linkStyle =
    "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white";

  return (
    <nav>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Welcome to the App</span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
            <li>
              <Link href="/" className={pathname === "/" ? activeLinkStyle : linkStyle} aria-current="page">
                Home
              </Link>
            </li>
            <li>
              <Link href="/controlled-form" className={pathname === "/controlled-form" ? activeLinkStyle : linkStyle}>
                Controlled Form
              </Link>
            </li>
            <li>
              <Link href="/uncontrolled-form" className={pathname === "/uncontrolled-form" ? activeLinkStyle : linkStyle}>
                UnControlled Form
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
