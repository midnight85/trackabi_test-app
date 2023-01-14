import axios from "axios";

const proxyURL = "https://corsanywhereproxy.up.railway.app"
const customFetch = axios.create({
    baseURL: proxyURL,
});
export default customFetch;
