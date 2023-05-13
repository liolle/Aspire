import React from'react-router-dom'
import NavBar from "../Components/Nav/NavB"
import model11 from '../Images/model11.jpg'

import model8 from '../Images/model8.jpg'
import model10 from '../Images/model10.jpg'
import model7 from '../Images/model7.jpg'
import back from '../Images/back.png'
import model4 from '../Images/model4.jpg'
import Footer from '../Components/Footer/Footer'
import FAQ from '../Components/FAQ/Faq'
import Team from '../Components/Team/Team'
import { useState } from 'react'
import LoginPopup from '../Components/login/popUpLog'



 const ModelPage = () => {
  const [oppenPopup, setOppenPopup] = useState(false)
  
    const backgroundImageStyle1 = {
        backgroundImage: `url("${model11}")`,
      };
      const backgroundImageStyle0 = {
        backgroundImage: `url("${back}")`,
        
      };
      
      const backgroundImageStyle2 = {
        backgroundImage: `url("${model8}")`,
      };
      
      const backgroundImageStyle3 = {
        backgroundImage: `url("${model10}")`,
      };
      
      const backgroundImageStyle4 = {
        backgroundImage: `url("${model7}")`,
      };
      const backgroundImageStyle5 = {
        backgroundImage: `url("${model4}")`,
      };
      
      


    return (
      <div className=' flex flex-col h-screen'>

        {
            oppenPopup && <div onClick={()=>setOppenPopup(false)}
            className=" absolute w-full h-screen 
            flex justify-center items-center">
                <LoginPopup setOppenPopup={setOppenPopup}/>
            </div>
        }
        
        <NavBar setOppenPopup={setOppenPopup}/>
        <div className=' flex-1 bg-cover ' style={backgroundImageStyle0}>

        </div>
        
        {/* <section className="w-full flex gap-4 h-full  mb-0 bg-cover" style={backgroundImageStyle0}>
          <div className="flex-grow-1 w-2/5  ml-16 mt">
           <div className="font-sans font-bold text-center mt-28 text-6xl italic text-slate-950"> <h1> The Aspire Models</h1> </div>
           <div className="font-sans font-bold text-center  mt-12  ml-12 text-5xl italic text-slate-700"> <h2>  Aspire to greatness!</h2></div>

           <div className="font-sans  text-center text-2xl ml-12 mt-16 italic text-white">
            <p>Aspire Models is the modeling agency that inspires ordinary people to pursue their dream of becoming a model. We provide tools and resources to help beginners achieve their goals and become role models in the industry.</p>
            </div>
         
            <button className='w-52 h-14 border-2 mt-20 border-2 rounded-full border-slate ms-12 ms-72 bg-fuchsia-500 text-xl text-slate'>Try it now </button>
               
          
          </div>
       
        
       </section>


       <section className="w-full flex gap-4 h-full   bg-gray-100 ">
          <div className="flex-grow-1   ml-16 mt">

          <section className="w-full h-2/4 flex gap-2  mt-28 ml-12 justify-center ms-2 ">
                <div className=" w-32 border-2 border-gray-300 shadow-lg bg-cover bg-center rounded-3xl transition duration-300 ease-in-out transform hover:scale-x-150 hover:origin-left hover:w-48 hover:z-50 flex  items-end text-black text-4xl 
 "style={backgroundImageStyle1} > <span className='rotate-90 mb-12 ms-10 font-bold '>Inspire</span></div>
                <div className=" w-32 border-2 border-gray-300 shadow-lg bg-cover bg-center  rounded-3xl transition duration-300 ease-in-out transform hover:scale-x-150 hover:origin-left hover:w-48  hover:z-50 flex  items-end text-black text-4xl 
" style={backgroundImageStyle2}><span className='rotate-90 mb-8 ms-14 font-bold'>Style</span></div>
                <div className=" w-32 border-2 border-gray-300 shadow-lg bg-cover bg-center rounded-3xl transition duration-300 ease-in-out transform hover:scale-x-150 hover:origin-left hover:w-48  hover:z-50 flex items-end text-black text-4xl 
" style={backgroundImageStyle3}><span className='rotate-90 mb-20 ms-2 font-bold '>Confidence</span></div>
               <div className=" w-32 border-2 border-gray-300 shadow-lg bg-cover bg-center rounded-3xl transition duration-300 ease-in-out transform hover:scale-x-150 hover:origin-left hover:w-48 hover:z-50 flex items-end text-black text-4xl 
" style={backgroundImageStyle4}><span className='rotate-90 mb-16 ms-8 font-bold'>Glamour</span></div>
 <div className=" w-32 border-2 border-gray-300 shadow-lg bg-cover bg-center rounded-3xl transition duration-300 ease-in-out transform hover:scale-x-150 hover:origin-left hover:w-48  hover:z-50 flex items-end text-black text-4xl 
" style={backgroundImageStyle5}><span className='rotate-90 mb-20 ms-8 font-bold '>Selflove</span></div>
              
           </section>    

          
          </div>
         <div className="flex-1 ml-0 ">
           
         <div className="font-sans font-bold text-center mt-28 text-4xl italic text-slate-950"> <h1> "Ordinary people achieving extraordinary things"</h1> </div>
         <div className="container mx-4 my-4 ">
  <div className="grid grid-cols-2 gap-8 ml-16 ">
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-2/3 ">
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-green-500 mb-2">Step 1</div>
        <p className="text-gray-700 text-base">Sign up with a reputable modeling agency to maximize your chances of finding work as a photo model.</p>
      </div>
    </div>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-2/3">
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-cyan-500 mb-2">Step 2</div>
        <p className="text-gray-700 text-base">Develop your portfolio of professional photos by working with experienced photographers and stylists.</p>
      </div>
    </div>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-2/3">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-blue-500">Step 3</div>
        <p className="text-gray-700 text-base">Attend auditions and castings for modeling jobs, making sure to present your best work and be well prepared for each opportunity.</p>
      </div>
    </div>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-2/3">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-pink-600">Step 4</div>
        <p className="text-gray-700 text-base">Work hard to perfect your craft by learning new posing techniques, working on your appearance, and staying fit and healthy.</p>
      </div>
    </div>
  </div>
</div>

          
          
          </div>
        
       </section>
       <section className='bg-gray-100'>
       <div className="font-sans font-bold text-center  text-4xl italic text-slate-950"><h2>Our Team </h2></div>
       <div className='ml-8 mr-8 mt-8'><Team/></div>
       </section>
       <section className="bg-gray-100">

         <FAQ/>

         <div className=''><Footer/></div>
       </section> */}


      </div>
    )
}

export default ModelPage