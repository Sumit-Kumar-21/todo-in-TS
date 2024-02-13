import Button from '../small-components/Button'
import Heading from '../small-components/Heading'
import SubHeading from '../small-components/SubHeading'
import InputBox from '../small-components/InputBox'
import ButtonWarning from '../small-components/ButtonWarning'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function SignIn() {

    const [password, setPassword]=useState('')
    const [username, setUsername]=useState('')
    const navigate = useNavigate();

    return <div className="flex justify-center bg-zinc-500 bg-auto h-screen">
        <div className="flex flex-col rounded-lg bg-white mb-auto mt-auto shadow-lg shadow-black pt-7 pb-7 w-80 gap-4 pl-5 pr-5">
            <div className="flex gap-2 flex-col">
                <Heading label={"Sign In"}/>
                <SubHeading label={"Enter your credentials to create an account"} />
            </div>
            
            <InputBox type={"email"} onChange={e=>{
                setUsername(e.target.value)
            }} label={"Email"} placeholder={"Enter e-mail here"}/>
            <InputBox type={"password"} onChange={e=>{
                setPassword(e.target.value)
            }} label={"Password"} placeholder={"Enter password here"}/>

            <div className="flex flex-col">
                <Button onClick={async()=>{
                    await axios.post("http://localhost:3000/api/v1/user/signin", {
                        username: username,
                        password: password
                    }).then(function (res) {
                        localStorage.setItem("token", `Bearer ${res.data.token}`);
                        navigate('/dashboard');
                    })
                    .catch(function (error) {
                        console.log(error);
                        
                        alert("Error 400:Invalid UserName/Password");
                    });
                }} label={"Sign In"} />
                <ButtonWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={'/signup'}/>
            </div>
        </div>
    </div>;
}

export default SignIn;