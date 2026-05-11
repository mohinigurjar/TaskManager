import { createContext, useContext, useEffect, useState } from "react";
import { createUser, getMe, loginUser, logoutUser } from "../services/auth.services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // check logged-in user on app load
    const fetchUser = async () => {
        try {
            const res = await getMe(); 
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // login
    const login = async (data) => {
        const res = await loginUser({data});
        setUser(res.data.user);
        return res;
    };

    // signup
    const signup = async (data) => {
        const res = await createUser(data);
        return res;
    };

    // logout
    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    //test
    useEffect(() => {
        console.log("USER STATE: ", user)
    }, [user])

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                login,
                signup,
                logout,
                isAuthenticated: !!user,
                isAdmin: user?.role === "admin"
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
export const useAuth = () => useContext(AuthContext);