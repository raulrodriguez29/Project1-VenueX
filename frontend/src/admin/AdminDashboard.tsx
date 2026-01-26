import { useEffect, useState } from 'react';
import api from '../api/axios.config';
import Navbar from "../components/navbar/Navbar";
import type { User } from '../types/User';

const AdminDashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/admin/users');
                console.log("Admin Data Fetch Successful:");
                console.table(response.data); // This makes debugging the response easy!
                setUsers(response.data);
            } catch (err: any) {
                console.error("Admin Fetch Error:", err);
                setError(err.response?.data?.message || "Unauthorized or Server Error");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

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