import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { LogIn, Mail, Lock, ChevronRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success('Welcome back!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: '60px', height: '60px', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--primary)' }}>
                        <LogIn size={28} />
                    </div>
                    <h2 style={{ fontSize: '1.75rem' }}>Account Login</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Access your personalized dashboard.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Mail size={14} /> Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@example.com"
                        />
                    </div>
                    <div className="input-group" style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Lock size={14} /> Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={loading}>
                        {loading ? 'Authenticating...' : (
                            <>
                                Sign In <ChevronRight size={18} />
                            </>
                        )}
                    </button>
                </form>
                <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        New to the platform? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Create Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
