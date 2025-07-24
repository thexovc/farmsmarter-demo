import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/AuthContext';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

export default function LoginScreen({ navigation }: any) {
    const { login } = useAuth();
    const [error, setError] = useState('');
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        setError('');
        const success = await login(data.email, data.password);
        if (!success) {
            setError('Invalid email or password');
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-farmsmarter-light px-6">
            <Text className="text-2xl font-bold text-farmsmarter-green mb-6">Login</Text>
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <Input placeholder="Email" keyboardType="email-address" value={value} onChangeText={onChange} />
                )}
            />
            {errors.email && <Text className="text-red-500 mt-1">{errors.email.message}</Text>}
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <Input placeholder="Password" secureTextEntry className="mt-4" value={value} onChangeText={onChange} />
                )}
            />
            {errors.password && <Text className="text-red-500 mt-1">{errors.password.message}</Text>}
            {error ? <Text className="text-red-500 mt-2">{error}</Text> : null}
            <Button label="Login" onPress={handleSubmit(onSubmit)} style="mt-6" />
            <Text className="mt-4 text-farmsmarter-darkgreen">Don't have an account?</Text>
            <Button label="Sign Up" onPress={() => navigation.replace('auth/signup')} style="mt-2 bg-farmsmarter-yellow text-farmsmarter-darkgreen" />
        </View>
    );
} 