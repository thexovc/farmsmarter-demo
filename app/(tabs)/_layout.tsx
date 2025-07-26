import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  return (
    <View style={{
      backgroundColor: focused ? '#93CC00' : 'transparent',
      borderRadius: 9999,
      padding: focused ? 5 : 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: 35,
      height: 35,
    }}>
      <Ionicons name={name as any} size={24} color={focused ? '#fff' : '#15351B'} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <SafeAreaView className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 50,
            paddingBottom: 10,
            paddingTop: 10,
            backgroundColor: '#fff',
            borderTopWidth: 0,
            justifyContent: 'center',
          },
          tabBarItemStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon name="home-outline" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon name="cart-outline" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon name="person-outline" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
