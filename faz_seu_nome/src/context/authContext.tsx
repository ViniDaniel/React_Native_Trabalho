import { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
    user: string | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<string | null>(null)

    useEffect(() => {
        async function loadUser() {
            const storedUser = await AsyncStorage.getItem("user");
            setUser(storedUser)
        }
        loadUser()
    }, [])
    
    async function login() {
        await AsyncStorage.setItem("user", "logado");
        setUser("logado")

        
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