import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {TabBar} from '../components'
import {AlertsStackNav, InspectionsStackNav} from '.'

const Tab = createBottomTabNavigator()

function MainTabNav () {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Alerts'}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name='Devices' component={AlertsStackNav} />
      <Tab.Screen name='Teams' component={AlertsStackNav} />
      <Tab.Screen name='Alerts' component={AlertsStackNav} />
      <Tab.Screen name='Messages' component={AlertsStackNav} />
      <Tab.Screen name='Inspections' component={InspectionsStackNav} />
    </Tab.Navigator>
  )
}

export default MainTabNav
