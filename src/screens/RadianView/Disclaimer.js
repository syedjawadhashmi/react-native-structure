import React, { useEffect } from 'react';
import { View, StyleSheet, Text, BackHandler } from 'react-native';
import { COLORS } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppButton, Header } from '../../components';

function RadianDisclaimer({ navigation }) {

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", onHardwareBackPress)
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", onHardwareBackPress)
        }
    }, [])

    const onHardwareBackPress = () => {
        navigation.goBack()
        return true
    }

    const handleContinue = () => {
        navigation.navigate("RadianView")
    }
    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>
                <Header title={"Device Disclaimer"} profile={false} menu={false} />
                <View style={styles.centerView}>
                    <Text style={styles.centerText}>Radian is designed for use with class B cable self retracting lanyards in overhead fall protection applications.  Use with non-class B cable SRLs and or in non-overhead applications in not recommended and may result in injury or death.  User accepts sole responsibility for the compatibility, fitment, functionality and safety for all equipment.</Text>
                    <Text style={styles.centerTextBottom}>Please read all instructions to familiarize yourself with this product and its operation prior to use.</Text>
                </View>
                <AppButton title={"CONTINUE"} onPress={handleContinue} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '100%', flex: 1, backgroundColor: COLORS.primary },
    viewContainer: { alignItems: 'center', flex: 1, width: '90%', justifyContent: 'space-between', marginTop: hp("2%"), marginBottom: hp('4%') },
    centerText: { color: COLORS.white, fontSize: hp("2%"), textAlign: 'center', width: '80%', lineHeight: 23, opacity: 0.5 },
    centerTextBottom: { color: COLORS.white, marginTop: hp('4%'), fontSize: hp("2%"), textAlign: 'center', width: '80%', lineHeight: 23, opacity: 0.5 },
    centerView: { width: '100%', alignItems: 'center' }
});

export default RadianDisclaimer;