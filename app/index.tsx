import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Button from '../components/Button';
import { CURRENT_USER_KEY } from '../contexts/AuthContext';

export default function OnboardingScreen() {
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(true);
    // @ts-ignore
    const setOnboarded = route.params?.setOnboarded;

    useEffect(() => {
        checkLoginState();
    }, []);

    const checkLoginState = async () => {
        try {
            const userData = await AsyncStorage.getItem(CURRENT_USER_KEY);
            if (userData) {
                // User is already logged in, redirect to home
                router.replace('/(tabs)/home');
            } else {
                // No user data, show onboarding
                setIsLoading(false);
            }
        } catch (error) {
            console.log('Error checking login state:', error);
            setIsLoading(false);
        }
    };

    const navigateToLogin = () => {
        router.navigate("/auth/login");
    }

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-farmsmarter-light">
                <ActivityIndicator size="large" color="#6A8A2C" />
                <Text className="text-farmsmarter-green mt-4">Loading...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 items-center justify-center bg-farmsmarter-light px-6">
            {/* Logo Placeholder */}
            <View className="mb-8">
                <Text className="text-4xl font-bold text-farmsmarter-green">FarmSmarter</Text>
            </View>
            <Text className="text-lg text-center text-farmsmarter-darkgreen mb-8">
                Welcome to FarmSmarter! Shop fresh farm products and manage your cart with ease.
            </Text>
            {/* <Button label="Get Started" onPress={() => setOnboarded && setOnboarded(true)} /> */}
            <Button label="Get Started" onPress={() => navigateToLogin()} />
        </View>
    );
} 