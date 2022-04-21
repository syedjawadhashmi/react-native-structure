import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {
  Signup,
  QRScanner,
  Legal,
  RadianView,
  RadianDisclaimer,
  AppView,
  Subscription,
  TeamsSetup,
  AddProgramAdministrator,
  AddInspector,
  AddRescue,
  ConfirmTeam,
  SRDPairing,
  SRLInfo
} from '../screens'
import { DrawerStackNav } from '.'

const Stack = createStackNavigator()

function MainStackNav() {

  return (

    <Stack.Navigator screenOptions={{
      headerShown: false,
      presentation: 'transparentModal',
    }} >
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={DrawerStackNav} />
      <Stack.Screen name="SRDPairing" component={SRDPairing} />
      <Stack.Screen name="TeamsSetup" component={TeamsSetup} />
      <Stack.Screen name="Legal" component={Legal} />
      <Stack.Screen name="QRScanner" component={QRScanner} />
      <Stack.Screen name="RadianView" component={RadianView} />
      <Stack.Screen name="RadianDisclaimer" component={RadianDisclaimer} />
      <Stack.Screen name="AppView" component={AppView} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="AddProgramAdministrator" component={AddProgramAdministrator} />
      <Stack.Screen name="AddInspector" component={AddInspector} />
      <Stack.Screen name="AddRescue" component={AddRescue} />
      <Stack.Screen name="ConfirmTeam" component={ConfirmTeam} />
      <Stack.Screen name="SRLInfo" component={SRLInfo} />
    </Stack.Navigator >
  )
}

export default MainStackNav;