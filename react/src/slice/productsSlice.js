import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, getProductsByCategory, getProductById, addProduct, updateProduct as updateProductApi, deleteProduct } from "../api/productsApi";

const initialState = {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    success: false
};

// כל המוצרים, או מוצרים של קטגוריה מסוימת אם נשלח categoryId
export const fetchAllProducts = createAsyncThunk("products/fetchAll", async (categoryId, { rejectWithValue }) => {
    try { return categoryId ? await getProductsByCategory(categoryId) : await getAllProducts(); }
    catch (error) { return rejectWithValue(error.message); }
});

export const fetchProductById = createAsyncThunk("products/fetchById", async (productId, { rejectWithValue }) => {
    try { return await getProductById(productId); }
    catch (error) { return rejectWithValue(error.message); }
});

export const addNewProduct = createAsyncThunk("products/add", async (productData, { rejectWithValue }) => {
    try { return await addProduct(productData); }
    catch (error) { return rejectWithValue(error.message); }
});

export const updateProduct = createAsyncThunk("products/update", async ({ id, updateFields }, { rejectWithValue }) => {
    try { return await updateProductApi(id, updateFields); }
    catch (error) { return rejectWithValue(error.message); }
});

export const removeProduct = createAsyncThunk("products/delete", async (id, { rejectWithValue }) => {
    try { await deleteProduct(id); return id; }
    catch (error) { return rejectWithValue(error.message); }
});

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        resetProductStatus: (state) => {
            state.error = null;
            state.success = false;
        },
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // טעינת כל המוצרים
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // מוצר לפי ID
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentProduct = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // הוספת מוצר
            .addCase(addNewProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.products.push(action.payload);
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // עדכון מוצר
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const updated = action.payload;
                const index = state.products.findIndex(p => p._id === updated._id);
                if (index !== -1) state.products[index] = updated;
                if (state.currentProduct && state.currentProduct._id === updated._id) {
                    state.currentProduct = updated;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // מחיקת מוצר
            .addCase(removeProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.products = state.products.filter(p => p._id !== action.payload);
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { resetProductStatus, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;