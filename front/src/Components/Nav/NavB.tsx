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


const NavBar = ( {setOppenPopup}:{setOppenPopup:React.Dispatch<React.SetStateAction<boolean>>|undefined})=>{

    const navigate = useNavigate()

    const oppenLogin = ()=>{
        if(setOppenPopup != undefined){
            console.log("Open login");

            setOppenPopup(true)
        }
    }

    const oppenMenu = ()=>{
        console.log("Open menu");
        
    }

    return (
        

        <div className=" h-20 px-12 py-2 w-full bg-blk-200
        flex gap-4 ">
            
            <div onClick={()=>navigate("/")}
            className=" flex justify-center items-center text-2xl font-bold 
            font-mono select-none hover:cursor-pointer gap-2">
                {/* <Logo/> */}
                <span className="  "> ASPIRE </span>
            </div>
            <div className=" flex-1 flex  justify-start font-bold items-center select-none">
                <Navigation/>
            </div>
            <div className=" flex justify-center items-center 
            select-none gap-4 ">
                <div onClick={()=>oppenLogin()}
                className="text-2xl font-bold 
                font-mono hover:cursor-pointer">
                    <FaRegUserCircle/>
                </div>

                <div onClick={()=>oppenMenu()}
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
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()

    return (

        <div className=" hidden md:flex gap-4 py-2 px-4 ">
            <span onClick={()=>navigation("/pricing")}
            className=" hover:cursor-pointer hover:text-orange hover:border-orange border-b-2 border-blk-200 "> Pricing </span>
        </div>
    )

}

export default NavBar