import {getUserFromLocalStorage} from "./localStorage";

const authHeader = () => {
    return {
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "x-requested-with": "XMLHttpRequest",
            "authorization": `Bearer ${getUserFromLocalStorage()?.token}`,
        },
    };
};
export default authHeader;
