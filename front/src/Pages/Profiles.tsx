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
import ModelDisplay from '../Components/Cards/ModelDisplay'



 const ProfilesPage = () => {

    const [oppenPopup, setOppenPopup] = useState(false)
  
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
        <div className=' bg-neutral-100 '>
            <section id='sec0' className=' h-screen flex flex-1 flex-col  '>

                {
                    oppenPopup && <div onClick={()=>closePopup()}
                    className=" absolute w-full h-screen 
                    flex justify-center items-center bg-[#25252550] overflow-hidden ">
                        <LoginPopup setOppenPopup={setOppenPopup}/>
                    </div>
                }

                <NavBar setOppenPopup={setOppenPopup}/>
                <MenuSlider/>
                <div className='text-4xl font-bold flex justify-center 
                items-center flex-1 p-4'>
                    <div className=' bg-neutral-200 flex flex-1 
                    h-full rounded-md p-2 gap-4 justify-center items-center flex-wrap'>
                        <ModelDisplay/>
                        <ModelDisplay/>
                        <ModelDisplay/>
                        <ModelDisplay/>
                        <ModelDisplay/>
                    </div>
                </div>
            </section>
        </div>
    )
}



export default ProfilesPage