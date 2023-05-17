import React from'react-router-dom'
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
import { FormEvent, useEffect, useRef, useState } from 'react'
import LoginPopup from '../Components/login/popUpLog'
import MenuSlider from '../Components/Nav/MenuSlider'
import SCard from '../Components/sliders/cardSlide'
import ModelDisplay from '../Components/Cards/ModelDisplay'
import { useSelector, useDispatch } from 'react-redux'
import { ModelInfo } from '../utils/types'
import { setHair, setHeight, setSkin, setWeight } from '../feature/modelList'
import under_construction from "../images/under_construction.gif"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



 const ModelEdit = () => {

    const [oppenPopup, setOppenPopup] = useState(false)
    //@ts-ignore
    const modelList:ModelInfo[] = useSelector(state => state.modelList.value)
    const dispatch = useDispatch()
    const [model_id,setModelId] = useState(0)
    const [activeChar,setActiveChar] = useState("Height")
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
    
    useEffect(()=>{
        let search = location.search.replace('?','').split('&')

        for (let elem of search){
            if (elem.includes("id")){
                let split = elem.split("=")
                if( split.length<=1) break
                let id = parseInt(split[1])
                
                setModelId(isNaN(id)?0:id)
            }
        }
    },[activeChar])
  
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
                <div className='text-4xl font-bold flex
                flex-1 p-2'>

                    <div className=' rounded flex flex-1 overflow-hidden'>
                        <div className=' flex flex-col text-base flex-[0_1_100px] md:flex-[0_1_200px]  p-4 gap-4 text-center select-none'>
                            <span onClick={()=>setActiveChar("Height")}
                            className={`rounded border-2 hover:cursor-pointer   border-blk-200 ${activeChar == "Height" && "bg-orange"}`}> 
                                Height 
                            </span>

                            <span onClick={()=>setActiveChar("Weight")}
                            className={`rounded border-2 hover:cursor-pointer    border-blk-200 ${activeChar == "Weight" && "bg-orange"}`}> 
                                Weight 
                            </span>

                            <span onClick={()=>setActiveChar("Hair")}
                            className={`rounded border-2 hover:cursor-pointer   border-blk-200 ${activeChar == "Hair" && "bg-orange"}`}> 
                                Hair 
                            </span>

                            <span onClick={()=>setActiveChar("Skin")}
                            className={`rounded border-2 hover:cursor-pointer    border-blk-200 ${activeChar == "Skin" && "bg-orange"}`}> 
                                Skin 
                            </span>
                        </div>
                        <div className=' flex flex-col flex-1 p-2 '>
                            <div className=' flex flex-1 p-2 select-none'>
                                <div className=' bg-[#4eb5ed] flex flex-col text-base flex-1 border-2 rounded text-black justify-center items-center p-4'>
                                    {/* <span>{location.href}</span>
                                    <span>{"--"+location.hash}</span> */}
                                    {
                                        <span >{"Model ID: "+model_id}</span>
                                    }
                                    <img className=' bg-cover' src={under_construction} alt="Under construction" />
                                    {/* <span>{location.search.replace('?','').split('&')}</span> */}
                                </div>
                            </div>
                            <div className=' flex flex-[0_1_200px] justify-center'>
                                
                                {
                                    activeChar == "Height" && <HeightSector id={model_id}/>
                                }

                                {
                                    activeChar == "Weight" && <WeightSector id={model_id}/>
                                }

                                {
                                    activeChar == "Skin" && <SkinColorSector id={model_id}/>
                                }
                                
                                {
                                    activeChar == "Hair" && <HairColorSector id={model_id}/>
                                }
                                <ToastContainer className={` text-base`} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const HeightSector = ({id}:{id:number})=>{
    //@ts-ignore
    const modelList:ModelInfo[] = useSelector(state => state.modelList.value)
    const dispatch = useDispatch()
    const [value,setValue] = useState(0)
    let valueInput = useRef<HTMLInputElement>(null)
    useEffect(()=>{
        let model = modelList.find((elem)=>elem.id == id)
       
        if( model){
            setValue(model.height)
            let input = document.querySelector("#selector_height") as HTMLInputElement
            if (!input) return
            input.value = `${model.height}`
            
        }
        
        
    },[modelList,valueInput,id])

    const changeValue = ()=>{
        if (!valueInput.current) return
        let val = parseInt(valueInput.current.value)
        !isNaN(val) && setValue(val)
    }

    const sendValue = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        let option = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("ASP_AT") || ""}`,
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        } 
    
        //@ts-ignore
        let response = await fetch(`${import.meta.env.VITE_HOST}/models/${id}/height/${value}`,option)
        let data = await response.json() as { status: number, message: string, content: any }
    
        if (response.status == 200){
            dispatch(setHeight({
                id:id,
                value:value
            }))

            toast.success('Update successful !', {
                position: "top-center",
                autoClose: 1000,
                onClose: ()=>{
                  console.log("close");
                }
            })
        }
        else{
            toast.error('Update failed !', {
              position: "top-center",
              hideProgressBar:true,
              pauseOnHover:true,
              autoClose: 2000
            })
        }
    }

    return (
        <form onSubmit={sendValue}
        className=' text-base flex flex-col justify-center gap-6'>
            <div className='flex gap-4 p-2 justify-center items-center'>
                <label htmlFor="selector_height">Height</label>
                <input onChange={changeValue}
                type="range" 
                id="selector_height" 
                name="selector_height" 
                min="0" 
                max="300" 
                
                ref={valueInput}/> 
                {value+" cm"} 

            </div>
            <div className=' flex justify-center'>

                <button className=' bg-blk-300 text-wht hover:text-orange text-lg py-2 px-4 rounded-md border-2' type="submit"> Save </button>
            </div>
        </form>
    )
}

const WeightSector = ({id}:{id:number})=>{
    //@ts-ignore
    const modelList:ModelInfo[] = useSelector(state => state.modelList.value)
    const dispatch = useDispatch()
    const [value,setValue] = useState(0)
    let valueInput = useRef<HTMLInputElement>(null)
    useEffect(()=>{
        let model = modelList.find((elem)=>elem.id == id)
        if( model){
            setValue(model.weight)
            let input = document.querySelector("#selector_weight") as HTMLInputElement
            if (!input) return
            input.value = `${model.weight}`
        }

        
    },[modelList,valueInput,id])

    const changeValue = ()=>{
        if (!valueInput.current) return
        let val = parseInt(valueInput.current.value)
        !isNaN(val) && setValue(val)
    }

    const sendValue = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        let option = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("ASP_AT") || ""}`,
                'accept': 'application/json',
      'Content-Type': 'application/json',
            },
        } 
    
        //@ts-ignore
        let response = await fetch(`${import.meta.env.VITE_HOST}/models/${id}/weight/${value}`,option)
        let data = await response.json() as { status: number, message: string, content: any }
    
        if (response.status == 200){
            dispatch(setWeight({
                id:id,
                value:value
            }))
            toast.success('Update successful !', {
              position: "top-center",
              autoClose: 1000,
              onClose: ()=>{
                console.log("close");
                
              }
            })
        }
        else{
            toast.error('Update failed !', {
              position: "top-center",
              hideProgressBar:true,
              pauseOnHover:true,
              autoClose: 2000
            })
        }
    }

    return (
        <form onSubmit={sendValue}
        className=' text-base flex flex-col justify-center gap-6'>
            <div className='flex gap-4 p-2 justify-center items-center'>
                <label htmlFor="selector_weight">Weight</label>
                <input onChange={changeValue}
                type="range" 
                id="selector_weight" 
                name="selector_weight" 
                min="0" 
                max="300" 
                
                ref={valueInput}/> 
                {value+" kg"} 

            </div>
            <div className=' flex justify-center'>

                <button className=' bg-blk-300 text-wht hover:text-orange text-lg py-2 px-4 rounded-md border-2' type="submit"> Save </button>
            </div>
        </form>
    )
}

