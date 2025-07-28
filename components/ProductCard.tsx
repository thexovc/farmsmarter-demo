import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../contexts/CartContext';
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
    const { getCartItemCount, updateQuantity } = useCart();
    const currentQuantity = getCartItemCount(product.id);

    const handleAddToCart = () => {
        onAddToCart();
        Alert.alert(
            'Added to Cart!',
            `${product.name} has been added to your cart.`,
            [{ text: 'OK' }]
        );
    };

    const handleQuantityChange = (increment: boolean) => {
        const newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;
        if (newQuantity <= product.stock) {
            updateQuantity(product.id, newQuantity);
        }
    };

    return (
        <View className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex-1" style={{ minHeight: 200 }}>
            <Image source={{ uri: product.image }} className="w-full h-24 rounded-lg mb-2" resizeMode="cover" />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>
                    <Text className="text-farmsmarter-green font-bold text-lg mb-1" numberOfLines={2} style={{ minHeight: 44 }}>{product.name}</Text>
                    <Text className="text-farmsmarter-darkgreen mb-1">₦{product.price.toFixed(2)}</Text>
                    <Text className="text-xs text-gray-500 mb-2">Stock: {product.stock}</Text>
                </View>
                <View style={{ marginTop: 'auto' }}>
                    {currentQuantity > 0 ? (
                        <View className="flex-row items-center justify-between bg-gray-100 rounded-lg p-2">
                            <TouchableOpacity
                                onPress={() => handleQuantityChange(false)}
                                className="w-8 h-8 bg-farmsmarter-orange rounded-full items-center justify-center"
                            >
                                <Ionicons name="remove" size={16} color="white" />
                            </TouchableOpacity>
                            <Text className="text-farmsmarter-green font-bold">{currentQuantity}</Text>
                            <TouchableOpacity
                                onPress={() => handleQuantityChange(true)}
                                disabled={currentQuantity >= product.stock}
                                className={`w-8 h-8 rounded-full items-center justify-center ${currentQuantity >= product.stock ? 'bg-gray-300' : 'bg-farmsmarter-orange'}`}
                            >
                                <Ionicons name="add" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Button label="Add to Cart" onPress={handleAddToCart} style="bg-farmsmarter-orange" />
                    )}
                </View>
            </View>
        </View>
    );
}