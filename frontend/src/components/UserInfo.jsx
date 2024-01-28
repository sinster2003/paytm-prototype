import { useNavigate } from "react-router-dom"
import UserInfoBar from "./UserInfoBar";

const UserInfo = () => {

    const navigate = useNavigate();
    const handleSend = () => {
        navigate("/transfer")
    }

  return (
    <div className={`flex justify-between items-center border-b-2 border-gray-300 my-4 pb-4`}>
        <UserInfoBar />
        <button className="bg-slate-800 text-gray-100 p-2 rounded-md" onClick={handleSend}>Send Money</button>
    </div>
  )
}

export default UserInfo