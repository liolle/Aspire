import React from 'react';
import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import NavBar from '../Components/Nav/NavBar';

type PriceCardProps = {
  title: string;
  price: string;
  features: string[];
};

const PriceCard: React.FC<PriceCardProps> = ({ title, price, features }:PriceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4">
        <h3 className="text-2xl font-medium text-gray-900 mb-2">{title}</h3>
        <div className="text-6xl font-bold text-gray-900 mb-4">{price}</div>
        <ul className="mb-8">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <HiCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Select Plan
        </motion.button>
      </div>
    </div>
  );
};

const PricingPage: React.FC = () => {
  const packages = [
    {
      title: 'Basic',
      price: '$50/mo',
      features: ['3 Models', '1 Photoshoot', '10% Off future services'],
    },
    {
      title: 'Standard',
      price: '$100/mo',
      features: ['5 Models', '2 Photoshoots', '15% Off future services'],
    },
    {
      title: 'Premium',
      price: '$150/mo',
      features: ['10 Models', '5 Photoshoots', '20% Off future services'],
    },
    {
      title: 'Custom',
      price: 'Contact Us',
      features: ['Custom packages based on your needs'],
    },
  ];

  return (
    <>
    <div className=''> <NavBar/></div>

      
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <h1 className="text-9xl font-bold text-gray-900 mb-8 mt-10">Pricing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {packages.map(({ title, price, features }) => (
          <PriceCard key={title} title={title} price={price} features={features} />
        ))}
      </div>
    </div>
    </>
  );
};

export default PricingPage;


