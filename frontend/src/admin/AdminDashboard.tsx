import { useEffect, useState } from 'react';
import api from '../api/axios.config';
import Navbar from "../components/navbar/Navbar";
import type { User } from '../types/User';

const AdminDashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                                        <th className="p-5">First Name</th> {/* Split */}
                                        <th className="p-5">Last Name</th>  {/* Split */}
                                        <th className="p-5">Email Address</th>
                                        <th className="p-5">Phone</th>
                                        <th className="p-5 text-right">Control</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-white/[0.03] transition-colors group">
                                            <td className="p-5 text-gray-500 font-mono text-sm">#{u.id}</td>
                                            
                                            {/* Separate columns for names */}
                                            <td className="p-5 font-semibold text-gray-200">{u.firstName}</td>
                                            <td className="p-5 font-semibold text-gray-200">{u.lastName}</td>
                                            
                                            <td className="p-5 text-gray-400">{u.email}</td>
                                            <td className="p-5 text-gray-400">
                                                {u.phone || <span className="opacity-30">---</span>}
                                            </td>
                                            <td className="p-5 text-right">
                                                <button className="text-xs font-bold text-gray-400 group-hover:text-pink-500 transition-colors uppercase tracking-widest">
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
            </div>
        </>
    );
};

export default AdminDashboard;