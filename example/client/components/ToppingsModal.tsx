import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToppingOption {
  id: string;
  name: string;
  checked: boolean;
}

interface ToppingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToppings: (selectedToppings: string[]) => void;
}

export function ToppingsModal({ isOpen, onClose, onAddToppings }: ToppingsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [toppings, setToppings] = useState<ToppingOption[]>([
    { id: 'pepperoni', name: 'Pepperoni', checked: true },
    { id: 'mushrooms', name: 'Mushrooms', checked: false },
    { id: 'sausage', name: 'Sausage', checked: false },
    { id: 'onions', name: 'Onions', checked: false },
    { id: 'option', name: 'Option', checked: false },
  ]);

  const filteredToppings = toppings.filter(topping =>
    topping.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTopping = (id: string) => {
    setToppings(prev =>
      prev.map(topping =>
        topping.id === id ? { ...topping, checked: !topping.checked } : topping
      )
    );
  };

  const handleAddToppings = () => {
    const selectedToppings = toppings.filter(t => t.checked).map(t => t.name);
    onAddToppings(selectedToppings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-[521px] min-w-[320px] bg-white rounded-3xl border border-[#EFEFEF] shadow-[0_0_10px_-2px_rgba(0,0,0,0.15)] flex flex-col max-h-[90vh] sm:max-h-[80vh]">
        {/* Header */}
        <div className="flex flex-col p-3 sm:p-4 border-b border-[#EFEFEF] bg-white rounded-t-3xl">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-[#121214] leading-[26px] truncate pr-2">
              Add toppings
            </h2>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center flex-shrink-0 hover:bg-gray-100 rounded transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-black" />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <div className="flex items-center gap-1 h-10 px-2 border border-[#EFEFEF] rounded-lg bg-white">
              <Search className="w-4 h-4 text-[#434349] ml-1 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for your fav topping"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 h-8 px-2 text-sm font-medium text-[#121214] placeholder-[#878791] bg-white border-0 outline-none min-w-0"
              />
            </div>
          </div>
        </div>

        {/* Body - Toppings List */}
        <div className="flex-1 p-3 sm:px-4 bg-white max-h-[200px] sm:max-h-[300px] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {filteredToppings.map((topping) => (
              <div
                key={topping.id}
                className="flex items-center gap-2 min-h-[38px] cursor-pointer hover:bg-gray-50 rounded-lg px-1 py-1 transition-colors"
                onClick={() => toggleTopping(topping.id)}
              >
                {/* Custom Checkbox */}
                <div className="relative">
                  <div className={cn(
                    "w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center",
                    topping.checked 
                      ? "bg-[#714CE0] border-[#714CE0]" 
                      : "bg-white border-[#A2A2A9]"
                  )}>
                    {topping.checked && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-white">
                        <path 
                          d="M8.23128 0.359036C8.58475 -0.0649861 9.21622 -0.122046 9.64045 0.231106C10.0646 0.584676 10.1219 1.21604 9.76838 1.64029L4.76838 7.64029C4.59158 7.8524 4.34574 7.97359 4.09065 7.99673C4.02679 8.00252 3.96228 8.00224 3.89827 7.99575C3.70662 7.97635 3.5182 7.90071 3.3592 7.76822L0.359205 5.26822C-0.0646151 4.91457 -0.122149 4.28315 0.231275 3.85904C0.584747 3.43501 1.21622 3.37795 1.64045 3.73111L3.87092 5.59048L8.23128 0.359036Z" 
                          fill="white"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                
                <span className="flex-1 text-sm font-bold text-[#121214] leading-6">
                  {topping.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 p-3 sm:p-4 border-t border-[#EFEFEF] bg-white rounded-b-3xl">
          <button
            onClick={onClose}
            className="h-10 px-4 sm:px-3 text-base font-bold text-[#121214] bg-white border border-[#A689FA] rounded-full hover:bg-gray-50 transition-colors order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToppings}
            className="h-10 px-4 sm:px-3 text-base font-bold text-white bg-[#714CE0] rounded-full hover:bg-[#5d3ec4] transition-colors order-1 sm:order-2"
          >
            Add toppings
          </button>
        </div>
      </div>
    </div>
  );
}
