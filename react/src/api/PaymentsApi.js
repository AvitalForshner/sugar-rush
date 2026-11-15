import axios from "axios"
import { authHeader } from "./authHeader";
const BASIC_URL="http://localhost:5000/payments"
export const getAllPayments=async()=>{
    try{
        const response=await axios.get(`${BASIC_URL}/getAll`, authHeader());
        return response.data;
    }
    catch(error){
        console.error('An error occurred while fetching payments', error);
        throw new Error('לא ניתן לטעון את רשימת התשלומים');
    }
}
export const getPaymentById=async(id)=>{
    try{
        const response=await axios.get(`${BASIC_URL}/getById/${id}`, authHeader());
        return response.data;
    }
    catch(error){
        console.error(`API Error in getPaymentById for ID ${id}:`, error);
        throw new Error('לא ניתן למצוא את פרטי התשלום המבוקש');
    }
}
export const addPayment=async(paymentData)=>{
    try{
        const response=await axios.post(`${BASIC_URL}/addPayment`, paymentData, authHeader());
        return response.data;
    }
    catch(error){
        console.error('API Error in addPayment:', error);
        throw new Error("אירעה שגיאת תקשורת עם השרת, הוספת התשלום נכשלה");  
    }
}
export const updatePayment=async(id, updatedFields)=>{
    try{
        const response=await axios.put(`${BASIC_URL}/updatePayment/${id}`, updatedFields, authHeader());
        return response.data
    }
     catch(error){
        console.error(`API Error in updatePayment for ID ${id}:`, error);
        throw new Error('לא ניתן לעדכן את פרטי התשלום');
    }
}
export const deletePayment=async(id)=>{
    try{
        const response=await axios.delete(`${BASIC_URL}/deletePayment/${id}`, authHeader());
        return response.data;
    }
    catch (error) {
         console.error(`API Error in deletePayment for ID ${id}:`, error);
         throw new Error('לא ניתן למחוק את התשלום המבוקש');
    }
}