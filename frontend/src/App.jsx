import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import SendMoney from './pages/SendMoney';
import Statement from './pages/Statement';

import { Toaster } from 'sonner';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Toaster position="top-center" richColors theme="dark" />
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/transfer"
                            element={
                                <ProtectedRoute>
                                    <SendMoney />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/statement"
                            element={
                                <ProtectedRoute>
                                    <Statement />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
