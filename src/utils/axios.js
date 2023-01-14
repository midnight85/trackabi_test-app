import axios from "axios";

const proxyURL = "https://cors-anywhere.herokuapp.com"
const customFetch = axios.create({
    baseURL: proxyURL,
});
export default customFetch;
