import { Alert, FlatList, Text, View } from 'react-native';
import Button from '../../components/Button';
import CartItemCard from '../../components/CartItemCard';
import { useCart } from '../../contexts/CartContext';

export default function CartScreen() {
    const { cart, removeFromCart, clearCart, total } = useCart();

    const handlePurchase = () => {
        if (cart.length === 0) return;
        Alert.alert('Success', 'Purchase completed!', [
            { text: 'OK', onPress: clearCart }
        ]);
    };

    return (
        <View className="flex-1 bg-farmsmarter-light px-4 pt-4">
            <Text className="text-xl font-bold text-farmsmarter-green mb-2">Your Cart</Text>
            <FlatList
                data={cart}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <CartItemCard item={item} onRemove={() => removeFromCart(item.id)} />
                )}
                ListEmptyComponent={<Text className="text-farmsmarter-darkgreen mt-8 text-center">Your cart is empty.</Text>}
                contentContainerStyle={{ paddingBottom: 16 }}
            />
            <View className="mt-4">
                <Text className="text-lg font-semibold text-farmsmarter-green mb-2">Total: ₦{total.toFixed(2)}</Text>
                <Button label="Purchase" onPress={handlePurchase} style="bg-farmsmarter-orange" />
            </View>
        </View>
    );
} 