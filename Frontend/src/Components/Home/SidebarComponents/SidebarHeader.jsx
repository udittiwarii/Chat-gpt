import React from "react";
import { SiOpenai } from "react-icons/si";
import { TbLayoutSidebar } from "react-icons/tb";

const SidebarHeader = ({ isExpanded, hovered, showHoverIcon, setHovered, toggleExpand }) => (
  <div className="relative flex items-center justify-center md:justify-between h-16 border-b border-[#343541] px-3">
    <div
      className="relative cursor-pointer flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SiOpenai
        className={`text-xl text-white transition-opacity duration-200 ${
          showHoverIcon && !isExpanded ? "opacity-0" : "opacity-100"
        }`}
      />
      {!isExpanded && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
            showHoverIcon ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleExpand}
        >
          <div className="p-2   ">
            <TbLayoutSidebar className="text-gray-200 text-xl" />
          </div>
        </div>
      )}
    </div>

    {isExpanded && (
      <button
        className="hidden md:block text-gray-400 hover:text-white"
        onClick={toggleExpand}
      >
        <TbLayoutSidebar className="text-xl" />
      </button>
    )}
  </div>
);

export default SidebarHeader;
