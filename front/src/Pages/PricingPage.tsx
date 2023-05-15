import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import NavBar from '../Components/Nav/NavB';
import { useState } from 'react'
import LoginPopup from '../Components/login/popUpLog';
import MenuSlider from '../Components/Nav/MenuSlider';

type PriceCardProps = {
  title: string;
  price: string;
  features: string[];
};

const PriceCard = ({ title, price, features }:PriceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg  overflow-hidden select-none">
      <div className=" flex flex-col justify-between h-[300px] px-6 py-4">
        <div>
          <h3 className="text-2xl font-medium text-gray-900 mb-2">{title}</h3>
          <div className=" text-3xl font-bold text-gray-900 mb-4">{price}</div>
          <ul className="mb-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-center">
                <HiCheck className="text-green-500 mr-2" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.90 }}
          className="w-full bg-blue text-wht hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Select Plan
        </motion.button>
      </div>
    </div>
  );
};

const PricingPage = () => {
  const [oppenPopup, setOppenPopup] = useState(false)
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
    <div className=' flex flex-col h-screen'>

      {
          oppenPopup && <div onClick={()=>setOppenPopup(false)}
          className=" absolute w-full h-screen 
          flex justify-center items-center bg-[#25252550]">
              <LoginPopup setOppenPopup={setOppenPopup}/>
          </div>
      }
      <NavBar setOppenPopup={setOppenPopup}/>
      <MenuSlider/>
      <div className="flex flex-col items-center justify-center  bg-gray-100">
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8 mt-10 select-none">Pricing</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {packages.map(({ title, price, features }) => (
            <PriceCard key={title} title={title} price={price} features={features} />
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default PricingPage;


