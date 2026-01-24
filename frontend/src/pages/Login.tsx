import React, { useState } from 'react';
import { loginUser, type LoginData } from '../api/auth.api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginData>({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        try {
            const data = await loginUser(formData); 
            // This is the magic line that updates our Navbar/UserActions instantly
            login(data);
            navigate('/'); 
        } catch (err: any) {
            setErrorMsg(err.response?.data?.message || "Action failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center hero-gradient font-body p-4">
            <div className="card p-8 rounded-2xl w-full max-w-md shadow-2xl border border-[#333]">
                <h2 className="text-4xl font-display text-brand mb-2 text-center">WELCOME BACK</h2>
                <p className="text-gray-400 text-center mb-8 text-sm">Enter your credentials to access your account</p>

                {errorMsg && (
                    <div className="bg-red-900/30 border border-red-500 text-red-200 p-3 rounded-lg mb-4 text-sm text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                        <input 
                            name="email" 
                            type="email" 
                            placeholder="name@example.com" 
                            onChange={handleChange} 
                            required 
                            className="search-box p-3 rounded-lg text-white outline-none focus:border-[#ff3366] transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            placeholder="••••••••" 
                            onChange={handleChange} 
                            required 
                            className="search-box p-3 rounded-lg text-white outline-none focus:border-[#ff3366] transition-all"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn-brand glow-button py-3 mt-4 rounded-lg font-bold text-white transition-transform active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "AUTHENTICATING..." : "LOG IN"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-[#333] text-center">
                    <p className="text-gray-400 text-sm">
                        New to VenueX? <Link to="/register" className="text-brand hover:underline font-semibold">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;