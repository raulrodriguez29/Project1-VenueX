import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../api/user.api';
import type { User } from '../types/User';
// Import your components here
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getUserById(Number(id))
                .then(data => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading...</div>;
    if (!user) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">User not found.</div>;

    // Helper for initials to keep the JSX clean
    const initials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`;

    return (
        <>
            <Navbar />
            
            <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-4 flex flex-col justify-between">
                <div className="max-w-3xl mx-auto w-full">
                    
                    {/* Profile Card */}
                    <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                        
                        {/* Top Banner Decor */}
                        <div className="h-32 bg-gradient-to-r from-[#ff3366] to-[#ff6699] opacity-80" />

                        <div className="px-8 pb-8">
                            {/* Avatar & Header Section */}
                            <div className="relative -top-12 flex flex-col items-start gap-4">
                                
                                {/* Avatar with Initials */}
                                <div className="w-24 h-24 bg-pink-500 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xl border-4 border-[#111] transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                                    {initials || "?"}
                                </div>

                                <div className="mt-2 w-full">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h1 className="text-4xl font-black tracking-tight capitalize">
                                            {user.firstName} {user.lastName}
                                        </h1>
                                        
                                        <span className="bg-pink-500/10 text-pink-500 px-3 py-1 rounded-full text-xs font-bold border border-pink-500/20">
                                            PRO MEMBER
                                        </span>
                                    </div>
                                    <p className="text-gray-400 font-medium mt-1">@{user.email.split('@')[0]}</p>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 -mt-4">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-xs text-pink-500 font-bold uppercase tracking-widest mb-1">Email Address</p>
                                    <p className="text-gray-200">{user.email}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-xs text-pink-500 font-bold uppercase tracking-widest mb-1">Phone Number</p>
                                    <p className="text-gray-200">{user.phone || 'Not provided'}</p>
                                </div>
                            </div>

                            {/* Simple Action Buttons */}
                            <div className="flex flex-col gap-3 mt-8">
                                <div className="flex gap-4">
                                    <button className="flex-1 py-4 bg-white text-black font-bold rounded-xl hover:bg-pink-500 hover:text-white transition-all duration-300">
                                        Edit Profile
                                    </button>
                                    <button className="flex-1 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/20 transition-all">
                                        Change Password
                                    </button>
                                </div>
                                    
                                {/* Danger Zone */}
                                <button className="w-full py-3 mt-2 text-red-500 text-sm font-semibold hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Profile;