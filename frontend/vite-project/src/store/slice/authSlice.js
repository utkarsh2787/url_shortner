import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../../apis/auth';
// Async thunks
export const loginThunk = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const user = await loginUser(email, password);
    return user;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || err.message || 'Login failed');
  }
});

export const registerThunk = createAsyncThunk('auth/register', async ({ username, email, password, avatarLink }, { rejectWithValue }) => {
  try {
    const user = await registerUser(username, email, password, avatarLink);
    return user;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || err.message || 'Registration failed');
  }
});

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || 'Login failed';
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || 'Registration failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
