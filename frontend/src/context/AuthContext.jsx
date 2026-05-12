import { createContext, useContext, useEffect, useState } from "react";
import { createUser, getMe, loginUser, logoutUser } from "../services/auth.services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // undefined = loading, null = unauthenticated, object = authenticated
    const [user, setUser] = useState(undefined);

    // check logged-in user on app load
    const fetchUser = async () => {     
        try {
            const res = await getMe(); 
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // login
    const login = async (data) => {
        const res = await loginUser(data);
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

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
export const useAuth = () => useContext(AuthContext);