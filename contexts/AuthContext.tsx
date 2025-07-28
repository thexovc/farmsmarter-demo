import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';
import { usersData } from '../assets/data/usersdata';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    logout: (onComplete?: () => void) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);


    const login = async (email: string, password: string) => {
        try {
            const users = usersData;
            const found = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
            if (found) {
                setUser(found);
                await AsyncStorage.setItem('user', JSON.stringify(found));
                return true;
            }
            return false;
        } catch (error) {
            console.log({ error });
            return false;
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        try {
            let users = usersData;
            if (users.find((u: any) => u.email === email)) return false;
            const newUser = { id: Date.now(), name, email, password };
            users.push(newUser);
            setUser(newUser);
            await AsyncStorage.setItem('user', JSON.stringify(newUser));
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        }
    };

    const logout = async (onComplete?: () => void) => {
        setUser(null);
        await AsyncStorage.removeItem('user');
        if (onComplete) {
            onComplete();
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}; 