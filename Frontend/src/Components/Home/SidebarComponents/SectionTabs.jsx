import React from "react";

const SectionTabs = ({ activeSection, setActiveSection }) => (
  <div className="flex mt-4 mb-2 px-3 gap-2">
    {["chats", "archive"].map((section) => (
      <button
        key={section}
        onClick={() => setActiveSection(section)}
        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors duration-200
          ${
            activeSection === section
              ? "bg-[#343541] text-[#ececf1]"
              : "text-[#8e8ea0] hover:text-[#acacbe]"
          }`}
      >
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </button>
    ))}
  </div>
);

export default SectionTabs;
