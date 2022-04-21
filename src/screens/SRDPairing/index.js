import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppButton, Header } from '../../components';

function SRDPairing({ navigation }) {

    const handleContinue = () => {
        navigation.navigate("SRLInfo")
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>

                <Header title={"SRD Pairing"} />
                <View style={styles.centerContainer}>
                    <Text style={styles.centerHeadText}>Pair Radian to SRL</Text>
                    <Text style={styles.centerText}>Input SRL details to pair it with the Radian it will be connected to.</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton title={"CONTINUE"} onPress={handleContinue} />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '100%', flex: 1, backgroundColor: COLORS.primary },
    viewContainer: { alignItems: 'center', flex: 1, width: '90%', justifyContent: 'space-between', marginTop: hp("2%"), marginBottom: hp('4%') },
    centerHeadText: { color: COLORS.white, fontSize: hp("3%"), textAlign: 'center', width: '80%', lineHeight: 27, marginBottom: hp("2%") },
    centerText: { color: COLORS.white, fontSize: hp("2%"), textAlign: 'center', width: '80%', lineHeight: 23, opacity: 0.5 },
    buttonContainer: { width: '100%' },
    centerContainer: { width: '100%', alignItems: 'center' },
});

export default SRDPairing;