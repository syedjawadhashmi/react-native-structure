import React from 'react'
import {
    View,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { COLORS } from '../../constants';

function CustomDrawer({ descriptors }) {

    return (
        <View style={{
            backgroundColor: COLORS.primary, flex: 1
        }}>
            <DrawerContentScrollView>

            </DrawerContentScrollView>
        </View>
    )
}

export default CustomDrawer