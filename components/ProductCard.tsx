import { Image, Text, View } from 'react-native';
import Button from './Button';

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
        stock: number;
    };
    onAddToCart: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <View className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex-1">
            <Image source={{ uri: product.image }} className="w-full h-24 rounded-lg mb-2" resizeMode="cover" />
            <Text className="text-farmsmarter-green font-bold text-lg mb-1">{product.name}</Text>
            <Text className="text-farmsmarter-darkgreen mb-1">₦{product.price.toFixed(2)}</Text>
            <Text className="text-xs text-gray-500 mb-2">Stock: {product.stock}</Text>
            <Button label="Add to Cart" onPress={onAddToCart} style="bg-farmsmarter-orange" />
        </View>
    );
}