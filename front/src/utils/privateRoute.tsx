import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { sync } from '../feature/modelList';
import { connect, disconnect } from '../feature/user';

const DEVELOP = "http://localhost:3535"
const PROD = "https://apire.vercel.app"

const PrivateRoute = () => {
  const [auth, setAuth] = useState<boolean | null>(null);
  const navigate = useNavigate()
  //@ts-ignore
  const connected = useSelector(state => state.connectStatus.value)
  const dispatch = useDispatch()
  // useEffect(() => {
  //   setTimeout(()=>{
  //     connected ? setAuth(true) : setAuth(false);
  //   },2000)
  // }, []);

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
        setAuth(true)
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
          syncModel()
          setAuth(true)
        }
        else{
          dispatch(disconnect())
        }
      }
      syncModel()
      // connected()
      
    },[])

  if (auth === null) {
    return <div>Loading...</div>;
  }

  console.log(auth);
  

  return auth || connected ? <Outlet /> : <Navigate to="/" replace />

};

export default PrivateRoute