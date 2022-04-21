import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { MainStackNav } from '.'

const Stack = createNativeStackNavigator()

function RootNav() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Main" component={MainStackNav} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNav;