import axios from "axios";

const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
});

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // You can modify the response here if needed
        return response;
    },
    (error) => {
        // Handle errors globally
        // Optionally, you can show a toast or log
        // console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;