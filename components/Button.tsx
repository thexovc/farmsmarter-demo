import { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';

export default function Button({ label, onPress, style = "", children }: { label: string; onPress: () => void; style?: string; children?: ReactNode }) {
    return (
        <Pressable
            className={`bg-farmsmarter-green rounded-lg px-6 py-3 items-center ${style}`}
            onPress={onPress}
        >
            {children ? children : <Text className="text-white text-base font-semibold">{label}</Text>}
        </Pressable>
    );
} 