import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RescueMode } from '../screens'

const Stack = createNativeStackNavigator()

function AlertsStackNav() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="RescueMode" component={RescueMode} />
        </Stack.Navigator>
    )
}

export default AlertsStackNav;