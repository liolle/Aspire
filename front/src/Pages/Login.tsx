import NavBar from "../Components/Nav/NavB"
import { useEffect, useState } from 'react'
import LoginPopup from '../Components/login/popUpLog'
import MenuSlider from '../Components/Nav/MenuSlider'
import { useNavigate } from "react-router-dom"
import { connect,disconnect } from "../feature/user"
import { useSelector, useDispatch } from 'react-redux'
import { sync } from "../feature/modelList"

interface CInfo {
    access_token:string,
    data_access_expiration_time:string,
    expires_in:string,
    long_lived_token:string
}

 const Login = () => {

    const [oppenPopup, setOppenPopup] = useState(false)
    const [connectInfo,setConnectInfo] = useState <CInfo>()
    const navigate = useNavigate()

    //@ts-ignore
    const connected = useSelector(state => state.connectStatus.value)
    const dispatch = useDispatch()

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

    const FBConnect = async (cInfo:CInfo)=>{
        if (cInfo && cInfo.access_token != ""){
            let options = {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify({
                    token : cInfo.access_token
                })
            } as RequestInit
            let response = await fetch(`${import.meta.env.VITE_HOST}/users/login`,options)
            const setCookieHeader = response.headers.get('Set-Cookie');
            let data = await response.json() as { status: number, message: string, content: any }
            data.status == 100 ? connectSuccess(data.content) : connectFail()
        }
    }
  
    
    useEffect(()=>{
        const locArr = location.hash.replace('#','').split('&')
        let cInfo :CInfo = {access_token:"",data_access_expiration_time:"",expires_in:"",long_lived_token:""} 
        locArr.map((val,idx) => {
            let item = val.split('=')
            if(item.length>0){
                switch (item[0]) {
                    case "access_token":
                        cInfo.access_token = item[1]
                        break;
                    case "data_access_expiration_time":
                        cInfo.data_access_expiration_time = item[1]
                        break;
                    case "expires_in":
                        cInfo.expires_in = item[1]
                        break;
                    case "long_lived_token":
                        cInfo.long_lived_token = item[1]
                        break;
                    default:
                        break;
                }
            }
        })
        setConnectInfo(cInfo)
        FBConnect(cInfo)
    },[])

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
                <div className='text-4xl font-bold flex justify-center items-center flex-1'>
                    <span className='p-2'> Login pages </span>
                </div>
            </section>
        </div>
    )
}



export default Login