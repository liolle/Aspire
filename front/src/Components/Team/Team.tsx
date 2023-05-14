import React from "react";
import bilal from "../../Images/bilal.jpg"
import Yves from "../../Images/Yves.jpg"
import Etienne from "../../Images/Etienne.jpg"
import Alex from "../../Images/Alex.jpg"



const Team = () => {

  const backgroundImageStyle0 = {
    backgroundImage: `url("${bilal}")`,
    
  };
  const backgroundImageStyle1 = {
    backgroundImage: `url("${Yves}")`,
    
  };
  const backgroundImageStyle2 = {
    backgroundImage: `url("${Etienne}")`,
    
  };
  const backgroundImageStyle3 = {
    backgroundImage: `url("${Alex}")`,
    
  };
  
  
 
  return (
    <div className="flex flex-wrap justify-center gap-6 ">
      <div className=" h-[30rem] w-[30rem] rounded-xl overflow-hidden shadow-lg">
        <div className="bg-white rounded-lg  ">
          <div className="relative pb-[300px] bg-cover bg-center "style={backgroundImageStyle3}>
            
          </div>
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">Alex</h3>
            <p className="text-gray-700 text-base">
              As a model scout at our agency, Alex has an eye for discovering new
              talent and helping them make it in the industry.
            </p>
          </div>
        </div>
      </div>
      <div className=" flex h-[30rem] w-[30rem] rounded-xl overflow-hidden shadow-lg">
        <div className="  bg-white rounded-lg  ">
          <div className="relative pb-[300px] bg-cover bg-center "style={backgroundImageStyle0}>
           
          </div>
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">Bilal</h3>
            <p className="text-gray-700 text-base">
              As the head of our modeling department, Bilal oversees all aspects
              of our models' careers, from booking gigs to negotiating contracts.
            </p>
          </div>
        </div>
      </div>
      <div className=" flex h-[30rem] w-[30rem] rounded-xl overflow-hidden shadow-lg">
        <div className="bg-white rounded-lg  ">
          <div className="relative pb-[300px] bg-cover bg-center "style={backgroundImageStyle2}>
           
          </div>
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">Etienne</h3>
            <p className="text-gray-700 text-base">
              As a model coach at our agency, Etienne helps our models develop
              their skills and confidence in front of the camera.
            </p>
          </div>
        </div>
      </div>
      <div className=" flex h-[30rem] w-[30rem] rounded-xl overflow-hidden shadow-lg">
        <div className="bg-white rounded-lg  ">
          <div className="relative pb-[300px] bg-cover bg-center "style={backgroundImageStyle1}>
            
          </div>
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">Yves</h3>
            <p className="text-gray-700 text-base">
              As our agency's marketing director, Yves ensures that our models and
              their talents are promoted effectively .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
