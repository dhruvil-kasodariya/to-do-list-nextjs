"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b shadow-sm  w-full z-50">
      <div className="container max-w-full px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-semibold">My To-Do List</div>

        {/* Hamburger button for mobile */}
        <button
          className="text-gray-600 md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link href="/" className={cn("text-gray-600 hover:text-black")}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about-us"
              className={cn("text-gray-600 hover:text-black")}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={cn("text-gray-600 hover:text-black")}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className={cn("text-gray-600 hover:text-black")}
            >
              Profile
            </Link>
          </li>
        </ul>

        {/* Mobile Menu - Sliding from the right */}
        <div
          className={cn(
            "lg:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="px-4 py-3 flex justify-between items-center border-b">
            <span className="text-xl font-semibold">Menu</span>
            <button
              className="text-gray-600 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <ul className="p-4 space-y-4">
            <li>
              <Link
                href="/"
                className={cn("text-gray-600 hover:text-black")}
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className={cn("text-gray-600 hover:text-black")}
                onClick={toggleMenu}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={cn("text-gray-600 hover:text-black")}
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className={cn("text-gray-600 hover:text-black")}
                onClick={toggleMenu}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
