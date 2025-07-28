import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { usersData } from '../assets/data/usersdata';

interface User {
    id: number;
    name: string;
    email: string;
    password?: string; // Optional for security
}

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    logout: (onComplete?: () => void) => Promise<void>;
    getAllUsers: () => Promise<User[]>; // Helper to get all users
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const USERS_STORAGE_KEY = 'all_users';
export const CURRENT_USER_KEY = 'current_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Initialize users storage with default data if not exists
    const initializeUsers = async () => {
        try {
            const storedUsers = await AsyncStorage.getItem(USERS_STORAGE_KEY);
            if (!storedUsers) {
                // First time - save initial users data to AsyncStorage
                await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData));
            }
        } catch (error) {
            console.log('Error initializing users:', error);
        }
    };

    // Get all users from AsyncStorage
    const getAllUsersFromStorage = async (): Promise<any[]> => {
        try {
            const storedUsers = await AsyncStorage.getItem(USERS_STORAGE_KEY);
            if (storedUsers) {
                return JSON.parse(storedUsers);
            }
            return usersData; // Fallback to initial data
        } catch (error) {
            console.log('Error getting users:', error);
            return usersData;
        }
    };

    // Save users array to AsyncStorage
    const saveUsersToStorage = async (users: any[]) => {
        try {
            await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
        } catch (error) {
            console.log('Error saving users:', error);
        }
    };

    // Restore user state from AsyncStorage on app start
    useEffect(() => {
        const restoreUser = async () => {
            try {
                await initializeUsers();

                const userData = await AsyncStorage.getItem(CURRENT_USER_KEY);
                if (userData) {
                    const user = JSON.parse(userData);
                    setUser(user);
                }
            } catch (error) {
                console.log('Error restoring user state:', error);
            }
        };

        restoreUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const users = await getAllUsersFromStorage();
            const found = users.find((u: any) =>
                u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );

            if (found) {
                // Don't store password in current user session for security
                const userWithoutPassword = { ...found };
                delete userWithoutPassword.password;

                setUser(userWithoutPassword);
                await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
                return true;
            }
            return false;
        } catch (error) {
            console.log('Login error:', error);
            return false;
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        try {
            const users = await getAllUsersFromStorage();

            // Check if user already exists
            if (users.find((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
                return false;
            }

            // Create new user
            const newUser = {
                id: Date.now(),
                name,
                email,
                password
            };

            // Add to users array and save to storage
            const updatedUsers = [...users, newUser];
            await saveUsersToStorage(updatedUsers);

            // Set current user (without password)
            const { ...userWithoutPassword } = newUser;

            setUser(userWithoutPassword);
            await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

            return true;
        } catch (error) {
            console.log('Signup error:', error);
            return false;
        }
    };

    const logout = async (onComplete?: () => void) => {
        try {
            setUser(null);
            await AsyncStorage.removeItem(CURRENT_USER_KEY);
            if (onComplete) {
                onComplete();
            }
        } catch (error) {
            console.log('Logout error:', error);
        }
    };

    // Helper function to get all users (useful for admin features)
    const getAllUsers = async (): Promise<User[]> => {
        const users = await getAllUsersFromStorage();
        // Return users without passwords for security
        return users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, getAllUsers }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};