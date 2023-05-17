
import { RiCloseLine } from "react-icons/ri";
// import Logo from "../../nav/logo";
// import { GoogleButton } from "../../buttons/google";
import { FacebookButton } from "../buttons/facebook";
import { useState } from "react";

const LoginPopup = ({setOppenPopup}:{setOppenPopup:React.Dispatch<React.SetStateAction<boolean>>|undefined})=>{

    const closePopup = ()=>{
        if (!setOppenPopup) return

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


    return (
        <div  
        onClick={(e)=>e.stopPropagation()}
        className=" relative rounded-xl bg-wht
        flex flex-col justify-center items-center p-6 gap-4 ">

            <div onClick={()=>closePopup()}
            className=" absolute top-[-.55rem] right-[-.5rem] h-[2rem] w-[2rem] text-3xl
            rounded-full text-blk-300 bg-wht flex justify-center items-center
            hover:cursor-pointer ">
                <RiCloseLine/>
            </div>

            {/* <Logo/> */}

            <div className=" flex flex-col gap-2 justify-center items-center">
                <span className=" font-medium text-blk-300 text-xl"> Welcome back</span>
                <span className=" font-light text-blk-100">Enter your details to log in.</span>
            </div>

            <div className=" flex gap-4
            text-xl text-blk-300">
                {/* <GoogleButton/> */}
                <FacebookButton/>
            </div>
            <Separator/>

            <div className=" w-full flex justify-center">
                {/* <EmailInput label="Email" required={true}/> */}
                <span className=" text-blk-200 select-none">Classic connection incoming </span>
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

// interface EmailInputProps {
//     label: string;
//     required?: boolean;
//   }

// const EmailInput:React.FC<EmailInputProps> = ({ label, required = false })=>{
//     const [email, setEmail] = useState("");
//     const [isValid, setIsValid] = useState(true);

//     const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setEmail(e.target.value);
//         // setIsValid(validateEmail(e.target.value));
//       };
    
//       const validateEmail = (email: string) => {
//         // Basic email validation using a regular expression
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return !required || (required && emailPattern.test(email));
//       };
    
//       return (
//         <div className=" text-blk-300 flex flex-col flex-1">
//           <label htmlFor="email">{label}</label>
          
//           <input type="email" id="email" value={email} onChange={handleEmailChange}
//           className=" border-[1px] rounded-md px-2 py-1 "
//           placeholder="Enter your email" />
//           {!isValid && <span className=" text-red-500">Please enter a valid email address.</span>}
//         </div>
//       );
// }

export default LoginPopup