import { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";

import { useSelector, useDispatch } from 'react-redux'
import { connect,disconnect } from "../../feature/user";
import { useNavigate } from "react-router-dom";

declare global {
    interface Window {
      fbAsyncInit: () => void;
      FB: any;
    }
  }

export function FacebookButton () {
    // const [FBStatus, setFBStatus] = useState <fb.StatusResponse>()
    const [avatar, setAvatar] = useState ("https://img.freepik.com/premium-vector/male-avatar-icon-unknown-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-white-background-vector-illustration_735449-122.jpg")
    const navigate = useNavigate()
    //@ts-ignore
    const connected = useSelector(state => state.connectStatus.value)
    const dispatch = useDispatch()

    // const connectlink = `https://www.facebook.com/v16.0/dialog/oauth?client_id=3354425558205408&display=popup&response_type=token&redirect_uri=https://liolle.github.io/Aspire/#/login&scope=email`

 
    // const FBDisconnect = async ()=>{
    //     let option = {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem("ASP_AT") || ""}`,
    //             'accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     } 
    
    //     //@ts-ignore
    //     let response = await fetch(`${PROD}/users/logout`,option)
    //     let data = await response.json() as { status: number, message: string, content: any }
    
    //     data.status == 100 && Logout()
        
    // }

    const connectSuccess = async (token ="")=>{
        dispatch(connect())
        token != "" && localStorage.setItem('ASP_AT', token);
        setTimeout(() => {
            navigate("/profiles")
        }, 50);
    }
    
    useEffect(() => {
        // Load the Facebook SDK asynchronously
        const loadFacebookSDK = () => {
          return new Promise<void>((resolve) => {
            window.fbAsyncInit = function() {
              window.FB.init({
                appId: '253355607076885',
                cookie: true,
                xfbml: true,
                version: 'v16.0'
              });
    
              // Resolve the promise once the SDK is loaded
              resolve();
            };
    
            // Load the Facebook SDK script
            (function() {
              var js, fjs = document.getElementsByTagName("script")[0];
              if (document.getElementById("facebook-jssdk")) return;
              js = document.createElement("script"); 
              js.id = 'facebook-jssdk';
              js.src = 'https://connect.facebook.net/en_US/sdk.js';
              let fjsParent = fjs.parentNode as ParentNode
              fjsParent.insertBefore(js, fjs);
            }());

          });
        };
    
        // Load the Facebook SDK
        loadFacebookSDK();
      }, []);
    // const dowloadSDK = async ()=>{


    // }

    const Login = ()=>{
        
        // window.open(connectlink, "mozillaWindow", "popup");
        const windowFeatures = "left=100,top=100,width=850,height=1000";
        // window.open(connectlink,"_self");
        if (!connected){
            
            window.FB.login(function(response: {authResponse:{accessToken:string}}) {
                if (response) {
                  // User is logged in
                  dispatch(connect())
                  console.log('Logged in', response);
                  navigate(`/login?access_token=${response.authResponse.accessToken}`)
                } else {
                  // User cancelled login or didn't authorize the app
                  console.log('Login cancelled');
                  dispatch(disconnect())
                }
              },{ scope: 'public_profile,email', redirect_uri: "https://localhost:5173/#/login/" });
        }

    }

    const Logout = ()=>{
        dispatch(disconnect())
        navigate("/")
    }


    return (
        // <button onClick={()=>{
        //     connected ? FBDisconnect(): Login()
        // }}
        <button onClick={()=>console.log(" feature disable for now (Can't find a way to configure facebook login API to allow account other then admin to connect)")}
        className=" flex gap-2 items-center justify-center 
        border-[1px] rounded-md px-4 py-1 border-blk-100 hover:shadow-xl">
            
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

