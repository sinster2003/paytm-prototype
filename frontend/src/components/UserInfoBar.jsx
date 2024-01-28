import { useRecoilValue } from "recoil";
import userInfoFamily from "../atoms/userInfo";

const UserInfoBar = ({userId}) => {
  const userInfo = useRecoilValue(userInfoFamily(userId));

  return (
    <div className="flex gap-3 items-center">
        <img src="/placeholder.png" className="h-12 w-12"/>
        <p className="font-bold text-lg">{userInfo?.username}</p>
    </div>
  )
}

export default UserInfoBar