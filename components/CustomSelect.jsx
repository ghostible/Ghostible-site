
import { useState } from "react";
import { ChevronDown } from 'lucide-react';
export default function CustomSelect({ options, defaultText }) {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(defaultText || "Select Option");
  const handleSelect = (option) => {
    setSelected(option);
    setActive(false);
  };

  return (
    <div className={`select-menu relative w-full md:w-60 ${active ? "active" : ""}`}>
      <div
        className="select-btn bg-gray-800 text-white py-2 px-4 rounded-md cursor-pointer flex justify-between items-center"
        onClick={() => setActive(!active)}
      >
        <span className="sBtn-text">{selected}</span>
        <span className="arrow"><ChevronDown /></span>
      </div>
      {active && (
        <ul className="options absolute mt-2 w-full bg-gray-900 rounded-md shadow-md z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="option px-4 py-2 cursor-pointer hover:bg-gray-700"
              onClick={() => handleSelect(option)}
            >
              <span className="option-text">{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
