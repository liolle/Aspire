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
import MenuSlider from '../Components/Nav/MenuSlider'
import SCard from '../Components/sliders/cardSlide'



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
      
      const closePopup = ()=>{

        const section1 = document.querySelector("#sec1") as HTMLElement
            const section2 = document.querySelector("#sec2") as HTMLElement
            const section3 = document.querySelector("#sec3") as HTMLElement
            const section4 = document.querySelector("#sec4") as HTMLElement
            if(section1){section1.classList.remove("hidden")}
            if(section2){section2.classList.remove("hidden")}
            if(section3){section3.classList.remove("hidden")}
            if(section4){section4.classList.remove("hidden")}

        setOppenPopup(false)
      }


    return (
      <div  className=' bg-neutral-100'>
        
        <section id='sec0' className=' flex flex-col h-screen '>

          {
              oppenPopup && <div onClick={()=>closePopup()}
              className=" absolute w-full h-screen 
              flex justify-center items-center bg-[#25252550] overflow-hidden ">
                  <LoginPopup setOppenPopup={setOppenPopup}/>
              </div>
          }
          
          <NavBar setOppenPopup={setOppenPopup}/>
          <MenuSlider/>
          <div className=' flex flex-1 bg-cover bg-center' style={backgroundImageStyle0}>
            <div className='flex-1'>

            </div>
            <div className=' flex flex-col flex-1 justify-center items-center'>
              <div className=' flex-1 flex max-w-[600px]'>

                <div className='flex flex-col flex-1 
                justify-between items-center py-4'>
                  <div className="font-sans font-bold text-center 
                  text-2xl lg:text-4xl italic text-blk-200 p-4"> 
                    <h1> Aspire to greatness </h1> 
                  </div>
                  <div className='text-lg lg:text-2xl italic p-2 font-semibold '>
                    <p>Aspire Models is the modeling agency that inspires
                      ordinary people to pursue their dream of becoming 
                      a model. We provide tools and resources to help 
                      beginners achieve their goals and become role 
                      models in the industry.</p>

                  </div>
                  <button className='w-52 h-14  border-2 
                  rounded-full border-slate  
                  bg-fuchsia-500 text-xl text-slate'>
                    Try it now 
                  </button>
                </div>
              </div>
              <div className='flex-[0_1_40%]'>
                
              </div>
            </div>
            
          </div>
        </section>

        <section id='sec1' className=" flex justify-center p-4 ">
          <div className=' flex gap-1 w-[50rem]'>

            <SCard bg={backgroundImageStyle1} title='Inspire'/>
            <SCard bg={backgroundImageStyle2} title='Style'/>
            <SCard bg={backgroundImageStyle3} title='Confidence'/>
            <SCard bg={backgroundImageStyle4} title='Glamour'/>  
          </div>
          
        </section>  

        <section id='sec2' className='  '>
          <div className=" flex flex-col items-center gap-4 p-4 md:flex-row flex-wrap justify-center ">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden h-[10rem] w-[20rem] ">
              <div className="p-2">
                <div className="font-bold text-xl text-green-500 ">Step 1</div>
                <p className="text-gray-700 text-base">Sign up with a reputable modeling agency to maximize your chances of finding work as a photo model.</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden h-[10rem] w-[20rem]">
              <div className="p-2">
                <div className="font-bold text-xl text-cyan-500 ">Step 2</div>
                <p className="text-gray-700 text-base">Develop your portfolio of professional photos by working with experienced photographers and stylists.</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden h-[10rem] w-[20rem]">
              <div className="p-2">
                <div className="font-bold text-xl  text-blue-500">Step 3</div>
                <p className="text-gray-700 text-base">Attend auditions and castings for modeling jobs, making sure to present your best work and be well prepared for each opportunity.</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden h-[10rem] w-[20rem]">
              <div className="p-2">
                <div className="font-bold text-xl  text-pink-600">Step 4</div>
                <p className="text-gray-700 text-base">Work hard to perfect your craft by learning new posing techniques, working on your appearance, and staying fit and healthy.</p>
              </div>
            </div>
          </div>
        </section>

        <section id='sec3' className=' flex flex-col'>
          <div className="font-sans font-bold text-center  text-4xl italic text-slate-950"><h2>Our Team </h2></div>
          <div className='ml-8 mr-8 mt-8'>
            <Team/>
          </div>
        </section>

        <section id='sec4' className="">
          <FAQ/>
          <div className=''><Footer/></div>
        </section>
      </div>
    )
}



export default ModelPage