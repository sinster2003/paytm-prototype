import axios from "axios";
import { atomFamily, selectorFamily } from "recoil";

const userInfoFamily = atomFamily({
    key: "userInfoFamily",
    default: selectorFamily({
        key: "userInfoSelectorFamily",
        get: (user_id) => async () => {
            const response = await axios.get(`/api/v1/user/${user_id}`);
            return response?.data;
        }
    })
});

export default userInfoFamily;