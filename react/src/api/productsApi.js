import { API_URL } from "./config";
import axios from "axios";
import { authHeader } from "./authHeader";
const BASE_URL = `${API_URL}/products`;

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getAll`);
        return response.data;
    } catch (error) {
        console.error('An error occurred while fetching products', error);
        throw new Error('לא ניתן לטעון את רשימת המוצרים');
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/getById/${id}`);
        return response.data;
    } catch (error) {
        console.error(`API Error in getProductById for ID ${id}:`, error);
        throw new Error('לא ניתן למצוא את פרטי המוצר המבוקש');
    }
};

export const getProductsByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${BASE_URL}/getByCategory/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error(`API Error in getProductsByCategory for ID ${categoryId}:`, error);
        throw error;
    }
};

export const addProduct = async (productData) => {
    try {
        const response = await axios.post(`${BASE_URL}/addProduct`, productData, authHeader());
        return response.data;
    } catch (error) {
        console.error('API Error in addProduct:', error);
        throw new Error("אירעה שגיאת תקשורת עם השרת, הוספת המוצר נכשלה");  
    }
};

export const updateProduct = async (id, updatedFields) => {
    try {
        const response = await axios.put(`${BASE_URL}/updateProduct/${id}`, updatedFields, authHeader());
        return response.data;
    } catch (error) {
        console.error(`API Error in updateProduct for ID ${id}:`, error);
        throw new Error('לא ניתן לעדכן את פרטי המוצר');
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/deleteProduct/${id}`, authHeader());
        return response.data;
    } catch (error) {
         console.error(`API Error in deleteProduct for ID ${id}:`, error);
         throw new Error('לא ניתן למחוק את המוצר המבוקש');
    }
};
// מוצרים שנמחקו (מנהל בלבד)
export const getInactiveProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getInactive`, authHeader());
        return response.data;
    } catch (error) {
        console.error('API Error in getInactiveProducts:', error);
        throw new Error('לא ניתן לטעון את המוצרים שנמחקו');
    }
};
