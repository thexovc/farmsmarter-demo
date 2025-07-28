import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface InputProps extends TextInputProps {
    showPasswordToggle?: boolean;
    className?: string;
}

export default function Input({ showPasswordToggle, secureTextEntry, className, ...props }: InputProps) {
    const [visible, setVisible] = useState(false);
    const isPassword = !!secureTextEntry;
    return (
        <View style={{ position: 'relative', width: '100%' }}>
            <TextInput
                className={className || "w-full border-2 border-farmsmarter-green rounded-lg px-4 py-3 text-base text-farmsmarter-darkgreen bg-white"}
                placeholderTextColor="#6A8A2C"
                secureTextEntry={isPassword ? !visible : secureTextEntry}
                {...props}
            />
            {isPassword && (
                <TouchableOpacity
                    onPress={() => setVisible(v => !v)}
                    style={{ position: 'absolute', right: 16, top: '50%', transform: [{ translateY: -12 }] }}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name={visible ? 'eye-off' : 'eye'} size={22} color="#6A8A2C" />
                </TouchableOpacity>
            )}
        </View>
    );
} 