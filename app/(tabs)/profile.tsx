import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen() {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout(() => {
            router.replace('/auth/login');
        });
    };

    return (
        <View className="flex-1 items-center justify-center bg-farmsmarter-light px-6">
            <Text className="text-3xl font-bold text-farmsmarter-green mb-4">Profile</Text>
            {user && (
                <>
                    <Text className="text-lg text-farmsmarter-darkgreen mb-2">Name: {user.name}</Text>
                    <Text className="text-lg text-farmsmarter-darkgreen mb-6">Email: {user.email}</Text>
                </>
            )}
            <Button label="Logout" onPress={handleLogout} style="bg-red-500" />
        </View>
    );
} 