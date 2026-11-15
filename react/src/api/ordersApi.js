import axios from "axios";
import { authHeader, serverMessage } from "./authHeader";

const BASIC_URL = "http://localhost:5000/orders";

export const getAllOrders = async () => {
    try {
        const response = await axios.get(`${BASIC_URL}/getAll`, authHeader());
        return response.data;
    }
    catch (error) {
        console.error('An error occurred while fetching orders', error);
        throw new Error(serverMessage(error, 'לא ניתן לטעון את רשימת ההזמנות'));
    }
};

export const getMyOrders = async () => {
    try {
        const response = await axios.get(`${BASIC_URL}/myOrders`, authHeader());
        return response.data;
    }
    catch (error) {
        console.error('An error occurred while fetching my orders', error);
        throw new Error(serverMessage(error, 'לא ניתן לטעון את ההזמנות שלך'));
    }
};

export const getOrderById = async (id) => {
    try {
        const response = await axios.get(`${BASIC_URL}/getById/${id}`, authHeader());
        return response.data;
    }
    catch (error) {
        console.error(`API Error in getOrderById for ID ${id}:`, error);
        throw new Error(serverMessage(error, 'לא ניתן למצוא את פרטי ההזמנה המבוקשת'));
    }
};

export const addOrder = async (orderData) => {
    try {
        const response = await axios.post(`${BASIC_URL}/addOrder`, orderData, authHeader());
        return response.data;
    }
    catch (error) {
        console.error('API Error in addOrder:', error);
        throw new Error(serverMessage(error, "אירעה שגיאת תקשורת עם השרת, הוספת ההזמנה נכשלה"));
    }
};

export const updateOrder = async (id, updatedFields) => {
    try {
        const response = await axios.put(`${BASIC_URL}/updateOrder/${id}`, updatedFields, authHeader());
        return response.data;
    }
    catch (error) {
        console.error(`API Error in updateOrder for ID ${id}:`, error);
        throw new Error(serverMessage(error, 'לא ניתן לעדכן את פרטי ההזמנה'));
    }
};

export const deleteOrder = async (id) => {
    try {
        const response = await axios.delete(`${BASIC_URL}/deleteOrder/${id}`, authHeader());
        return response.data;
    }
    catch (error) {
        console.error(`API Error in deleteOrder for ID ${id}:`, error);
        throw new Error(serverMessage(error, 'לא ניתן למחוק את ההזמנה המבוקשת'));
    }
};

// המוצרים הנמכרים ביותר (ציבורי)
export const getBestSellers = async (limit = 4) => {
    try {
        const response = await axios.get(`${BASIC_URL}/bestSellers?limit=${limit}`);
        return response.data;
    }
    catch (error) {
        console.error('API Error in getBestSellers:', error);
        throw new Error('לא ניתן לטעון את המוצרים הנמכרים ביותר');
    }
};
