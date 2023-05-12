import React from "react";
import { useState } from "react";
import { IconContext } from "react-icons";
import { FaBars, FaTimes } from "react-icons/fa";


type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "About us", href: "#" },
  { label: "Our services", href: "#" },
  { label: "Pricing", href: "../../PricingPage" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
 

  return (
    <IconContext.Provider value={{ className: "inline-block h-6 w-6" }}>
      <nav className=" shadow-lg ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-black text-lg font-bold">TAM</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-black hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
   
    <button
      type="button"
      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Login
    </button>
  </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-black hover:text-red-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                aria-expanded="false"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-black hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </IconContext.Provider>
  );
};

export default Navbar;

