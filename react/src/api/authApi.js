import axios from 'axios';
const BASIC_URL = "http://localhost:5000/auth";

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${BASIC_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('API Error in login:', error);
        throw error;
    }
};

export const register = async (userData) => { 
    try {
        const response = await axios.post(`${BASIC_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error('API Error in register:', error);
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASIC_URL}/me`, {
            headers: { 
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('API Error in getCurrentUser:', error);
        throw error;
    }
};