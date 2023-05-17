import { useNavigate } from "react-router-dom"
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { FacebookButton } from "../buttons/facebook";
import { useSelector, useDispatch } from 'react-redux'
import { connect,disconnect } from "../../feature/user";

const MenuSlider = ()=>{

    const [bgMenu, setBgMenu] = useState("")

    const navigate = useNavigate()

    const closeMenu = ( navigation = "")=>{
        const element = document.querySelector("#mb-bugger-menu")
        if (element){
            if (navigation.length>0){navigate(navigation)}
            const section1 = document.querySelector("#sec1") as HTMLElement
            const section2 = document.querySelector("#sec2") as HTMLElement
            const section3 = document.querySelector("#sec3") as HTMLElement
            const section4 = document.querySelector("#sec4") as HTMLElement
            if(section1){section1.classList.remove("hidden")}
            if(section2){section2.classList.remove("hidden")}
            if(section3){section3.classList.remove("hidden")}
            if(section4){section4.classList.remove("hidden")}
            
            //@ts-ignore
            element.style.transform = "translateX(100%)";
            setTimeout(() => {
                element.classList.remove("flex")
                element.classList.add("hidden")
            }, 500);
        }
    }

    const FBDisconnect = async ()=>{
        let option = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("ASP_AT") || ""}`,
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        } 
    
        //@ts-ignore
        let response = await fetch(`https://apire.vercel.app/users/logout`,option)
        let data = await response.json() as { status: number, message: string, content: any }
    
        data.status == 100 && Logout()
        
    }

    const openMenu = ()=>{
        const element = document.querySelector("#mb-bugger-menu")
        if (element){
            //@ts-ignore
            element.classList.remove("hidden")
            element.classList.add("flex")
            //@ts-ignore
            element.style.transform = "translateX(0%)";
            
        }
    }
    //@ts-ignore
    const connected = useSelector(state => state.connectStatus.value)
    const dispatch = useDispatch()

    const Login = ()=>{
        dispatch(connect())
        closeMenu("/")
    }

    const Logout = ()=>{
        dispatch(disconnect())
        closeMenu("/")
    }

    return (
        <div id="mb-bugger-menu" className={` absolute z-50 hidden w-full   flex-col h-[100vh]  translate-x-full bg-wht transition ease-in-out duration-[500ms]  ` }>

            <div className=" flex justify-between">
                <div onClick={()=>closeMenu("/")}
                className=" flex items-center 
                text-2xl font-bold p-4
                font-mono select-none hover:cursor-pointer gap-2">
                    
                    <span className="  "> ASPIRE </span>
                </div>

                <div 
                onClick={()=>closeMenu()}
                className=" flex justify-center items-center
                p-4 select-none hover:cursor-pointer">
                    <GrClose/>
                </div>

            </div>

            <div className=" flex flex-col justify-between gap-4">

                {
                    connected &&<span onClick={()=>closeMenu("/profiles")}
                    className=" p-4 text-lg font-mono 
                    select-none hover:cursor-pointer hover:text-orange font-bold  "> 
                        Profiles 
                    </span>
                }

                <div onClick={()=>closeMenu("/pricing")} 
                className=" p-4 text-lg font-mono 
                select-none hover:cursor-pointer hover:text-orange font-bold 
                ">
                    <span> Princing </span>
                </div>

                <div className=" flex gap-4
                text-xl text-blk-300 justify-center">
                    {/* <GoogleButton/> */}
                    {
                        connected && <button onClick={()=>FBDisconnect()}
                        className="flex gap-2 items-center 
                        justify-center w-[10rem]
                        border-[1px] rounded-md px-4 py-2 
                        border-blk-100 hover:shadow-xl font-bold"> Disconnect </button>
                    }
                    {
                        !connected && <FacebookButton/>
                        
                    }
                </div>
            </div>

            

        </div>
    )

}

const Separator = ()=>{
    return (
        <div className=" flex gap-2 text-blk-100 w-full text-xs font-semibold">
            <div className=" flex relative w-full">
                <div className=" absolute  top-[50%] w-full h-[1px] bg-[#64646450]"/>
            </div>
            <span> OR </span>
            <div className=" flex relative w-full">
                <div className=" absolute  top-[50%] w-full h-[1px] bg-[#64646450]"/>
            </div>
        </div>
    )
}


export default MenuSlider