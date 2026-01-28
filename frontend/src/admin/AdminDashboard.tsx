import { useEffect, useState } from 'react';
import api from '../api/axios.config';
import Navbar from "../components/navbar/Navbar";
import type { User } from '../types/User';

const AdminDashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [menuUser, setMenuUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    // Function to transition from Choice Menu to Edit Form
    const handleEditClick = () => {
        if (!menuUser) return;
        setEditForm({
            firstName: menuUser.firstName,
            lastName: menuUser.lastName,
            email: menuUser.email,
            phone: menuUser.phone || ''
        });
        setIsEditing(true);
        // We keep menuUser set so we know WHO we are editing, 
        // but we'll show the form instead of the choice buttons.
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!menuUser) return;

        try {
            const response = await api.put(`/user/${menuUser.id}`, editForm); 
            const updatedUser = response.data;

            // Update the table locally
            setUsers(prev => prev.map(u => 
                u.id === menuUser.id ? {
                    ...u,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    phone: updatedUser.phone
                } : u
            ));
            
            setMenuUser(null);
            setIsEditing(false);
            console.log("Admin update successful");
        } catch (err: any) {
            console.error("Update error:", err);
            alert(err.response?.data?.message || "Check console for 404/405 error");
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
        try {
            await api.delete(`/user/${id}`);
            setUsers(prev => prev.filter(user => user.id !== id));
            setMenuUser(null);
            console.log("User deleted successfully");
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete user.");
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            // Only show the full-page loading spinner on the first load
            // For subsequent searches, we might want a smaller loading indicator
            if (searchTerm === "") setLoading(true); 

            try {
                // DYNAMIC URL: If there is a search term, use the search endpoint
                const url = searchTerm 
                    ? `/admin/users/search?query=${encodeURIComponent(searchTerm)}` 
                    : '/admin/users';

                const response = await api.get(url);
                setUsers(response.data);
                setError(null); // Clear errors if the fetch succeeds
            } catch (err: any) {
                console.error("Admin Fetch Error:", err);
                setError(err.response?.data?.message || "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        // DEBOUNCE: Don't hammer the server on every keystroke
        const delayDebounceFn = setTimeout(() => {
            fetchUsers();
        }, 400); 

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]); // <--- Adding this makes the effect run every time the user types

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Loading Admin Data...</div>;

    if (error) return (
        <div className="min-h-screen bg-[#0a0a0a] text-red-500 flex flex-col items-center justify-center">
            <p className="text-xl font-bold">Error: {error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 text-white underline">Retry</button>
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-10">
                        <h1 className="text-4xl font-black tracking-tight italic uppercase">User Management</h1>
                        <p className="text-gray-500 mt-2">Total Users: {users.length}</p>
                    </header>

                    <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                        {/* Search Bar Container */}
                        <div className="mb-8 max-w-md">
                            <div className="relative group">
                                {/* Search Icon */}
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500 group-focus-within:text-pink-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                {/* The Input - This is where 'searchTerm' and 'setSearchTerm' are used */}
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchTerm} // <--- Value is read here
                                    onChange={(e) => setSearchTerm(e.target.value)} // <--- Value is updated here
                                    className="w-full bg-[#111] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all border-white/5 hover:border-white/20"
                                />

                                {/* Clear Button - only shows when there is text */}
                                {searchTerm && (
                                    <button 
                                        onClick={() => setSearchTerm("")}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                                    >
                                        <span className="text-xs font-bold uppercase tracking-tighter">Clear</span>
                                    </button>
                                )}
                            </div>
                            
                            {/* Optional: Results count indicator */}
                            {searchTerm && !loading && (
                                <p className="text-xs text-gray-500 mt-2 ml-2">
                                    Found {users.length} results for "{searchTerm}"
                                </p>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-pink-500 text-xs uppercase tracking-[0.2em] font-bold">
                                        <th className="p-5">ID</th>
                                        <th className="p-5">First Name</th> 
                                        <th className="p-5">Last Name</th>  
                                        <th className="p-5">Email Address</th>
                                        <th className="p-5">Phone</th>
                                        <th className="p-5 text-right">Control</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-white/[0.03] transition-colors group">
                                            <td className="p-5 text-gray-500 font-mono text-sm">#{u.id}</td>
                                            <td className="p-5 font-semibold text-gray-200">{u.firstName}</td>
                                            <td className="p-5 font-semibold text-gray-200">{u.lastName}</td>
                                            <td className="p-5 text-gray-400">{u.email}</td>
                                            <td className="p-5 text-gray-400">{u.phone || <span className="opacity-30">---</span>}</td>
                                            <td className="p-5 text-right">
                                                <button 
                                                    onClick={() => setMenuUser(u)}
                                                    className="text-xs font-bold text-gray-400 hover:text-pink-500 transition-colors uppercase tracking-widest px-3 py-1 rounded-md border border-white/5 hover:border-pink-500/30"
                                                >
                                                    Manage
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {menuUser && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => { setMenuUser(null); setIsEditing(false); }} />
                        
                        <div className="relative bg-[#111] border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-6">
                                {isEditing ? 'Edit User Details' : 'Manage User'}
                            </h3>

                            {isEditing ? (
                                /* THE EDIT FORM */
                                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase ml-1">First Name</label>
                                        <input 
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
                                            value={editForm.firstName}
                                            onChange={e => setEditForm({...editForm, firstName: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase ml-1">Last Name</label>
                                        <input 
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
                                            value={editForm.lastName}
                                            onChange={e => setEditForm({...editForm, lastName: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase ml-1">Email Address</label>
                                        <input 
                                            type="email"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
                                            value={editForm.email}
                                            onChange={e => setEditForm({...editForm, email: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase ml-1">Phone Number</label>
                                        <input 
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
                                            value={editForm.phone}
                                            onChange={e => setEditForm({...editForm, phone: e.target.value})}
                                        />
                                    </div>
                                    
                                    <div className="flex gap-3 mt-4">
                                        <button type="submit" className="flex-1 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-bold transition-colors">
                                            Save Changes
                                        </button>
                                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 bg-white/5 text-gray-400 rounded-xl hover:text-white transition-colors">
                                            Back
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                /* THE INITIAL CHOICE MENU */
                                <div className="flex flex-col gap-3">
                                    <button onClick={handleEditClick} className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold border border-white/10 transition-all hover:scale-[1.02]">
                                        Edit Profile Details
                                    </button>
                                    <button onClick={() => handleDelete(menuUser.id)} className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-semibold border border-red-500/20 transition-all hover:scale-[1.02]">
                                        Delete Account
                                    </button>
                                    <button onClick={() => setMenuUser(null)} className="mt-4 text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors">
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminDashboard;