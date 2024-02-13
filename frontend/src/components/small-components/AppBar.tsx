import { useNavigate } from "react-router-dom";

function AppBar({user}) {
    const navigate = useNavigate()
  return (
    <div className="flex justify-between border items-center shadow pl-5 pr-5 h-16">
      <div className="text-2xl font-bold text-black text-center">
        Payment App
      </div>
      <div className="flex">
        <button
          type="button"
          className="text-white hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-slate-400 mr-2"
          onClick={()=>{
            localStorage.removeItem("token");
            navigate('/')
          }}
        >
          Sign Out
        </button>
        <div className="rounded-full bg-purple-800 h-12 w-12 flex flex-col justify-center text-center text-2xl text-white">
          {user.firstname.charAt(0)}
        </div>
      </div>
    </div>
  );
}

export default AppBar;
