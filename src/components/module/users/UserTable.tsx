"use client";
import { deleteAndRestoreUser } from '@/actions/auth.actions';
import { User } from '@/types/auth.interface';
import { Trash2, ShieldCheck, Mail, Calendar, Users, Crown, UserCog, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const roleConfig: Record<string, {
    label: string;
    icon: React.ReactNode;
    className: string;
}> = {
    ADMIN: {
        label: "Admin",
        icon: <Crown className="h-3 w-3" />,
        className: "bg-[#042C53] text-[#EF9F27] border-[#042C53]/80 shadow-sm",
    },
    MANAGER: {
        label: "Manager",
        icon: <UserCog className="h-3 w-3" />,
        className: "bg-[#EF9F27] text-[#042C53] border-[#EF9F27]/80 shadow-sm",
    },
    USER: {
        label: "Guest",
        icon: <Users className="h-3 w-3" />,
        className: "bg-[#042C53]/8 text-[#042C53]/60 border-[#042C53]/15",
    },
};

const UserTable = ({ user }: { user: User[] }) => {
    const handleDeleteRestore = async (id: string) => {
        const tosatId = toast.loading("Processing...");
        try {
            const data = await deleteAndRestoreUser(id);
            if (!data.success) {
                toast.error(data.message || "Failed to delete/restore user", { id: tosatId });
            }
            toast.success(data.message || "User updated successfully", { id: tosatId });
        } catch (error) {
            toast.error("Something went wrong", { id: tosatId });
        }
    }
    return (
        <div className="rounded-xl border border-[#042C53]/15 overflow-hidden shadow-lg">

            {/* Table Header */}
            <div className="bg-[#042C53] px-6 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-white font-bold text-lg tracking-wide">User Management</h2>
                    <p className="text-[#EF9F27]/80 text-xs tracking-wider mt-0.5">
                        {user.length} total users
                    </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-[#EF9F27]/20 flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4 text-[#EF9F27]" />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-[#042C53]/5 border-b border-[#042C53]/10">
                            <th className="px-6 py-4 text-left text-xs font-bold text-[#042C53]/50 uppercase tracking-widest">User</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-[#042C53]/50 uppercase tracking-widest">Role</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-[#042C53]/50 uppercase tracking-widest">Email Status</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-[#042C53]/50 uppercase tracking-widest">Joined</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-[#042C53]/50 uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#042C53]/8">
                        {user.map((u) => {
                            const role = roleConfig[u.role] ?? roleConfig["USER"];
                            return (
                                <tr
                                    key={u.id}
                                    className="bg-white hover:bg-[#F1EFE8]/60 transition-colors duration-150"
                                >
                                    {/* User Info */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-[#042C53] flex items-center justify-center flex-shrink-0 shadow-md">
                                                {u.image ? (
                                                    <img
                                                        src={u.image}
                                                        alt={u.name}
                                                        className="h-9 w-9 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-[#EF9F27] font-bold text-sm">
                                                        {u.name.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#042C53] tracking-wide">
                                                    {u.name}
                                                </p>
                                                <p className="text-[#042C53]/50 text-xs flex items-center gap-1 mt-0.5">
                                                    <Mail className="h-3 w-3" />
                                                    {u.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Role */}
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider border ${role.className}`}>
                                            {role.icon}
                                            {role.label}
                                        </span>
                                    </td>

                                    {/* Email Status */}
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border
                                            ${u.emailVerified
                                                ? "bg-[#042C53]/6 text-[#042C53] border-[#042C53]/15"
                                                : "bg-[#EF9F27]/15 text-amber-600 border-[#EF9F27]/30"
                                            }`}
                                        >
                                            <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0
                                                ${u.emailVerified ? "bg-[#042C53]" : "bg-[#EF9F27]"}`}
                                            />
                                            {u.emailVerified ? "Verified" : "Pending"}
                                        </span>
                                    </td>

                                    {/* Joined */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-[#042C53]/50">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span className="text-xs">
                                                {new Date(u.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold rounded-xl
                                                               border border-[#042C53]/20 text-[#042C53] bg-[#042C53]/5
                                                               hover:bg-[#042C53] hover:text-[#EF9F27] hover:border-[#042C53]
                                                               transition-all duration-200 tracking-wide shadow-sm hover:shadow-md">
                                                <ShieldCheck className="h-3.5 w-3.5" />
                                                Update Role
                                            </button>

                                            {u.isDeleted ? (
                                                <button onClick={()=>handleDeleteRestore(u.id)} className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold rounded-xl
                                                                   border border-green-200 text-green-500 bg-green-50
                                                                   hover:bg-green-500 hover:text-white hover:border-green-500
                                                                   transition-all duration-200 tracking-wide shadow-sm hover:shadow-md">
                                                    <RotateCcw className="h-3.5 w-3.5" />
                                                    Restore
                                                </button>
                                            ) : (
                                                <button onClick={()=>handleDeleteRestore(u.id)} className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold rounded-xl
                                                                   border border-red-200 text-red-400 bg-red-50
                                                                   hover:bg-red-500 hover:text-white hover:border-red-500
                                                                   transition-all duration-200 tracking-wide shadow-sm hover:shadow-md">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="bg-[#042C53]/5 border-t border-[#042C53]/10 px-6 py-3">
                <p className="text-xs text-[#042C53]/40 tracking-wide">
                    Showing {user.length} of {user.length} users
                </p>
            </div>
        </div>
    );
};

export default UserTable;