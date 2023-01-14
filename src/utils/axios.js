import axios from "axios";

const proxyURL = "http://localhost:8080"
const customFetch = axios.create({
    baseURL: proxyURL,
});
export default customFetch;
