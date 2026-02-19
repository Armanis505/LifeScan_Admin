import { useContext, createContext, useState, useEffect, use } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);