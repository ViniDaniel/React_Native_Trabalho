import { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthUser } from "../types/user";

type AuthContextData = {
    user: AuthUser | null;
    login: (user: AuthUser) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<AuthUser | null>(null)

    useEffect(() => {
        async function loadUser() {
            const stored = await AsyncStorage.getItem("user");
            if (stored) setUser(JSON.parse(stored))
        }
        loadUser()
    }, [])
    
    async function login(user: AuthUser) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        setUser(user)

        
    }
    async function logout() {
        await AsyncStorage.removeItem("user");
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
        
    )

}