import React, { Profiler, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import ModelPage from "./Pages/Landing"
import PricingPage from "./Pages/PricingPage"
import TestComp from "./Pages/TestComponent"
import ProfilesPage from "./Pages/Profiles"
import Login from "./Pages/Login"
import PrivateRoute from "./utils/privateRoute"
import { useSelector, useDispatch } from 'react-redux'
import { connect,disconnect } from "./feature/user"

export function routes() {
    //@ts-ignore
    // const connected = useSelector(state => state.connectStatus.value)
    // const dispatch = useDispatch()

    // useEffect(()=>{
    //     const connected = async ()=>{
    //         const authRoute = `${import.meta.env.VITE_HOST}/users/auth`;
    //             let option = {
    //               method: 'POST',
    //               headers: {
    //                   'Authorization': `Bearer ${localStorage.getItem("ASP_AT") || ""}`,
    //                   'Content-Type': 'application/json',
    //               },
    //             } 
    //             const res = await fetch(authRoute, option);
    //             res.status === 200 ? dispatch(connect()) : dispatch(disconnect());
    //       }
    // })

    return <Routes>
            <Route path='/' element={<ModelPage/>} />
            <Route path= '/pricing' element={<PricingPage/>} />
            <Route path= '/login' element={<Login/>} />

            <Route element={<PrivateRoute />}>
                <Route path= '/profiles' element={<ProfilesPage/>} />
                
            </Route>
            <Route path= '*' element={<div className="flex justify-center items-center text-4xl font-bold h-screen"> <span> 404</span> </div>} />
    </Routes>
}