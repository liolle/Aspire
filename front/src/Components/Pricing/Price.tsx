import React from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
}

export const PricingCard: React.FC<PricingCardProps> = ({ title, price, features }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">{price}</p>
        <ul className="mt-4 space-y-1">
          {features.map((feature) => (
            <li key={feature} className="flex items-center text-gray-600">
              <svg
                className="h-4 w-4 fill-current text-green-500 mr-2"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0L3.586 9.414a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 1.414l-7 7z"
                  clipRule="evenodd"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <button className="block w-full bg-gray-900 text-white font-bold py-2 px-4 rounded mt-6">
          Sign up
        </button>
      </div>
    </div>
  );
};

