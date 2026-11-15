
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, getCurrentUser } from '../api/authApi';
const savedUser = localStorage.getItem('user');

const initialState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    isAuthenticated: savedUser ? true : false,
    loading: false,
    error: null,
};
export const currentUser = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
    try {
        const data = await getCurrentUser();
       
        if (data && data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }
       
        return data;
    }
    catch (error){
        return rejectWithValue(error.message);
    }
});

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const data = await login(credentials);
       
        if (data.token) localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
       
        return data;
    } catch (error) { return rejectWithValue(error.response?.data?.message || "אירעה שגיאה, נסו שוב"); }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const data = await register(userData);
       
        if (data.token) localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
       
        return data;
    } catch (error) { return rejectWithValue(error.response?.data?.message || "אירעה שגיאה, נסו שוב"); }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem("token");
            localStorage.removeItem('user');
        },
        setInitialUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        })
        .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
       
        .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        })
        .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
       
        .addCase(currentUser.pending, (state) => { state.loading = true; })
        .addCase(currentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        })
        .addCase(currentUser.rejected, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        });
    }
});

export const { logout, setInitialUser } = authSlice.actions;
export default authSlice.reducer;