import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom'
import useGetUser from "../hooks/useGetUser";
import TodoMain from "./TodoMain";

function DashBoard() {

    const {user, verify} =useGetUser()
    const [loading, setLoading]= useState<boolean>(true)

    useEffect(()=>{
      if (verify!==undefined) {
        setLoading(false)
      }  
    },[verify])
  
    if (loading) {
      return <div></div>
    }

  return (
    <>
    {verify? <TodoMain />:<Navigate to="/"/>}
    </>
    
  );
}
export default DashBoard;
