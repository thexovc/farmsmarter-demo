import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import Button from '../components/Button';

export default function OnboardingScreen() {
    const route = useRoute();
    // @ts-ignore
    const setOnboarded = route.params?.setOnboarded;

    const navigateToLogin = () => {
        router.navigate("/auth/login");
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