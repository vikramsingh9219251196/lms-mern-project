import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const element = document.querySelector("html");
    element.classList.remove("light", "dark");
    if (darkMode) {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
     <nav className="sticky top-0 z-50 md:h-[72px] h-[65px] md:px-[35px] px-[15px] bg-[#ffffffd0] dark:bg-[#21242bc5] shadow-custom backdrop-blur-md flex items-center">
    {/* Heading in the Center */}
    <div className="flex-1 flex justify-center">
  <h1 className="text-8xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 brightness-125 hover:scale-110 transition-transform duration-300">
    BRIDGE - ED
  </h1>
</div>

    {/* Dark Mode Button */}
    <div className="flex-none">
      <button className="p-5 rounded-full text-lg font-semibold">
        {darkMode ? (
          <FaSun size={26} className="text-white" onClick={toggleDarkMode} />
        ) : (
          <FaMoon
            size={26}
            className="text-gray-900"
            onClick={toggleDarkMode}
          />
        )}
      </button>
    </div>
  </nav>
  );
}
