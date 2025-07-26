import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "./global.css";

import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [onboarded, setOnboarded] = useState(false);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <CartProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {!onboarded ? (
              <Stack.Screen name="onboarding" options={{ headerShown: false }} initialParams={{ setOnboarded }} />
            ) : (
              <AuthGate />
            )}
          </Stack>
          <StatusBar style="inverted" />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AuthGate() {
  const { user } = useAuth();
  return user ? (
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  ) : (
    <Stack.Screen name="auth/login" options={{ headerShown: false }} />
  );
}
