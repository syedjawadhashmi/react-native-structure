import React, { useEffect } from 'react';
import { View, StyleSheet, Text, BackHandler } from 'react-native';
import { COLORS } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppButton, Header } from '../../components';

function Legal({ navigation }) {

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
        navigation.navigate("QRScanner")
    }
    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>
                <Header title={"Legal Disclaimer"} profile={false} menu={false} />
                <Text style={styles.centerText}>By using this software you accept responsibility for workplace compliance including any and all applicable laws and regulations.  You agree to indemnify and hold harmless Z-AXIS, its officers, directors, employees and agents from and against all claims, losses, damages, penalties, fines, liabilities, including, attorneys fees that arise or result from the use of this software including failure to comply with such laws and regulations.</Text>
                <AppButton title={"CONTINUE"} onPress={handleContinue} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '100%', flex: 1, backgroundColor: COLORS.primary },
    viewContainer: { alignItems: 'center', flex: 1, width: '90%', justifyContent: 'space-between', marginTop: hp("2%"), marginBottom: hp('4%') },
    centerText: { color: COLORS.white, fontSize: hp("2%"), textAlign: 'center', width: '80%', lineHeight: 23, opacity: 0.5 }
});

export default Legal;