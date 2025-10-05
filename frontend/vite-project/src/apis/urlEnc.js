import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
export const createShortUrl = async (url) => {
    const data = await axiosInstance.post('/api/create', { url: url });
    return data.data;
}