import React from "react";

const ToggleSwitch = ({ label, isEnabled, onToggle, containerClass = "" }) => {
  /**
   * Handles toggle click
   */
  const handleToggleClick = () => {
    onToggle(!isEnabled);
  };

  return (
    <div
      onClick={handleToggleClick}
      className={`bg-white h-[50px] w-[198px] flex items-center justify-between py-3 px-4 gap-2 
        border-[0.5px] border-steel-blue rounded-lg cursor-pointer select-none ${containerClass}`}
      role="switch"
      aria-checked={isEnabled}
      tabIndex={0}
    >
      {/* Label */}
      {label && (
        <span className={`font-medium ${isEnabled ? "text-success" : ""}`}>
          {label}
        </span>
      )}

      {/* Switch track */}
      <div
        className={`w-7 h-4 rounded-full flex items-center px-0.5 transition-all duration-500 ${
          isEnabled ? "bg-success" : "bg-gray"
        }`}
      >
        {/* Switch thumb */}
        <div
          className={`bg-white w-3 h-3 rounded-full transition-transform duration-300 ${
            isEnabled ? "translate-x-3" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
