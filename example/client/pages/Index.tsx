import { useState } from "react";
import { ToppingsModal } from "../components/ToppingsModal";

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const handleAddToppings = (toppings: string[]) => {
    setSelectedToppings(toppings);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Pizza Toppings Selector
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8 px-4">
          Build your perfect pizza with our interactive toppings selection interface
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center h-12 px-6 text-base font-bold text-white bg-[#714CE0] rounded-full hover:bg-[#5d3ec4] transition-colors mb-8 w-full sm:w-auto"
        >
          Add Toppings
        </button>

        {selectedToppings.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm mx-4 sm:mx-0">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Selected Toppings:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedToppings.map((topping, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#714CE0] text-white"
                >
                  {topping}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <ToppingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToppings={handleAddToppings}
      />
    </div>
  );
}
