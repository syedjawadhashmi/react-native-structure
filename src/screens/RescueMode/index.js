import React, { useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { COLORS } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header } from '../../components';
import RescueMode1 from './Mode1';
import RescueMode2 from './Mode2';
import RescueMode3 from './Mode3';

function RescueMode({ navigation }) {
    const [state, setState] = useState({
        rescueMode1: true,
        rescueMode2: false,
        rescueMode3: false,
    })

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", onHardwareBackPress)
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", onHardwareBackPress)
        }
    }, [state])

    const onHardwareBackPress = () => {
        if (state.welcome) {
            setState(pre => ({ ...pre, welcome: false }))
            handleSignin()
            return true
        } else if (state.rescueMode2) {
            setState(pre => ({ ...pre, rescueMode1: true, rescueMode2: false }))
            return true
        } else if (state.rescueMode3) {
            setState(pre => ({ ...pre, rescueMode3: false, rescueMode2: true }))
            return true
        } else {
            navigation.goBack()
            return false
        }
    }

    const handleChangeStep = (step) => {
        if (step === 1) {
            setState(pre => ({ ...pre, rescueMode1: false, rescueMode2: true }))
        } else if (step === 2) {
            setState(pre => ({ ...pre, rescueMode2: false, rescueMode3: true }))
        } else if (step === 3) {
            navigation.navigate("Inspections")
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>
                <Header title={"Rescue Mode"} profile menu />
                {
                    state.rescueMode1 &&
                    <RescueMode1 handleChangeStep={handleChangeStep} />
                }
                {
                    state.rescueMode2 &&
                    <RescueMode2 handleChangeStep={handleChangeStep} />
                }
                {
                    state.rescueMode3 &&
                    <RescueMode3 handleChangeStep={handleChangeStep} />
                }
            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '100%', flex: 1, backgroundColor: COLORS.primary },
    viewContainer: { alignItems: 'center', flex: 1, width: '85%', justifyContent: 'space-between', marginTop: hp("2%"), marginBottom: hp('4%') },

});

export default RescueMode;