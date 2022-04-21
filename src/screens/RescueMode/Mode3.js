import React from 'react';
import { StyleSheet, Text, ScrollView, View, Animated, Easing } from 'react-native';
import { COLORS, FONT1REGULAR } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppButton } from '../../components';
import greenWaves from '../../assets/svg/greenWaves.svg';
import greenMan from '../../assets/svg/greenMan.svg';
import errorIcon from '../../assets/svg/error.svg';
import { SvgXml } from 'react-native-svg';

function RescueMode3({ handleChangeStep }) {
    let spinValue = new Animated.Value(0)

    // First set up animation 
    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: false  // To make use of native driver for performance
            }
        )
    ).start()

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['50%', '100%']
    })

    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>
            <Animated.View style={{ width: spin, alignItems: 'center' }}>
                <SvgXml xml={greenWaves} style={[styles.rescueSuccess]} />
            </Animated.View>
            <SvgXml xml={greenMan} style={[styles.rescueSuccessMen]} />
            <Text style={styles.timeLeft}>9:35</Text>
            <Text style={styles.elapsedTime}>ELAPSED TIME</Text>
            <View style={styles.errorView}>
                <SvgXml xml={errorIcon} />
                <Text style={styles.errorText}>Due to this fall event, you are now required to go through the inspection process for this Radian.</Text>
            </View>
            <AppButton title={"BEGIN INSPECTION PROCESS"} color={COLORS.alertButon} onPress={() => handleChangeStep(3)} />

        </ScrollView>

    )
}




const styles = StyleSheet.create({
    scrollView: { width: '100%' },
    scrollViewContainer: { width: '100%', alignItems: 'center' },
    rescueSuccess: { maxWidth: '100%' },
    rescueSuccessMen: { maxWidth: '80%', marginTop: '-100%' },
    errorView: { width: '90%', marginTop: 30, marginBottom: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' },
    timeLeft: { fontSize: hp("5%"), fontFamily: FONT1REGULAR, color: COLORS.white },
    errorText: { fontSize: hp("1.8%"), fontFamily: FONT1REGULAR, color: COLORS.alertButon, width: '92%' },
    elapsedTime: { fontSize: hp("2%"), opacity: 0.4, fontFamily: FONT1REGULAR, color: COLORS.white },

});

export default RescueMode3;