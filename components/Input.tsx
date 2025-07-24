import { TextInput, TextInputProps } from 'react-native';

export default function Input(props: TextInputProps) {
    return (
        <TextInput
            className="w-full border border-farmsmarter-green rounded-lg px-4 py-3 text-base text-farmsmarter-darkgreen bg-white"
            placeholderTextColor="#6A8A2C"
            {...props}
        />
    );
} 