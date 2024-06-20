import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext(); // Assuming useAuthContext provides access to authUser state and setAuthUser function

    const login = async (email, password) => {
        const success = handleInputErrors({ email, password });
        if (!success) return;

        setLoading(true);
        try {
            const response = await axios.post("/api/auth/login", { email, password });
            const userData = response.data;

            localStorage.setItem("bookuser", JSON.stringify(userData)); // Store user data in localStorage
            setAuthUser(userData); // Update authUser state in context

            toast.success("Logged in successfully!");
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Failed to login");
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;

function handleInputErrors({ email, password }) {
    if (!email || !password) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return false;
    }

    return true;
}
