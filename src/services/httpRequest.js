import axios from "axios"

export default axios.create({
    baseURL: "http://localhost:8443/api",
    headers: {
        "Content-type": "application/json"
    }
});

const axiosRegistration = axios.create({
    baseURL: "http://localhost:8443",
    headers: {
        "Content-type": "application/json"
    }
});

export const axiosRegistration;