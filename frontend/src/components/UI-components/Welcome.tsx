import Button from "../small-components/Button";
import { NavigateFunction, useNavigate } from "react-router-dom"

function Welcome() {
    const navigate: NavigateFunction = useNavigate();
    return <div className=" bg-zinc-500 h-screen flex justify-center items-center">
        <div className="flex flex-col rounded-lg bg-white mb-auto mt-auto shadow-lg shadow-black pt-7 pb-7 w-80 gap-4 pl-5 pr-5">
            <div className="text-center">
                Welcome to Todo Application
            </div>
            <div className="flex justify-evenly">
                <Button onClick={()=>{
                    navigate('/signin')
                }} label={"Sign In"}/>
                <Button onClick={()=>{
                    navigate('/signup')
                }} label={"Sign UP"}/>
                {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black w-full" onClick={()=>{
                    navigate('/signin')
                }}>Sign In</button>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black w-full" onClick={()=>{
                    navigate('/signup')
                }}>Sign Up</button> */}
            </div>
        </div>
    </div>;
}

export default Welcome;