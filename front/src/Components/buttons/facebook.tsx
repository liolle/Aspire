import { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";

import { useSelector, useDispatch } from 'react-redux'
import { connect,disconnect } from "../../feature/user";
import { useNavigate } from "react-router-dom";

export function FacebookButton () {
    // const [FBStatus, setFBStatus] = useState <fb.StatusResponse>()
    const [avatar, setAvatar] = useState ("https://img.freepik.com/premium-vector/male-avatar-icon-unknown-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-white-background-vector-illustration_735449-122.jpg")
    const navavigate = useNavigate()
    //@ts-ignore
    const connected = useSelector(state => state.connectStatus.value)
    const dispatch = useDispatch()

    const connectlink = `https://www.facebook.com/v16.0/dialog/oauth?client_id=3354425558205408&display=popup&response_type=token&redirect_uri=https://liolle.github.io/Aspire/#/login&scope=email`

 
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

    const Login = ()=>{
        
        // window.open(connectlink, "mozillaWindow", "popup");
        const windowFeatures = "left=100,top=100,width=850,height=1000";
        window.open(connectlink,"_self");

    }

    const Logout = ()=>{
        dispatch(disconnect())
        navavigate("/")
    }


    return (
        <button onClick={()=>{
            connected ? FBDisconnect(): Login()
        }}
        className=" flex gap-2 items-center justify-center w-[10rem]
        border-[1px] rounded-md px-4 py-2 border-blk-100 hover:shadow-xl">
            
            <div className=" flex h-5 w-5 text-[#3b5998] ">
                <FaFacebookF />
            </div>
            {
                connected ? 
                <span className=" font-semibold text-base"> Disconnect </span>
                :
                <span className=" font-semibold text-base"> Connect </span>
            }
            
            {/* <span className=" font-semibold text-base"> Facebook </span> */}
        </button>
    );
}

