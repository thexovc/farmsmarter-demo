import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextProps {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        (async () => {
            const stored = await AsyncStorage.getItem('cart');
            if (stored) setCart(JSON.parse(stored));
        })();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const exists = prev.find(i => i.id === item.id);
            if (exists) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(i => i.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}; 