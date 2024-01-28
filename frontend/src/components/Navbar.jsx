import { useRecoilValue } from "recoil"
import { userSelector } from "../atoms/userAtom"

const Navbar = () => {
  const user = useRecoilValue(userSelector);

  console.log(user);

  return (
    <div className="flex justify-between items-center w-full p-4 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold">Payments App</h1>
        <div className="flex gap-2 items-center">
            <p className="font-medium text-lg">Hello, {user ? user.username : "User"}</p>
            <img src={"/placeholder.png"} className="h-12 w-12"/>
        </div>
    </div>
  )
}

export default Navbar