import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Animated, Easing } from 'react-native';
import { COLORS, FONT1REGULAR } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppButton } from '../../components';
import arrowRescue from '../../assets/images/arrowRescue.png';
import mapIcon from '../../assets/svg/mapIcon.svg';
import arrowbg from '../../assets/svg/arrowbg.svg';
import arrow_upward from '../../assets/svg/arrow_upward.svg';
import { SvgXml } from 'react-native-svg';

function RescueMode2({ handleChangeStep }) {
    const [state, setState] = useState({
        spinValue: new Animated.Value(0)
    })
    // First set up animation 
    Animated.timing(
        state.spinValue,
        {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear, // Easing is an additional import from react-native
            useNativeDriver: true  // To make use of native driver for performance
        }
    ).start()

    const spin = state.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '35deg']
    })
    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <SvgXml xml={arrowbg} width={"90%"} style={styles.arrowBG} />
                <Animated.View style={[styles.rescueRed, { transform: [{ rotate: spin }] }]}>
                    <SvgXml xml={arrow_upward} width={"90%"} />
                </Animated.View>
            </View>
            <View style={styles.row}>
                <Text style={styles.timeLeft}>28</Text>
                <Text style={[styles.timeLeft, { opacity: 0.3 }]}>ft </Text>
                <Text style={styles.timeLeft}>ahead</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.elapsedTime}>31° </Text>
                <Text style={[styles.elapsedTime, { opacity: 0.3 }]}>TO YOUR LEFT</Text>
            </View>
            <View style={styles.appButtonView}>
                <AppButton title={"VIEW MAP"} color={COLORS.alertButon} radius={50} prefix={<SvgXml xml={mapIcon} style={{ marginLeft: -20, marginRight: 10 }} />} onPress={() => handleChangeStep(2)} />
            </View>
        </ScrollView>

    )
}




const styles = StyleSheet.create({
    scrollView: { width: '100%' },
    scrollViewContainer: { width: '100%', alignItems: 'center' },
    rescueRed: { marginTop: '-112%', width: '100%', alignItems: 'center' },
    arrowBG: { marginTop: '5%' },
    appButtonView: { maxWidth: '50%', marginVertical: hp("3%") },
    row: { flexDirection: 'row', alignItems: 'center' },
    timeLeft: { fontSize: hp("5%"), fontFamily: FONT1REGULAR, color: COLORS.white },
    elapsedTime: { fontSize: hp("2%"), fontFamily: FONT1REGULAR, color: COLORS.white },
});

export default RescueMode2;