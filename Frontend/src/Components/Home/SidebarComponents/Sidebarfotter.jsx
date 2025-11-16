import React, { useState } from "react";
import { useUser } from "./../../../Context/UserContext";
import { FiSettings, FiLogOut } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SidebarFooter = () => {
    const { user, setUser } = useUser();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/auth/logout",
                {},
                { withCredentials: true }
            );

            setUser(null);
            navigate("/login", { replace: true });
            window.location.reload();

        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    if (!user) return null;

    const firstname = user.fullname?.firstname || "";
    const lastname = user.fullname?.lastname || "";
    const fullName = `${firstname} ${lastname}`.trim();
    const avatarLetter = firstname.charAt(0).toUpperCase();

    return (
        <div className="relative p-3 border-t border-gray-700">

            {/* FOOTER BUTTON */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
            >
                <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center font-semibold">
                    {avatarLetter}
                </div>

                <div className="flex flex-col items-start">
                    <span className="text-sm text-white font-semibold">
                        {fullName}
                    </span>
                    <span className="text-xs text-gray-400">
                        {user.email}
                    </span>
                </div>
            </button>

            {open && (
                <div className="
                    fixed bottom-20 left-4
                    w-64 bg-[#1e1f22]
                    rounded-lg shadow-xl
                    border border-gray-700
                    z-[9999]
                ">
                    <div className="p-3 border-b border-gray-700">
                        <p className="text-gray-300">{user.email}</p>
                    </div>

                    <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-700 text-gray-300 text-sm">
                        <FiSettings size={16} /> Settings
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-700 text-red-400 text-sm"
                    >
                        <FiLogOut size={16} /> Log out
                    </button>
                </div>
            )}

        </div>
    );
};

export default SidebarFooter;
