import { Pressable, Text } from 'react-native';

export default function Button({ label, onPress, style = "" }: { label: string; onPress: () => void; style?: string }) {
    return (
        <Pressable
            className={`bg-farmsmarter-green rounded-lg px-6 py-3 items-center ${style}`}
            onPress={onPress}
        >
            <Text className="text-white text-base font-semibold">{label}</Text>
        </Pressable>
    );
} 