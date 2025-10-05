import axiosInstance from "../utils/axiosInstance";

export const loginUser = async (email, password) => {
    const response = await axiosInstance.post('/api/auth/login', { email, password }, { withCredentials: true });
    return response.data;
}

export const registerUser = async (username, email, password, avatarLink) => {
    const response = await axiosInstance.post(
        '/api/auth/register',
        { username, email, password, avatarLink },
        { withCredentials: true }
    );
    return response.data;
};