const SkinColorSector = ({id}:{id:number})=>{
    //@ts-ignore
    const modelList:ModelInfo[] = useSelector(state => state.modelList.value)
    const dispatch = useDispatch()
    const [value,setValue] = useState("#1f1f1f")
    let valueInput = useRef<HTMLInputElement>(null)
    useEffect(()=>{
        let model = modelList.find((elem)=>elem.id == id)
        if( model){
            setValue(model.skinColor)
            let input = document.querySelector("#selector_skin_color") as HTMLInputElement
            if (!input) return
            
            input.value = `${model.skinColor}`
        }

        
    },[modelList,valueInput,id])

    const changeValue = ()=>{
        if (!valueInput.current) return
        setValue(valueInput.current.value)
    }

    const sendValue = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        let option = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("ASP_AT") || ""}`,
                'accept': 'application/json',
      'Content-Type': 'application/json',
            },
        } 
    
        //@ts-ignore
        let response = await fetch(`${import.meta.env.VITE_HOST}/models/${id}/skinColor/${value.replace('#','')}`,option)
        let data = await response.json() as { status: number, message: string, content: any }
        
        if (response.status == 200){
            dispatch(setSkin({
                id:id,
                color:value
            }))
            toast.success('Update successful !', {
              position: "top-center",
              autoClose: 1000,
            })
        }
        else{
            toast.error('Update failed !', {
              position: "top-center",
              hideProgressBar:true,
              pauseOnHover:true,
              autoClose: 2000
            })
        }
        
    }

    return (
        <form onSubmit={sendValue}
        className=' text-base flex flex-col justify-center gap-6'>
            <div className='flex gap-4 p-2 justify-center items-center'>
                <label htmlFor="selector_skin_color">Skin</label>
                <input onChange={changeValue}
                type="color" 
                id="selector_skin_color" 
                name="selector_skin_color" 
                defaultValue={value}
                
                ref={valueInput}/> 
                

            </div>
            <div className=' flex justify-center'>

                <button className=' bg-blk-300 text-wht hover:text-orange text-lg py-2 px-4 rounded-md border-2' type="submit"> Save </button>
            </div>
        </form>
    )
}

const HairColorSector = ({id}:{id:number})=>{
    //@ts-ignore
    const modelList:ModelInfo[] = useSelector(state => state.modelList.value)
    const dispatch = useDispatch()
    const [value,setValue] = useState("#252525")
    let valueInput = useRef<HTMLInputElement>(null)
    useEffect(()=>{
        let model = modelList.find((elem)=>elem.id == id)
        if( model){
            setValue(model.hairColor)
            let input = document.querySelector("#selector_hair_color") as HTMLInputElement
            if (!input) return
            
            input.value = `${model.hairColor}`
        }

        
    },[modelList,valueInput,id])

    const changeValue = ()=>{
        if (!valueInput.current) return
        setValue(valueInput.current.value)
    }

    const sendValue = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        let option = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("ASP_AT") || ""}`,
                'accept': 'application/json',
      'Content-Type': 'application/json',
            },
        } 
    
        //@ts-ignore
        let response = await fetch(`${import.meta.env.VITE_HOST}/models/${id}/hairColor/${value.replace('#','')}`,option)
        let data = await response.json() as { status: number, message: string, content: any }
        
        if (response.status == 200){
            dispatch(setHair({
                id:id,
                color:value
            }))
            toast.success('Update successful !', {
              position: "top-center",
              autoClose: 1000,
            })
        }
        else{
            toast.error('Update failed !', {
              position: "top-center",
              hideProgressBar:true,
              pauseOnHover:true,
              autoClose: 2000
            })
        }
        
    }

    return (
        <form onSubmit={sendValue}
        className=' text-base flex flex-col justify-center gap-6'>
            <div className='flex gap-4 p-2 justify-center items-center'>
                <label htmlFor="selector_hair_color">Hair</label>
                <input onChange={changeValue}
                type="color" 
                id="selector_hair_color" 
                name="selector_hair_color" 
                defaultValue={value}
                
                ref={valueInput}/> 
                

            </div>
            <div className=' flex justify-center'>

                <button className=' bg-blk-300 text-wht hover:text-orange text-lg py-2 px-4 rounded-md border-2' type="submit"> Save </button>
            </div>
        </form>
    )
}

const showToastMessage = () => {
    toast.success('Success Notification !', {
        position: toast.POSITION.TOP_RIGHT
    });
};


export default ModelEdit