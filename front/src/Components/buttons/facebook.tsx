import { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";

import { useSelector, useDispatch } from 'react-redux'
import { connect,disconnect } from "../../feature/user";

export function FacebookButton () {
    const [FBStatus, setFBStatus] = useState <fb.StatusResponse>()
    const [avatar, setAvatar] = useState ("https://img.freepik.com/premium-vector/male-avatar-icon-unknown-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-white-background-vector-illustration_735449-122.jpg")

    //@ts-ignore
    const connected = useSelector(state => state.connectStatus.value)
    const dispatch = useDispatch()

    const FacebookLogin = () =>{

        // if (!FBStatus){
        //     FB.getLoginStatus(function(response) {
        //         setFBStatus(response)
        //     });
        // }
        
        if (!!FBStatus) {
            
            if(FBStatus.status === 'connected'){
                // FB.api("/me?fields=id,name,email",{fields: 'picture,id,name,email'},function(response: any){
                //     const {name,email,id,picture} = response as {name:string,email:string,id:number,picture:{
                //         data:{
                //             url:string
                //         }
                //     }}
                //     console.log("Welcome back "+name);
                //     console.log("Email "+email);
                //     console.log(picture.data.url);
                    
                //     setAvatar(picture.data.url)
                   
                    
                // })
                dispatch(connect())
                
            }
            else  {
                
                FB.login( function(response: any){
                    dispatch(connect())
                },{
                    
                    scope:'email',
                    return_scopes: true
                })
                        
            }
        }
        

        
        

    }

    const FacebookLogout = () =>{

        FB.logout(function(response: any) {
            // user is now logged out
            dispatch(disconnect())
        });

    }

    useEffect(()=>{
        window.fbAsyncInit = function() {
            FB.init({
            appId      : import.meta.env.VITE_FACEBOOK_APP_ID,
            cookie     : true,
            xfbml      : true,
            version    : 'v16.0'
            });
            
            FB.getLoginStatus(function(response) {
                setFBStatus(response)
            });
            
        }

        var js, fjs = document.getElementsByTagName('script')[0];
        if (document.getElementById('facebook-jssdk')) return
        js = document.createElement('script'); js.id = 'facebook-jssdk';
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        if (!fjs || !fjs.parentNode) return
        fjs.parentNode.insertBefore(js, fjs);

        

    },[])


    return (
        <button onClick={()=>{
            connected ? FacebookLogout() : FacebookLogin()
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

