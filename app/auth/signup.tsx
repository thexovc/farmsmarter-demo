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
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

export default function SignupScreen() {
    const router = useRouter();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        setError('');
        setLoading(true);
        try {
            const success = await signup(data.name, data.email, data.password);
            if (success) {
                Alert.alert(
                    'Success!',
                    'Account created successfully. You are now logged in.',
                    [
                        {
                            text: 'OK',
                            onPress: () => router.replace('/(tabs)/home')
                        }
                    ]
                );
            } else {
                Alert.alert(
                    'Signup Failed',
                    'Email may already be in use. Please try a different email.',
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
        <View className="flex-1 items-center justify-center bg-farmsmarter-light px-6">
            <Text className="text-2xl font-bold text-farmsmarter-green mb-6">Sign Up</Text>
            <View className="w-full gap-y-4">
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <Input placeholder="Name" className="w-full border border-gray-300 rounded-lg px-4 py-4 bg-gray-50" value={value} onChangeText={onChange} />
                    )}
                />
                {errors.name && <Text className="text-red-500 mt-1">{errors.name.message}</Text>}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <Input placeholder="Email" keyboardType="email-address" className="w-full border border-gray-300 rounded-lg px-4 py-4 bg-gray-50" value={value} onChangeText={onChange} />
                    )}
                />
                {errors.email && <Text className="text-red-500 mt-1">{errors.email.message}</Text>}
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <Input placeholder="Password" secureTextEntry className="w-full border border-gray-300 rounded-lg px-4 py-4 bg-gray-50" value={value} onChangeText={onChange} />
                    )}
                />
            </View>
            {errors.password && <Text className="text-red-500 mt-1">{errors.password.message}</Text>}
            {error ? <Text className="text-red-500 mt-2">{error}</Text> : null}

            {loading ? (
                <View className="mt-6 items-center">
                    <ActivityIndicator size="large" color="#6A8A2C" />
                    <Text className="text-farmsmarter-green mt-2">Creating account...</Text>
                </View>
            ) : (
                <Button label="Sign Up" onPress={handleSubmit(onSubmit)} style="mt-6" />
            )}

            <Text className="mt-4 text-farmsmarter-darkgreen">Already have an account?</Text>
            <TouchableOpacity onPress={() => router.replace('/auth/login')} className="mt-2 text-farmsmarter-darkgreen" >
                <Text className="text-farmsmarter-darkgreen">Login</Text>
            </TouchableOpacity>
        </View>
    );
} 