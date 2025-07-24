import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import React, { createContext, useContext, useEffect, useState } from 'react';

const USERS_PATH = FileSystem.documentDirectory + 'users.json';
const ASSET_USERS_PATH = FileSystem.bundleDirectory ? FileSystem.bundleDirectory + 'assets/data/users.json' : undefined;

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // On mount, load user from AsyncStorage
        (async () => {
            const stored = await AsyncStorage.getItem('user');
            if (stored) setUser(JSON.parse(stored));
            // Ensure users.json exists in documentDirectory
            const exists = await FileSystem.getInfoAsync(USERS_PATH);
            if (!exists.exists && ASSET_USERS_PATH) {
                await FileSystem.copyAsync({ from: ASSET_USERS_PATH, to: USERS_PATH });
            }
        })();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const users = await readUsers();
            const found = users.find((u: any) => u.email === email && u.password === password);
            if (found) {
                setUser(found);
                await AsyncStorage.setItem('user', JSON.stringify(found));
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        try {
            let users = await readUsers();
            if (users.find((u: any) => u.email === email)) return false;
            const newUser = { id: Date.now(), name, email, password };
            users.push(newUser);
            await FileSystem.writeAsStringAsync(USERS_PATH, JSON.stringify(users, null, 2));
            setUser(newUser);
            await AsyncStorage.setItem('user', JSON.stringify(newUser));
            return true;
        } catch {
            return false;
        }
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    };

    const readUsers = async () => {
        try {
            const file = await FileSystem.readAsStringAsync(USERS_PATH);
            return JSON.parse(file);
        } catch {
            // fallback to asset file if not found
            if (ASSET_USERS_PATH) {
                const file = await FileSystem.readAsStringAsync(ASSET_USERS_PATH);
                return JSON.parse(file);
            }
            return [];
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