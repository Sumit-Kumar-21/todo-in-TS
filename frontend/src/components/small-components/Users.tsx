import { useEffect, useState } from "react";
import Button from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom"

function Users({userid}) {
    const [users, setUser]=useState([]);

    const [search, setSearch]= useState('')

    useEffect(()=>{
        const debounce = setTimeout(() => {
            value()
        }, 500);
        
        return () => clearTimeout(debounce);
    },[search])
    
    const value = async()=>{
        await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${search}`)
        .then((res)=>{
            setUser(res.data.user)
        })
    }
    const handleSearch = (e)=>{
        setSearch(e.target.value)
    }

    return <div className="pl-7 pr-7 gap-3 flex flex-col mt-3">
        <div className="font-bold text-xl">Users</div>
        <input type="text" placeholder="Search users..." onChange={handleSearch} className="border rounded shadow-lg w-full p-2 border-slate-200" />

        {users.map((user)=> {return user._id!=userid && <User key={user._id} user={user}/>})}

    </div>;
}

function User({user}){
    const navigate = useNavigate()
    const fullname = `${user.firstname} ${user.lastname}`
    return <div className="mt-10 flex justify-between">
        <div className="flex gap-3 items-center">
            <div className="rounded-full bg-slate-500 h-12 w-12 flex justify-center items-center">{user.firstname.charAt(0)}</div>
            <div className="font-bold text-lg">{fullname}</div>
        </div>
        <Button onClick={()=>{
            navigate(`/send?Uid=${user._id}&name=${fullname}`)
        }} label={"Send Money"}/>
    </div>
}

export default Users;