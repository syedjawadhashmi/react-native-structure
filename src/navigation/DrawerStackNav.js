import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
import { MainTabNav } from '.'
import { CustomDrawer } from '../components';
const Drawer = createDrawerNavigator();


function DrawerStackNav() {
  const dimensions = useWindowDimensions();
  const drawerType = dimensions.width >= 700 ? 'permanent' : 'front'
  return (
    <Drawer.Navigator initialRouteName="Home"
      drawerType={drawerType}
      edgeWidth={100}
      screenOptions={{
        headerShown: false
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="MainTabNav" component={MainTabNav} />
    </Drawer.Navigator>
  );
}

export default DrawerStackNav;
