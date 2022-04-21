import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Inspections } from '../screens'

const Stack = createNativeStackNavigator()

function AlertsStackNav() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Inspections" component={Inspections} />
        </Stack.Navigator>
    )
}

export default AlertsStackNav;