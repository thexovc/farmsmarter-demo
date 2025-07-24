import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const index = () => {
    return (
        <View className='flex-1 flex justify-center items-center'>
            <Text>index</Text>

            <TouchableOpacity className='bg-primary p-4 m-4 ' onPress={() => router.navigate("/(tabs)")}>
                <Text> Go to Dashboard</Text>
            </TouchableOpacity>
        </View>
    )
}

export default index