import React, { useEffect } from 'react'
import './App.css'
import {routes} from './Routes'
import { useSelector, useDispatch } from 'react-redux'
import { connect,disconnect } from "./feature/user"
import { sync } from './feature/modelList'

function App() {
  //@ts-ignore
  const connected = useSelector(state => state.connectStatus.value)
  const dispatch = useDispatch()
  const DEVELOP = "http://localhost:3535"
  const PROD = "https://apire.vercel.app"

  //ADMIN_SPECIAL_KEY
  useEffect(()=>{

    const syncModel = async ()=>{
      const authRoute = `${PROD}/models/all`;
      // const dispatch = useDispatch()
      let options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("ASP_AT") || ""}`,
            'accept': 'application/json',
      'Content-Type': 'application/json',
        },
      } 
      const res = await fetch(authRoute, options);
      const data = await res.json() as {content:any[]}
      if (res.status == 200){
        // console.log("=>",data);
        
        dispatch(sync(data.content))
       
      }
      
    }

      const connected = async ()=>{
        const authRoute = `${PROD}/users/auth`;
        let options = {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem("ASP_AT") || ""}`,
              'accept': 'application/json',
            'Content-Type': 'application/json',
          },
        } 
        const res = await fetch(authRoute, options);
        if(res.status == 200){
          
          dispatch(connect())
        }
        else{
          dispatch(disconnect())
        }
      }
      syncModel()
      connected()
      
    },[])
  

  return (
    <>
    {routes()}
    </>
  )
}

export default App
