'use client'
import React from 'react';
import { Input } from '@nextui-org/react';

const ContactNumberInput = ({ value = '', onChange, errors }) => {
//   const handleKeyPress = (e) => {
//     // Allow only digits (0-9) and backspace (8)
//     if (!/^[0-9\b]+$/.test(e.key)) {
//       e.preventDefault();
//     }
//   };

  const handleDigitClick = (digit) => {
    if (value.length < 10) {
      onChange(value + digit);
    }
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1)); // Remove the last character
  };

  return (
    <div className="flex flex-col gap-2 items-center">
           <div className="flex justify-between w-full mt-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
        //   onKeyPress={handleKeyPress}
          placeholder="Contact Number..."
          type="tel"
          maxLength={10}
          className={`w-full ${errors.phone ? 'border-red-500' : ''}`}
        />
      </div>
      <div className="grid grid-cols-3 gap-2 w-full">
        {[...Array(9)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleDigitClick(index + 1)}
            className="text-center text-sm border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handleDigitClick(0)}
          className="text-center text-sm border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          0
        </button>
        <button
          type="button"
          onClick={handleBackspace}
          className="text-center text-sm border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          &#8592; {/* Left arrow for backspace */}
        </button>
      </div>
   
    </div>
  );
};

export default ContactNumberInput;
