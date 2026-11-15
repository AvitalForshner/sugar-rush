import axios from "axios"
import { authHeader, serverMessage } from "./authHeader";
const BASIC_URL="http://localhost:5000/users"
export const getAllUsers=async()=>{
    try{
        const response=await axios.get(`${BASIC_URL}/getAll`, authHeader());
        return response.data;
    }
    catch(error){
        console.error('An error occurred while fetching users', error);
        throw new Error('לא ניתן לטעון את רשימת המשתמשים');
    }
}
export const getUserById=async(id)=>{
    try{
        const response=await axios.get(`${BASIC_URL}/getById/${id}`, authHeader());
        return response.data;
    }
    catch(error){
        console.error(`API Error in getUserById for ID ${id}:`, error);
        throw new Error('לא ניתן למצוא את פרטי המשתמש המבוקש');
    }
}
export const addUser=async(userData)=>{
    try{
        const response=await axios.post(`${BASIC_URL}/addUser`, userData, authHeader());
        return response.data;
    }
    catch(error){
        console.error('API Error in addUser:', error);
        throw new Error("אירעה שגיאת תקשורת עם השרת, הוספת המשתמש נכשלה");  
    }
}
export const updateUser=async(id, updatedFields)=>{
    try{
        const response=await axios.put(`${BASIC_URL}/updateUser/${id}`, updatedFields, authHeader());
        return response.data
    }
     catch(error){
        console.error(`API Error in updateUser for ID ${id}:`, error);
        throw new Error(serverMessage(error, 'לא ניתן לעדכן את פרטי המשתמש'));
    }
}
export const deleteUser=async(id)=>{
    try{
        const response=await axios.delete(`${BASIC_URL}/deleteUser/${id}`, authHeader());
        return response.data;
    }
    catch (error) {
         console.error(`API Error in deleteUser for ID ${id}:`, error);
         throw new Error('לא ניתן למחוק את המשתמש המבוקש');
    }
}