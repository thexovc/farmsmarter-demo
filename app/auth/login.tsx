import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import * as yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/AuthContext';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

export default function LoginScreen() {
    const router = useRouter();

    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        setError('');
        setLoading(true);
        try {
            const success = await login(data.email, data.password);
            if (success) {
                Alert.alert(
                    'Welcome Back!',
                    'You have successfully logged in to FarmSmarter.',
                    [
                        {
                            text: 'OK',
                            onPress: () => router.replace('/(tabs)/home')
                        }
                    ]
                );
            } else {
                Alert.alert(
                    'Login Failed',
                    'Invalid email or password. Please check your credentials and try again.',
                    [{ text: 'OK' }]
                );
            }
        } catch (error) {
            Alert.alert(
                'Error',
                'Something went wrong. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-farmsmarter-light justify-center">
            {/* Top Back Arrow */}
            <TouchableOpacity className="absolute left-4 top-10" onPress={() => router.back()}>
                <Text style={{ fontSize: 28, color: '#7A942E' }}>{'←'}</Text>
            </TouchableOpacity>

            {/* Centered Card */}
            <View className="mx-6 p-8 bg-white rounded-2xl shadow-lg gap-y-3">
                {/* Welcome Text */}
                <Text className="text-2xl font-bold text-farmsmarter-green mb-2 text-center">
                    Welcome to FarmSmarter
                </Text>
                <Text className="text-base text-gray-600 mb-6 text-center">
                    Enter your email and password to log in or create a FarmSmarter account.
                </Text>
                {/* Email Input */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Email"
                            keyboardType="email-address"
                            value={value}
                            onChangeText={onChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-4 bg-gray-50"

                        />
                    )}
                />
                {errors.email && <Text className="text-left text-red-500">{errors.email.message}</Text>}
                {/* Password Input */}
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Password"
                            secureTextEntry
                            showPasswordToggle={true}
                            value={value}
                            onChangeText={onChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-4 bg-gray-50"
                        />
                    )}
                />
                {errors.password && <Text className="text-left text-red-500">{errors.password.message}</Text>}
                {error ? <Text className="text-red-500">{error}</Text> : null}
                {/* Login Button */}
                <Button
                    label={loading ? '' : 'Login'}
                    onPress={isValid && !loading ? handleSubmit(onSubmit) : () => { }}
                    style={isValid && !loading ? "w-full bg-farmsmarter-green py-4 rounded-lg mt-4 font-bold text-lg" : "w-full bg-gray-300 py-4 rounded-lg mt-4 font-bold text-lg"}
                >
                    {loading && <ActivityIndicator size="small" color="#7A942E" />}
                </Button>

                {/* Sign Up Link */}
                <Text className="mt-4 text-farmsmarter-darkgreen">Don't have an account?</Text>
                <Text className="mt-2 text-center text-farmsmarter-green text-lg font-bold" onPress={() => router.replace('/auth/signup')}>Sign Up</Text>
                {/* Terms and Conditions */}
                <Text className="mt-6 text-center text-gray-500 text-xs">
                    By continuing you agree to FarmSmarter's{' '}
                    <Text className="text-blue-500 underline">Terms and Conditions</Text>
                </Text>
            </View>
        </View>
    );
} 