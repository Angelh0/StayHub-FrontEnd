import axios from "axios";

export const apiAccommodation = axios.create({
    baseURL: "http://localhost:8080/api/v1",
});

export const apiReservation = axios.create({
    baseURL: "http://localhost:8081/api/v1",
});

export const apiUser = axios.create({
    baseURL: "http://localhost:8083/api/v1",
});

const getToken = (config) => {
    const token = localStorage.getItem("stayhub_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}

apiAccommodation.interceptors.request.use(getToken);
apiReservation.interceptors.request.use(getToken);
apiUser.interceptors.request.use(getToken);