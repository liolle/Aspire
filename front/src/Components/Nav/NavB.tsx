import { IconContext } from "react-icons";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

// import Logo from "./logo"
import { FaRegUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { decrement,increment } from "../../feature/counter"; 
import { connect,disconnect } from "../../feature/user";
import MenuSlider from "./MenuSlider";


const NavBar = ( {setOppenPopup}:{setOppenPopup:React.Dispatch<React.SetStateAction<boolean>>|undefined})=>{

    const navigate = useNavigate()
    //@ts-ignore
    const connected = useSelector(state => state.connectStatus.value)

    const oppenLogin = ()=>{
        if(setOppenPopup != undefined){

            const section1 = document.querySelector("#sec1") as HTMLElement
            const section2 = document.querySelector("#sec2") as HTMLElement
            const section3 = document.querySelector("#sec3") as HTMLElement
            const section4 = document.querySelector("#sec4") as HTMLElement
            if(section1){section1.classList.add("hidden")}
            if(section2){section2.classList.add("hidden")}
            if(section3){section3.classList.add("hidden")}
            if(section4){section4.classList.add("hidden")}

            setOppenPopup(true)
        }
    }

    const openMenu = ()=>{
        const element = document.querySelector("#mb-bugger-menu")
        const section1 = document.querySelector("#sec1") as HTMLElement
        const section2 = document.querySelector("#sec2") as HTMLElement
        const section3 = document.querySelector("#sec3") as HTMLElement
        const section4 = document.querySelector("#sec4") as HTMLElement
        if (element){
            //@ts-ignore
            element.classList.remove("hidden")
            if(section1){section1.classList.add("hidden")}
            if(section2){section2.classList.add("hidden")}
            if(section3){section3.classList.add("hidden")}
            if(section4){section4.classList.add("hidden")}
            setTimeout(() => {
                //@ts-ignore
                element.style.transform = "translateX(0%)";
            }, 50);
            
        }
    }

    return (
        

        <div className=" h-20 px-12 py-2 w-full bg-wht
        flex gap-4 ">
            
            <div onClick={()=>navigate("/")}
            className=" flex justify-center items-center text-2xl font-bold 
            font-mono select-none hover:cursor-pointer gap-2">
                {/* <Logo/> */}
                <span className="  "> ASPIRE </span>
            </div>
            <div className=" flex-1 flex  justify-center font-bold items-center select-none">
                <Navigation/>
            </div>
            <div className=" flex justify-center items-center 
            select-none gap-4 ">
                <div onClick={()=>oppenLogin()}
                className="text-3xl font-bold 
                font-mono hover:cursor-pointer
                hidden md:flex">
                    <FaRegUserCircle/>
                </div>

                <div onClick={()=>openMenu()}
                className="text-2xl font-bold md:hidden
                font-mono hover:cursor-pointer">
                    <HiMenu/>
                </div>
            </div>
            
        </div>
    )
}

const Navigation = ()=>{
    const navigation = useNavigate()

    //@ts-ignore
    const connected = useSelector(state => state.connectStatus.value)
    const dispatch = useDispatch()

    return (

        <div className=" hidden md:flex gap-4 py-2 px-4 ">
            {
                connected &&<span onClick={()=>navigation("/profiles")}
                className=" hover:cursor-pointer hover:text-orange  border-blk-200 "> 
                    Profiles 
                </span>

            }
            <span onClick={()=>navigation("/pricing")}
            className=" hover:cursor-pointer hover:text-orange  border-blk-200 "> 
                Pricing 
            </span>
        </div>

    )

}

export default NavBar