import React, { useEffect } from 'react'
import './App.css'
import {routes} from './Routes'
import { useSelector, useDispatch } from 'react-redux'
import { connect,disconnect } from "./feature/user"

function App() {
    //@ts-ignore
    const connected = useSelector(state => state.connectStatus.value)
    const dispatch = useDispatch()

    useEffect(()=>{
        const connected = async ()=>{
          const authRoute = `${import.meta.env.VITE_HOST}/users/auth`;
              let option = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("ASP_AT") || ""}`,
                    'Content-Type': 'application/json',
                },
              } 
              const res = await fetch(authRoute, option);
              res.status === 200 ? dispatch(connect()) : dispatch(disconnect());
        }

        connected()
    })
  

  return (
    <>
    {routes()}
    </>
  )
}

export default App
