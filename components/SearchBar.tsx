import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';

export default function SearchBar({ value, onChangeText }: { value: string; onChangeText: (text: string) => void }) {
    return (
        <View className="flex-row items-center bg-white rounded-lg px-3 py-2 mb-3 shadow">
            <Ionicons name="search" size={20} color="#6A8A2C" />
            <TextInput
                className="flex-1 ml-2 text-base text-farmsmarter-darkgreen"
                placeholder="Search products..."
                placeholderTextColor="#6A8A2C"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
} 