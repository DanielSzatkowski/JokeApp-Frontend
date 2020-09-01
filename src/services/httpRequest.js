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

const axiosUploadImage = axios.create({
    baseURL: "http://localhost:8443",
    headers: {
        //"Content-Type": "multipart/form-data"
    }
});

export { axiosRegistration };
export { axiosUploadImage };