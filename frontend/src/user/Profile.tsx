import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { changePassword, deleteUser, getUserById } from '../api/user.api';
import type { User } from '../types/User';
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { useAuth } from '../auth/AuthContext';
import { updateUser } from '../api/auth.api';

const Profile = () => {
    const { id } = useParams(); 
    const { login } = useAuth();
    //All states must be at the top

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ 
        firstName: '', 
        lastName: '', 
        phone: '', 
        email: '' 
    });
    const { logout } = useAuth(); // Make sure logout is pulled from useAuth
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getUserById(Number(id)).then(data => {
                setUser(data);
                setFormData({ 
                    firstName: data.firstName, 
                    lastName: data.lastName, 
                    phone: data.phone || '',
                    email: data.email 
                });
                setLoading(false);
            });
        }
    }, [id]);



    const handleSave = async () => {
        try {
            const response = await updateUser(Number(id), formData);
            
            // Manually update the token in localStorage so future API calls work
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('email', response.email);
                localStorage.setItem('firstName', response.firstName);
                localStorage.setItem('lastName', response.lastName);
                localStorage.setItem('phone', response.phone);
            }

            // Call login with JUST the user data (one argument)
            // Ensure the keys match our User interface
            login({
                id: response.id,
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                phone: response.phone,
                role: response.role 
            });

            setUser(response); // Update local state
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Update failed", error);
            alert("Failed to update profile.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading...</div>;
    if (!user) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">User not found.</div>;

    // Helper for initials to keep the JSX clean
    const initials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`;

    // Edit password functionality
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const saveNewPassword = async () => {
        // Basic Validation
        if (!passwordData.currentPassword || !passwordData.newPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }

        if (passwordData.newPassword.length < 6) {
            alert("New password must be at least 6 characters long.");
            return;
        }

        try {
            // Call the API
            await changePassword(Number(id), passwordData);
        
            //  Success!
            alert("Password updated successfully!");
            setIsChangingPassword(false);
            
            // Clear the fields for security
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            console.error("Password update failed:", error);
            // This will catch if the "currentPassword" was wrong on the backend
            alert(error.response?.data?.message || "Failed to update password. Is your current password correct?");
        }
    };

    
    // Delete account 
    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action is permanent and cannot be undone."
        );

        if (confirmed) {
            try {
                await deleteUser(Number(id));
                alert("Your account has been successfully deleted.");
                
                // Clear the session
                logout(); 
                
                // Send them to the landing page or login
                navigate('/'); 
            } catch (error: any) {
                console.error("Delete failed:", error);
                alert(error.response?.data?.message || "Failed to delete account. Please try again.");
            }
        }
    };

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
                                        
                                    </div>
                                    <p className="text-gray-400 font-medium mt-1">@{user.email.split('@')[0]}</p>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 -mt-4">
                                {/* FIRST NAME - Only visible or editable if needed, but let's add them for full control */}
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-xs text-pink-500 font-bold uppercase tracking-widest mb-1">First Name</p>
                                    {isEditing ? (
                                        <input 
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="bg-transparent border-b border-pink-500/50 outline-none w-full text-gray-200 focus:border-pink-500 transition-colors"
                                        />
                                    ) : (
                                        <p className="text-gray-200">{user.firstName}</p>
                                    )}
                                </div>

                                {/* LAST NAME */}
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-xs text-pink-500 font-bold uppercase tracking-widest mb-1">Last Name</p>
                                    {isEditing ? (
                                        <input 
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="bg-transparent border-b border-pink-500/50 outline-none w-full text-gray-200 focus:border-pink-500 transition-colors"
                                        />
                                    ) : (
                                        <p className="text-gray-200">{user.lastName}</p>
                                    )}
                                </div>

                                {/* EMAIL */}
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-xs text-pink-500 font-bold uppercase tracking-widest mb-1">Email Address</p>
                                    {isEditing ? (
                                        <input 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="bg-transparent border-b border-pink-500/50 outline-none w-full text-gray-200 focus:border-pink-500 transition-colors"
                                        />
                                    ) : (
                                        <p className="text-gray-200">{user.email}</p>
                                    )}
                                </div>

                                {/* PHONE */}
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-xs text-pink-500 font-bold uppercase tracking-widest mb-1">Phone Number</p>
                                    {isEditing ? (
                                        <input 
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="bg-transparent border-b border-pink-500/50 outline-none w-full text-gray-200 focus:border-pink-500 transition-colors"
                                        />
                                    ) : (
                                        <p className="text-gray-200">{user.phone || 'Not provided'}</p>
                                    )}
                                </div>
                            </div>
                            
                            {isChangingPassword && (
                                <div className="mt-4 p-6 bg-white/5 rounded-2xl border border-pink-500/20 animate-in fade-in duration-300">
                                    <h3 className="text-lg font-bold mb-4 text-pink-500">Change Password</h3>
                                    <div className="space-y-4">
                                        <input 
                                            type="password" 
                                            name="currentPassword"
                                            placeholder="Current Password"
                                            onChange={handlePasswordChange}
                                            className="w-full bg-[#0a0a0a] border border-white/10 p-3 rounded-xl outline-none focus:border-pink-500"
                                        />
                                        <input 
                                            type="password" 
                                            name="newPassword"
                                            placeholder="New Password"
                                            onChange={handlePasswordChange}
                                            className="w-full bg-[#0a0a0a] border border-white/10 p-3 rounded-xl outline-none focus:border-pink-500"
                                        />
                                        <input 
                                            type="password" 
                                            name="confirmPassword"
                                            placeholder="Confirm New Password"
                                            onChange={handlePasswordChange}
                                            className="w-full bg-[#0a0a0a] border border-white/10 p-3 rounded-xl outline-none focus:border-pink-500"
                                        />
                                        <div className="flex gap-2">
                                            <button onClick={saveNewPassword} className="flex-1 py-3 bg-pink-500 font-bold rounded-xl">Update Password</button>
                                            <button onClick={() => setIsChangingPassword(false)} className="px-6 py-3 bg-white/10 rounded-xl">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Simple Action Buttons */}
                            {!isChangingPassword && (
                                <div className="flex flex-col gap-3 mt-8">
                                    <div className="flex gap-4">
                                        {isEditing ? (
                                            <>
                                                <button onClick={handleSave} className="flex-1 py-4 bg-green-600 text-white font-bold rounded-xl">Save Changes</button>
                                                <button onClick={() => setIsEditing(false)} className="flex-1 py-4 bg-white/10 text-white font-bold rounded-xl">Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => setIsEditing(true)} className="flex-1 py-4 bg-white text-black font-bold rounded-xl hover:bg-pink-500 hover:text-white transition-all">
                                                    Edit Profile
                                                </button>
                                                <button onClick={() => setIsChangingPassword(true)} className="flex-1 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                                                    Change Password
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                                    
                                {/* Danger Zone */}
                                <button 
                                    onClick={handleDeleteAccount}
                                    className="w-full py-3 mt-2 text-red-500 text-sm font-semibold hover:bg-red-600 hover:text-white rounded-xl transition-all border border-red-500/20 hover:border-red-600 shadow-sm hover:shadow-red-500/20"
                                    >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            <Footer />
        </>
    );
};

export default Profile;