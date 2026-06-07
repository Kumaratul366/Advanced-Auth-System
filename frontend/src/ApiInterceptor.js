import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

api.interceptors.response.use(

    (response) => response,

    async (error) => {
        
        if (!error.response) {
           return Promise.reject(error);
        }

        const originalRequest = error.config;

        if (
            error.response?.status === 403 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/api/logout") &&
            !originalRequest.url.includes("/api/refresh")
        ) {

            originalRequest._retry = true;

            try {

                await api.post("/api/refresh");

                return api(originalRequest);

            } catch (refreshError) {

                console.log("Refresh token expired");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;