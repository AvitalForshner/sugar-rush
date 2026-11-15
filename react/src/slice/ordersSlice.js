import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMyOrders, getOrderById, addOrder, updateOrder as updateOrderApi, deleteOrder } from "../api/ordersApi";

const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    success: false
};

// ההזמנות של המשתמש המחובר
export const fetchAllOrders = createAsyncThunk("orders/fetchAll", async (_, { rejectWithValue }) => {
    try { return await getMyOrders(); }
    catch (error) { return rejectWithValue(error.message); }
});

export const fetchOrderById = createAsyncThunk("orders/fetchById", async (orderId, { rejectWithValue }) => {
    try { return await getOrderById(orderId); }
    catch (error) { return rejectWithValue(error.message); }
});

export const addNewOrder = createAsyncThunk("orders/add", async (orderData, { rejectWithValue }) => {
    try { return await addOrder(orderData); }
    catch (error) { return rejectWithValue(error.message); }
});

export const updateOrder = createAsyncThunk("orders/update", async ({ id, updateFields }, { rejectWithValue }) => {
    try { return await updateOrderApi(id, updateFields); }
    catch (error) { return rejectWithValue(error.message); }
});

export const removeOrder = createAsyncThunk("orders/delete", async (id, { rejectWithValue }) => {
    try { await deleteOrder(id); return id; }
    catch (error) { return rejectWithValue(error.message); }
});

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        resetOrdersStatus: (state) => {
            state.error = null;
            state.success = false;
        },
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // טעינת כל ההזמנות
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // הזמנה לפי ID
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentOrder = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // הוספת הזמנה
            .addCase(addNewOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.orders.unshift(action.payload);
            })
            .addCase(addNewOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // עדכון הזמנה
            .addCase(updateOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const updated = action.payload;
                const index = state.orders.findIndex(o => o._id === updated._id);
                if (index !== -1) state.orders[index] = updated;
                if (state.currentOrder && state.currentOrder._id === updated._id) {
                    state.currentOrder = updated;
                }
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // מחיקת הזמנה
            .addCase(removeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.orders = state.orders.filter(o => o._id !== action.payload);
            })
            .addCase(removeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { resetOrdersStatus, clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;