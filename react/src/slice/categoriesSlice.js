import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategories, getCategoryById, addCategory, updateCategoryDetails, deleteCategory } from "../api/categoriesApi";

const initialState = {
    categories: [],
    currentCategory: null,
    loading: false,
    error: null,
    success: false
};

export const fetchAllCategories = createAsyncThunk("categories/fetchAll", async (_, { rejectWithValue }) => {
    try { return await getAllCategories(); }
    catch (error) { return rejectWithValue(error.message); }
});

export const fetchCategoryById = createAsyncThunk("categories/fetchById", async (categoryId, { rejectWithValue }) => {
    try { return await getCategoryById(categoryId); }
    catch (error) { return rejectWithValue(error.message); }
});

export const addNewCategory = createAsyncThunk("categories/add", async (categoryData, { rejectWithValue }) => {
    try { return await addCategory(categoryData); }
    catch (error) { return rejectWithValue(error.message); }
});

export const updateCategory = createAsyncThunk("categories/update", async ({ id, updateFields }, { rejectWithValue }) => {
    try { return await updateCategoryDetails(id, updateFields); }
    catch (error) { return rejectWithValue(error.message); }
});

export const removeCategory = createAsyncThunk("categories/delete", async (id, { rejectWithValue }) => {
    try { await deleteCategory(id); return id; }
    catch (error) { return rejectWithValue(error.message); }
});

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        resetCategoryStatus: (state) => {
            state.error = null;
            state.success = false;
        },
        clearCurrentCategory: (state) => {
            state.currentCategory = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // טעינת כל הקטגוריות
            .addCase(fetchAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // קטגוריה לפי ID
            .addCase(fetchCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentCategory = null;
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentCategory = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // הוספת קטגוריה
            .addCase(addNewCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.categories.push(action.payload);
            })
            .addCase(addNewCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // עדכון קטגוריה
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const updated = action.payload;
                const index = state.categories.findIndex(c => c._id === updated._id);
                if (index !== -1) state.categories[index] = updated;
                if (state.currentCategory && state.currentCategory._id === updated._id) {
                    state.currentCategory = updated;
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // מחיקת קטגוריה
            .addCase(removeCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.categories = state.categories.filter(c => c._id !== action.payload);
            })
            .addCase(removeCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { resetCategoryStatus, clearCurrentCategory } = categorySlice.actions;
export default categorySlice.reducer;