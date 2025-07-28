
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { productsData } from '../../assets/data/productsdata';
import ProductCard from '../../components/ProductCard';
import SearchBar from '../../components/SearchBar';
import { useCart } from '../../contexts/CartContext';

export default function HomeScreen() {
    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [locLoading, setLocLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(true);
    const { addToCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        // Delay product loading by 1.5 seconds
        const loadProducts = async () => {
            setProductsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setProducts(productsData);
            setProductsLoading(false);
        };

        loadProducts();
    }, []);

    useEffect(() => {
        (async () => {
            setLocLoading(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocLoading(false);
                return;
            }
            let loc = await Location.getCurrentPositionAsync({});
            setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
            setLocLoading(false);
        })();
    }, []);

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    if (productsLoading) {
        return (
            <View className="flex-1 bg-farmsmarter-light items-center justify-center">
                <ActivityIndicator size="large" color="#6A8A2C" />
                <Text className="text-farmsmarter-green mt-4 text-lg">Loading products...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-farmsmarter-light px-2">
            <Text className="text-xl font-bold text-farmsmarter-green mb-2">Products</Text>
            <SearchBar value={search} onChangeText={setSearch} />
            <FlatList
                data={filteredProducts}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ gap: 10 }}
                contentContainerStyle={{ padding: 10, paddingBottom: 16 }}
                renderItem={({ item }) => (
                    <ProductCard product={item} onAddToCart={() => addToCart({ ...item, quantity: 1 })} />
                )}
            />
            <View className="items-center">
                {locLoading ? (
                    <ActivityIndicator size="small" color="#6A8A2C" className="mt-2" />
                ) : location ? (
                    <TouchableOpacity className='items-center gap-2 m2-2' onPress={() => router.push('/map')}>
                        <Text className="text-farmsmarter-darkgreen font-semibold">Your Location:</Text>
                        <View className='flex-row items-center gap-2'>
                            <Text className="text-farmsmarter-green">
                                Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}
                            </Text>
                            <Ionicons name="map" size={15} color="#6A8A2C" />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <>
                        <Text className="text-farmsmarter-darkgreen font-semibold">Your Location:</Text>
                        <Text className="text-red-500 mt-2 text-center">Location not available</Text>
                    </>
                )}
            </View>
        </View>
    );
} 