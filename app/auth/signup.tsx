import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/AuthContext';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

export default function SignupScreen({ navigation }: any) {
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        setError('');
        const success = await signup(data.name, data.email, data.password);
        if (!success) {
            setError('Signup failed. Email may already be in use.');
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-farmsmarter-light px-6">
            <Text className="text-2xl font-bold text-farmsmarter-green mb-6">Sign Up</Text>
            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                    <Input placeholder="Name" value={value} onChangeText={onChange} />
                )}
            />
            {errors.name && <Text className="text-red-500 mt-1">{errors.name.message}</Text>}
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <Input placeholder="Email" keyboardType="email-address" className="mt-4" value={value} onChangeText={onChange} />
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
            <Button label="Sign Up" onPress={handleSubmit(onSubmit)} style="mt-6" />
            <Text className="mt-4 text-farmsmarter-darkgreen">Already have an account?</Text>
            <Button label="Login" onPress={() => navigation.replace('auth/login')} style="mt-2 bg-farmsmarter-yellow text-farmsmarter-darkgreen" />
        </View>
    );
} 