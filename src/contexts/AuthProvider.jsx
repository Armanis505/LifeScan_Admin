import { useContext, createContext, useState } from "react";

const isLogin = localStorage.getItem("isLogin");

const AuthContext = createContext({
    isAuthenticated: false,
});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(isLogin);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);