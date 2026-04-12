import { User } from '@/types/auth.interface';

const UserTable = ({ user }: { user: User[] }) => {
    return (
        <div className="rounded-lg border border-[#042C53]/20 overflow-hidden">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-[#042C53] text-white">
                        <th className="px-4 py-3 text-left font-semibold tracking-wide">Name</th>
                        <th className="px-4 py-3 text-left font-semibold tracking-wide">Email</th>
                        <th className="px-4 py-3 text-left font-semibold tracking-wide">Role</th>
                        <th className="px-4 py-3 text-left font-semibold tracking-wide">Verified</th>
                        <th className="px-4 py-3 text-left font-semibold tracking-wide">Joined</th>
                        <th className="px-4 py-3 text-left font-semibold tracking-wide">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((u, index) => (
                        <tr
                            key={u.id}
                            className={`border-t border-[#042C53]/10 ${index % 2 === 0 ? "bg-white" : "bg-[#F1EFE8]"}`}
                        >
                            <td className="px-4 py-3 text-[#042C53] font-medium">{u.name}</td>
                            <td className="px-4 py-3 text-[#042C53]/80">{u.email}</td>
                            <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded text-xs font-bold tracking-wide
                                    ${u.role === "ADMIN"
                                        ? "bg-[#042C53] text-[#EF9F27]"
                                        : u.role === "MANAGER"
                                            ? "bg-[#EF9F27] text-[#042C53]"
                                            : "bg-[#042C53]/10 text-[#042C53]"
                                    }`}
                                >
                                    {u.role}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded text-xs font-semibold
                                    ${u.emailVerified
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {u.emailVerified ? "Verified" : "Unverified"}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-[#042C53]/70">
                                {new Date(u.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <button className="px-3 py-1.5 text-xs font-semibold rounded
                                                       border border-[#042C53] text-[#042C53]
                                                       hover:bg-[#042C53] hover:text-[#EF9F27]
                                                       transition-all duration-200 tracking-wide">
                                        Update Role
                                    </button>
                                    <button className="px-3 py-1.5 text-xs font-semibold rounded
                                                       border border-red-500 text-red-500
                                                       hover:bg-red-500 hover:text-white
                                                       transition-all duration-200 tracking-wide">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;