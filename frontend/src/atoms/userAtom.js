import axios from "axios";
import { atom, selector } from "recoil";

const userAtom = atom({
    key: "userAtom",
    default: JSON.parse(localStorage.getItem("userLoggedId"))
})

const userSelector = selector({
    key: "userSelector",
    get: async ({get}) => {
        const response = await axios.get(`/api/v1/user/${get(userAtom)}`);
        const result = response?.data;
        return result;
    }
})

export {userAtom, userSelector};