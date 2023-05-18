import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { connect, disconnect } from "../../feature/user";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";



export function GoogleButton() {
  const [avatar, setAvatar] = useState("https://img.freepik.com/premium-vector/male-avatar-icon-unknown-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-white-background-vector-illustration_735449-122.jpg");
  const navigate = useNavigate();
  //@ts-ignore
  const connected = useSelector((state) => state.connectStatus.value);
  const dispatch = useDispatch();

  const googleClientId = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your Google Client ID

  const handleCredentialResponse = (response:{credential:string})=>{
    // let decode = jwtDecode(response.credential)
    // use login route 
    GLogin(response.credential)
  }

  useEffect(()=>{
    /* global google */
    //@ts-ignore
    google.accounts.id.initialize({
        client_id: '413897785903-583eg046i9tmj5u1ombhac4grbpuf4fq.apps.googleusercontent.com',
        callback: handleCredentialResponse
    });

    //@ts-ignore
    google.accounts.id.renderButton(
        /** @type{!HTMLElement} */ document.getElementById("google_login_btn"),
        /** @type{!GsiButtonConfiguration} */{theme:"filled_black",size:"medium"}
    )

    //@ts-ignore
    !connected && google.accounts.id.prompt();
  })

  const connectSuccess = async (token ="")=>{
    dispatch(connect())
    token != "" && localStorage.setItem('ASP_AT', token);
    setTimeout(() => {
        navigate("/profiles")
    }, 50);
  }

  const connectFail = ()=>{
    dispatch(disconnect())
    navigate("/")
  }

  const GLogin = async (token:string)=>{
    let options = {
      method:"POST",
      headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
          token : token,
          service : 'google'
      })
    } as RequestInit
    
    try {
      let response = await fetch(`https://apire.vercel.app/users/login`,options)
      let data = await response.json() as { status: number, message: string, content: any }
      data.status == 100 ? connectSuccess(data.content) : connectFail()
      
    } catch (error) {
      connectFail()
    }

  }

  const GLogout = async ()=>{
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

  const Logout = ()=>{
    dispatch(disconnect())
    navigate("/")
  }


  return (
    // <button
      
    //   disabled={connected}
    //   className="flex gap-2 items-center justify-center w-[10rem] border-[1px] rounded-md  border-blk-100 hover:shadow-xl"
    // >
      
    // </button>
    
    connected ? 
    <div  className=" flex gap-2 items-center justify-center  border-blk-100 hover:shadow-xl">
      <button onClick={()=>GLogout()}
        className="flex gap-2 items-center 
        justify-center w-[10rem]
        border-[1px] rounded-md px-4 py-2 
        border-blk-100 hover:shadow-xl font-bold"> 
        Disconnect 
      </button>
    </div>
    :
    <div id="google_login_btn" className=" flex gap-2 items-center justify-center  border-blk-100 hover:shadow-xl">

    </div>
    
  );
}

