import React from "react";
import { useAuth } from "../context/AuthProvider"; // Import the auth context hook
import { useNavigate } from "react-router-dom"; // To redirect after logout

const Header: React.FC = () => {
    const { user, logout } = useAuth(); // Access user and logout function
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout(); // Call logout function from the context
            navigate("/login"); // Redirect to login page after logout
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <header className="bg-gray-800 text-white p-4 sticky top-0 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Quiz App</h1>
                <nav>
                    <ul className="flex space-x-4 items-center">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/about" className="hover:underline">About</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                        {user ? ( // Show logout button if user is logged in
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                >
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <li><a href="/login" className="hover:underline">Login</a></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
