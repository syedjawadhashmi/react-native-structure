import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Animated, BackHandler, Image } from 'react-native';
import MobileImage from '../../assets/images/mobile.png';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppButton } from '../../components';
import { COLORS, FONT1BOLDITALIC, FONT1REGULAR } from '../../constants';


function AppView({ navigation }) {

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", onHardwareBackPress)
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", onHardwareBackPress)
        }
    }, [])

    const onHardwareBackPress = () => {
        navigation.goBack(null)
        return true
    }



    const handleContinue = () => {
        navigation.navigate('Subscription')
    }



    const list = [
        { text: 'Angular violation alerts notify team members when operators are at risk of swing fall.' },
        { text: 'Fall alerts are combined with pre-configured rescue plans to assist with rescue.' },
        { text: 'Location tracking guides your team to the fallen worker to lower response times.' },
        { text: 'View current activity and historical data with easy to read graphic displays.' },
        { text: 'Radian assists with compliance by notifying team members when inspections are due' },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>
                <Animated.View style={[styles.logoContainer]}>
                    <Text style={styles.deviceText}>App</Text>
                </Animated.View>
                <View style={styles.centerContainer}>
                    <Animated.View style={[{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '100%', height: '100%' }]}>
                        <View style={{ width: '40%', alignItems: 'flex-start' }}>
                            <Image source={MobileImage} style={{ height: '100%', width: '100%', resizeMode: 'stretch' }} />
                        </View>
                        <View style={[styles.deviceList]}>
                            {list.map((item, index) => (
                                <View key={index} style={styles.listView}>
                                    <View style={{ backgroundColor: COLORS.secondary, marginRight: 10, width: hp('6%'), height: hp('6%'), alignItems: 'center', justifyContent: 'center', borderRadius: hp("6%") }}>
                                        <Text style={{ color: COLORS.white, fontFamily: FONT1REGULAR, fontSize: hp("3%") }}>{index + 1}</Text>
                                    </View>
                                    <Text style={{ color: COLORS.white, opacity: 0.5, textAlign: 'left', fontFamily: FONT1REGULAR, fontSize: hp('1.5%'), width: '80%' }}>{item.text}</Text>
                                </View>
                            ))}
                        </View>
                    </Animated.View>
                </View>
                <Animated.View style={[styles.buttonContainer]}>
                    <AppButton title={"CONTINUE"} onPress={handleContinue} />
                </Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '100%', flex: 1, backgroundColor: COLORS.primary },
    viewContainer: { alignItems: 'center', flex: 1, width: '100%', justifyContent: 'space-between', marginTop: hp("5%"), marginBottom: hp('3%') },
    logoContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    centerContainer: { alignItems: 'center', height: '80%', width: '100%' },
    logoText: { color: COLORS.white, fontFamily: FONT1BOLDITALIC, fontSize: hp("4%"), marginLeft: 10, marginTop: -5 },
    deviceText: { color: COLORS.white, fontFamily: FONT1REGULAR, fontSize: hp("4%") },
    buttonContainer: { width: "90%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    deviceList: { width: '55%', height: '90%', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'column', left: '-10%' },
    listView: { flexDirection: 'row', width: '90%', alignItems: 'center' }
});

export default AppView;