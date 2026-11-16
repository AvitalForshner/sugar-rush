import { API_URL } from "./config";
import axios from "axios"
import { authHeader } from "./authHeader";
const BASIC_URL=`${API_URL}/shoppingCarts`
export const getAllShoppingCarts=async()=>{
    try{
        const response=await axios.get(`${BASIC_URL}/getAll`, authHeader());
        return response.data;
    }
    catch(error){
        console.error('An error occurred while fetching ShoppingCarts', error);
        throw new Error('לא ניתן לטעון את רשימת סלי הקנייה');
    }
}
export const getShoppingCartById=async(id)=>{
    try{
        const response=await axios.get(`${BASIC_URL}/getById/${id}`, authHeader());
        return response.data;
    }
    catch(error){
        console.error(`API Error in getShoppingCartById for ID ${id}:`, error);
        throw new Error('לא ניתן למצוא את פרטי סל הקנייה המבוקש');
    }
}
export const addShoppingCart=async(shoppingCartData)=>{
    try{
        const response=await axios.post(`${BASIC_URL}/addShoppingCart`, shoppingCartData, authHeader());
        return response.data;
    }
    catch(error){
        console.error('API Error in addShoppingCart:', error);
        throw new Error("אירעה שגיאת תקשורת עם השרת, הוספת סל הקנייה נכשלה");  
    }
}
export const updateShoppingCart=async(id, updatedFields)=>{
    try{
        const response=await axios.put(`${BASIC_URL}/updateShoppingCart/${id}`, updatedFields, authHeader());
        return response.data
    }
     catch(error){
        console.error(`API Error in updateShoppingCart for ID ${id}:`, error);
        throw new Error('לא ניתן לעדכן את פרטי סל הקנייה');
    }
}
export const deleteShoppingCart=async(id)=>{
    try{
        const response=await axios.delete(`${BASIC_URL}/deleteShoppingCart/${id}`, authHeader());
        return response.data;
    }
    catch (error) {
         console.error(`API Error in deleteShoppingCart for ID ${id}:`, error);
         throw new Error('לא ניתן למחוק את סל הקנייה המבוקש');
    }
}