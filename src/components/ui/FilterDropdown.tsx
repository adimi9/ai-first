import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
    title: string;
    options: string[];
    selectedValue: string;
    onSelect: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ title, options, selectedValue, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option: string) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-64 bg-gray-800 border border-gray-700 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <span className="truncate">{title}: <strong>{selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)}</strong></span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-188' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                    {options.map((option) => (
                        <a
                            key={option}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleSelect(option);
                            }}
                            className={`block px-4 py-2 text-sm ${selectedValue === option ? 'text-white bg-blue-600' : 'text-gray-300 hover:bg-gray-700'}`}
                        >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;