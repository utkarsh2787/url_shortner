import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../apis/auth';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../store/slice/authSlice';


function Register() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        avatarLink: ''
    });
    const [err, setError] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShowSnackbar(false);
        try {
            await dispatch(registerThunk({ username: form.username, email: form.email, password: form.password, avatarLink: form.avatarLink }));
        } catch (err) {
            setError(err?.response?.data?.message || err.message || 'Registration failed');
            setShowSnackbar(true);
            setTimeout(() => setShowSnackbar(false), 3000);
        }
    };
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-gray-800 border border-gray-700 flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-center text-cyan-400 mb-4">Register</h2>
                <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} required className="px-4 py-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="px-4 py-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full pr-10"
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-cyan-400"
                        onClick={() => setShowPassword((prev) => !prev)}
                        title={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c1.885 4.21 6.066 7.5 9.75 7.5 1.772 0 3.543-.5 5.02-1.477M21.75 12c-.512-1.144-1.29-2.341-2.27-3.377m-2.32-2.568C15.09 5.818 13.545 5.25 12 5.25c-1.545 0-3.09.568-4.16 1.805m8.32 0a10.45 10.45 0 0 0-2.08-1.305m-4.16 0a10.45 10.45 0 0 0-2.08 1.305m0 0A10.477 10.477 0 0 0 2.25 12m0 0c1.885 4.21 6.066 7.5 9.75 7.5 1.772 0 3.543-.5 5.02-1.477m-2.32-2.568A10.45 10.45 0 0 0 21.75 12m0 0c-.512-1.144-1.29-2.341-2.27-3.377" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c1.885 4.21 6.066 7.5 9.75 7.5 3.684 0 7.865-3.29 9.75-7.5C20.115 7.79 15.934 4.5 12.25 4.5c-1.772 0-3.543.5-5.02 1.477m-2.32 2.568A10.45 10.45 0 0 1 2.25 12m0 0c1.885 4.21 6.066 7.5 9.75 7.5 1.772 0 3.543-.5 5.02-1.477m-2.32-2.568A10.45 10.45 0 0 0 21.75 12" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            </svg>
                        )}
                    </span>
                </div>
                <input name="avatarLink" type="url" placeholder="Avatar Link (optional)" value={form.avatarLink} onChange={handleChange} className="px-4 py-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                <button type="submit" className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold text-lg shadow-md transition cursor-pointer flex items-center justify-center" disabled={loading}>
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                    ) : null}
                    {loading ? 'Loading...' : 'Register'}
                </button>
            </form>
            {showSnackbar && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-fade-in">
                    {err}
                </div>
            )}
        </div>
    );
}

export default Register;
