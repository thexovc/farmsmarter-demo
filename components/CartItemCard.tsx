import { Image, Text, View } from 'react-native';
import Button from './Button';

interface CartItemCardProps {
    item: {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    };
    onRemove: () => void;
}

export default function CartItemCard({ item, onRemove }: CartItemCardProps) {
    return (
        <View className="flex-row items-center bg-white rounded-xl shadow p-3 mb-3">
            <Image source={{ uri: item.image }} className="w-16 h-16 rounded-lg mr-3" />
            <View className="flex-1">
                <Text className="text-farmsmarter-green font-bold text-base">{item.name}</Text>
                <Text className="text-farmsmarter-darkgreen">₦{item.price.toFixed(2)} x {item.quantity}</Text>
            </View>
            <Button label="Remove" onPress={onRemove} style="bg-red-500 ml-2" />
        </View>
    );
} 