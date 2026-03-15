import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="logo">FinTech</div>
            <div className="nav-links">
                {user ? (
                    <>
                        <NavLink to="/" end>Dashboard</NavLink>
                        <NavLink to="/transfer">Send Money</NavLink>
                        <NavLink to="/statement">Statement</NavLink>
                        <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Signup</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
