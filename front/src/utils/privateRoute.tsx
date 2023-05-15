import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"

const PrivateRoute = () => {
  const [auth, setAuth] = useState<boolean | null>(null);
  const navigate = useNavigate()
  //@ts-ignore
  const connected = useSelector(state => state.connectStatus.value)
  useEffect(() => {
    connected ? setAuth(true) : setAuth(false);
  }, []);

  if (auth === null) {
    return <div>Loading...</div>;
  }

  console.log(auth);
  

  return auth ? <Outlet /> : <Navigate to="/Login" replace />

};

export default PrivateRoute