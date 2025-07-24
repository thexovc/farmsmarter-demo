import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import ProductCard from '../../components/ProductCard';
import SearchBar from '../../components/SearchBar';
import { useCart } from '../../contexts/CartContext';

const PRODUCTS_PATH = FileSystem.documentDirectory + 'products.json';
const ASSET_PRODUCTS_PATH = FileSystem.bundleDirectory ? FileSystem.bundleDirectory + 'assets/data/products.json' : undefined;

export default function HomeScreen() {
    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [locLoading, setLocLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        (async () => {
            // Ensure products.json exists in documentDirectory
            const exists = await FileSystem.getInfoAsync(PRODUCTS_PATH);
            if (!exists.exists && ASSET_PRODUCTS_PATH) {
                await FileSystem.copyAsync({ from: ASSET_PRODUCTS_PATH, to: PRODUCTS_PATH });
            }
            const file = await FileSystem.readAsStringAsync(PRODUCTS_PATH);
            setProducts(JSON.parse(file));
        })();
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

    return (
        <View className="flex-1 bg-farmsmarter-light px-2 pt-4">
            <Text className="text-xl font-bold text-farmsmarter-green mb-2">Products</Text>
            <SearchBar value={search} onChangeText={setSearch} />
            <FlatList
                data={filteredProducts}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <ProductCard product={item} onAddToCart={() => addToCart({ ...item, quantity: 1 })} />
                )}
                contentContainerStyle={{ paddingBottom: 16 }}
            />
            <View className="mt-4 items-center">
                <Text className="text-farmsmarter-darkgreen font-semibold">Your Location:</Text>
                {locLoading ? (
                    <ActivityIndicator size="small" color="#6A8A2C" className="mt-2" />
                ) : location ? (
                    <Text className="text-farmsmarter-green mt-2">Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}</Text>
                ) : (
                    <Text className="text-red-500 mt-2">Location not available</Text>
                )}
            </View>
        </View>
    );
} 