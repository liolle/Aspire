import React, { useNavigate } from'react-router-dom'
import NavBar from "../Components/Nav/NavB"
import model11 from '../images/model11.jpg'

import model8 from '../images/model8.jpg'
import model10 from '../images/model10.jpg'
import model7 from '../images/model7.jpg'
import back from '../images/back.png'
import model4 from '../images/model4.jpg'
import Footer from '../Components/Footer/Footer'
import FAQ from '../Components/FAQ/Faq'
import Team from '../Components/Team/Team'
import { FormEvent, useRef, useState } from 'react'
import LoginPopup from '../Components/login/popUpLog'
import MenuSlider from '../Components/Nav/MenuSlider'
import SCard from '../Components/sliders/cardSlide'
import ModelDisplay from '../Components/Cards/ModelDisplay'
import { useSelector, useDispatch } from 'react-redux'
import { ModelInfo } from '../utils/types'



 const NewModel = () => {

    const [oppenPopup, setOppenPopup] = useState(false)
    //@ts-ignore
    const modelList:ModelInfo[] = useSelector(state => state.modelList.value)
    const dispatch = useDispatch()
    let form = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()

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
  
     const  createModel = async (event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault()
        const { new_model_email } = form.current as HTMLFormElement ;
        if (!new_model_email.value) return

        let option = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("ASP_AT") || ""}`,
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        } 
    
        //@ts-ignore
        let response = await fetch(`${import.meta.env.VITE_SERVER}/models/add?email=${new_model_email.value}`,option)
        let data = await response.json() as { status: number, message: string, content: any }
        data.status == 100 ? navigate(`/edit_model?id=${data.content}`) : console.log("Failed to create model");
        

        // console.log(new_model_email.value);

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
                <div className=' font-bold flex justify-center 
                items-center flex-1 p-2 text-base'>
                    
                    <form  className=' flex flex-col p-4 bg-blk-100 gap-4 rounded-md text-wht' onSubmit={createModel} ref={form}>
                        <label htmlFor='new_model_email'>Email</label>
                        <input type="email" placeholder='example@test.com' name="new_model_email" className=' p-1 text-blk-300'  />
                        <button type='submit' className=' border-2 rounded'> Create </button>
                    </form>
                </div>
            </section>
        </div>
    )
}



export default NewModel