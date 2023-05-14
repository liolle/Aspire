import { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";

import { useSelector, useDispatch } from 'react-redux'
import { connect,disconnect } from "../../feature/user";

export function FacebookButton () {
    // const [FBStatus, setFBStatus] = useState <fb.StatusResponse>()
    const [avatar, setAvatar] = useState ("https://img.freepik.com/premium-vector/male-avatar-icon-unknown-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-white-background-vector-illustration_735449-122.jpg")

    //@ts-ignore
    const connected = useSelector(state => state.connectStatus.value)
    const dispatch = useDispatch()

    const Login = ()=>{
        dispatch(connect())
        console.log("Login ...")
    }

    const Logout = ()=>{
        dispatch(disconnect())
        console.log("Logout ...")
    }


    return (
        <button onClick={()=>{
            connected ? Logout(): Login()
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

