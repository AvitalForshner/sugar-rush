import { API_URL } from "./config";
import axios from "axios"
import { authHeader } from "./authHeader";

const BASIC_URL=`${API_URL}/categories`

export const getAllCategories = async()=>{
    try{
        const response = await axios.get(`${BASIC_URL}/getAll`);
        return response.data;   
    } 
    catch(error){ 
        console.error('An error occurred while fetching categories', error);
        throw new Error('לא ניתן לטעון את רשימת הקטגוריות');
    }
}

export const getCategoryById = async (id) =>{
    try{
        const response = await axios.get(`${BASIC_URL}/getById/${id}`);
        return response.data;
    }
    catch(error){
        console.error(`API Error in getCategoryById for ID ${id}:`, error);
        throw new Error('לא ניתן למצוא את פרטי הקטגוריה המבוקשת');
    }
}

export const addCategory = async (categoryData) =>{
    try{
        const response = await axios.post(`${BASIC_URL}/addCategory`, categoryData, authHeader());
        return response.data;
    }
    catch(error){
        console.error('API Error in addCategory:', error);
        throw new Error("אירעה שגיאת תקשורת עם השרת, הוספת הקטגוריה נכשלה");  
    }
}

export const updateCategoryDetails = async(id, updatedFields) => {
    try{
        const response = await axios.put(`${BASIC_URL}/updateCategory/${id}`, updatedFields, authHeader());
        return  response.data;
    } 
    catch(error){
        console.error(`API Error in updateCategory for ID ${id}:`, error);
        throw new Error('לא ניתן לעדכן את פרטי הקטגוריה');
    }
}

export const deleteCategory = async(id) => {
    try{
        const response = await axios.delete(`${BASIC_URL}/deleteCategory/${id}`, authHeader());
        return response.data;
    }
    catch (error) {
         console.error(`API Error in deleteCategory for ID ${id}:`, error);
         throw new Error('לא ניתן למחוק את הקטגוריה המבוקשת');
    }
}