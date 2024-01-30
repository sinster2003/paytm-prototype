import { useRecoilValue, useSetRecoilState } from "recoil"
import { userAtom, userSelector } from "../atoms/userAtom"
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useRecoilValue(userSelector);
  const setUserLoggedId = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      const response = await axios.post("/api/v1/user/logout");
      const result = await response?.data;
      localStorage.removeItem("userLoggedId");
      setUserLoggedId("");
      navigate("/signin");
      toast.success(result?.message);
    }
    catch(error) {
      toast("Something went wrong");
    }
  }

  return (
    <div className="flex justify-between items-center w-full p-4 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold">Payments App</h1>
        <div className="flex gap-2 items-center">
            {user && <button className="p-3 bg-gray-300 text-slate-900 
            hover:bg-gray-500 hover:text-white rounded-md w-20 mr-2 transition ease-in-out" onClick={handleLogout}>Logout</button>}
            <p className="font-medium text-lg">Hello, {user ? user.username : "User"}</p>
            <img src={"/placeholder.png"} className="h-12 w-12"/>
        </div>
    </div>
  )
}

export default Navbar