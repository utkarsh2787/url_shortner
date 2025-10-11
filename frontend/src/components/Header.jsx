import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';

function Header() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <header className="w-full bg-gray-900 py-4 px-8 flex justify-between items-center shadow-lg">
            <Link to="/" className="text-2xl font-bold text-cyan-400 drop-shadow">URL Shortner</Link>
            <div className="flex gap-4">
                {!user ? (
                    <>
                        <Link to="/login" className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold transition cursor-pointer">Login</Link>
                        <Link to="/register" className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-cyan-200 font-semibold transition cursor-pointer">Register</Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white font-semibold transition cursor-pointer"
                    >
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
