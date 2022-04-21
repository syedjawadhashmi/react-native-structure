import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, BackHandler } from 'react-native';
import { SvgXml } from 'react-native-svg'
import logo from '../../assets/svg/logo.svg';
import radian from '../../assets/svg/radian.svg';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppButton } from '../../components';
import { COLORS, FONT1BOLDITALIC, FONT1REGULAR } from '../../constants';


function RadianView({ navigation }) {
    const [state, setState] = useState({
        showDetails: false,
        leftPosition: new Animated.Value(1000),
        rightPosition: new Animated.Value(0),
        leftImagePosition: new Animated.Value(0),
        leftImageheight: new Animated.Value(0),
    })

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", onHardwareBackPress)
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", onHardwareBackPress)
        }
    }, [state])

    const onHardwareBackPress = () => {
        if (state.showDetails) {
            setState(pre => ({ ...pre, showDetails: false }))
            handleNext()
            return true
        } else {
            navigation.goBack(null)
            return true
        }
    }


    const handleCancel = () => {
        navigation.navigate("QRScanner")
    }

    const handleContinue = () => {
        navigation.navigate("AppView")
    }

    const handleNext = () => {
        mooveLR()
    }

    function mooveLR() {
        Animated.timing(
            state.leftPosition,
            {
                toValue: state.showDetails ? 1000 : 0,
                useNativeDriver: false,
                duration: 500, // the duration of the animation
                easing: Easing.linear, // the style of animation 
            }
        ).start() // starts this annimation once this method is called
        Animated.timing(
            state.rightPosition,
            {
                toValue: state.showDetails ? 0 : 1000,
                useNativeDriver: false,
                duration: 100, // the duration of the animation
                easing: Easing.linear, // the style of animation 
            }
        ).start(({ finished }) => {
            if (finished) {
                if (!state.showDetails) {
                    setState(pre => ({ ...pre, showDetails: true }))
                }
            }
        }) // starts this annimation once this method is called
        Animated.timing(
            state.leftImagePosition,
            {
                toValue: state.showDetails ? 0 : 170,
                useNativeDriver: false,
                duration: 500, // the duration of the animation
                easing: Easing.linear, // the style of animation 
            }
        ).start() // starts this annimation once this method is called
        Animated.timing(
            state.leftImageheight,
            {
                toValue: state.showDetails ? 0 : 1,
                useNativeDriver: false,
                duration: 500, // the duration of the animation
                easing: Easing.linear, // the style of animation 
            }
        ).start() // starts this annimation once this method is called
    }

    const list = [
        { text: 'Intuitive visual and audible alerts provide vital information to people working at height.' },
        { text: 'Swing-fall risk detection alerts operator when safe working angles are exceeded.' },
        { text: 'Fall alarm alerts nearby personnel that a fall event has occurred.' },
        { text: 'Virtual lock-out deters the use of use of non-compliant equipment.' },
        { text: 'Battery power indicator provides status and signals when charging is required.' },
    ]

    return (
        <View style={styles.container}>

            <View style={styles.viewContainer}>
                {
                    !state.showDetails ?
                        <Animated.View style={[styles.logoContainer, { right: state.rightPosition }]}>
                            <SvgXml xml={logo} width={hp("20%")} />
                            <Text style={styles.logoText}>Radian</Text>
                        </Animated.View>
                        :
                        <Animated.View style={[styles.logoContainer, { left: state.leftPosition }]}>
                            <Text style={styles.deviceText}>Device</Text>
                        </Animated.View>
                }

                <View style={styles.centerContainer}>
                    <Animated.View style={[{ alignItems: 'flex-start', width: '100%', left: state.leftPosition }]}>
                        <View style={[styles.deviceList, { height: state.showDetails ? '98%' : '5%' }]}>
                            {list.map((item, index) => (
                                <View key={index} style={styles.listView}>
                                    <Text style={{ color: COLORS.white, opacity: 0.5, textAlign: 'right', fontFamily: FONT1REGULAR, fontSize: hp('1.5%'), width: '80%' }}>{item.text}</Text>
                                    <View style={{ backgroundColor: COLORS.secondary, marginLeft: 10, width: hp('6%'), height: hp('6%'), alignItems: 'center', justifyContent: 'center', borderRadius: hp("6%") }}>
                                        <Text style={{ color: COLORS.white, fontFamily: FONT1REGULAR, fontSize: hp("3%") }}>{index + 1}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </Animated.View>
                    <Animated.View style={[{
                        top: state.showDetails ? '-82%' : '0%',
                        zIndex: -1,
                        left: state.leftImagePosition,
                        transform: [
                            {
                                scaleX: state.leftImageheight.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 1.4]
                                })
                            },
                            {
                                scaleY: state.leftImageheight.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 1.4]
                                })
                            }
                        ]
                    }]}>
                        <SvgXml xml={radian} height={hp('50%')} />
                    </Animated.View>
                    {
                        !state.showDetails &&
                        <Animated.View style={[{ right: state.rightPosition, alignItems: 'center' }]}>
                            <Text style={styles.radianText}>Radian +Cell{"\n"}Serial Number 403-193-402</Text>
                            <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('RadianDisclaimer')}>
                                <Text style={styles.textgrey}>View </Text>
                                <Text style={styles.disclaimer}>Device Disclaimer</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    }
                </View>

                {
                    state.showDetails ?
                        <Animated.View style={[styles.buttonContainer, { left: state.leftPosition }]}>
                            <AppButton title={"CONTINUE"} onPress={handleContinue} />
                        </Animated.View>
                        :
                        <Animated.View style={[styles.buttonContainer, { right: state.rightPosition }]}>
                            <View style={styles.shortButton}>
                                <AppButton title={"REDO SCAN"} color={COLORS.greyButton} onPress={handleCancel} />
                            </View>
                            <View style={styles.shortButton}>
                                <AppButton title={"CONTINUE"} onPress={handleNext} />
                            </View>
                        </Animated.View>
                }
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '100%', flex: 1, backgroundColor: COLORS.primary },
    viewContainer: { alignItems: 'center', flex: 1, width: '90%', justifyContent: 'space-between', marginTop: hp("5%"), marginBottom: hp('3%') },
    logoContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    centerContainer: { alignItems: 'center', height: '80%' },
    row: { flexDirection: 'row', alignItems: 'center' },
    radianText: { color: COLORS.white, opacity: 0.5, textAlign: 'center', lineHeight: 22, marginTop: ('4%'), fontFamily: FONT1REGULAR },
    textgrey: { color: COLORS.white, opacity: 0.5, textAlign: 'center', lineHeight: 22, fontFamily: FONT1REGULAR },
    disclaimer: { color: COLORS.secondary, textAlign: 'center', lineHeight: 22, fontFamily: FONT1REGULAR },
    logoText: { color: COLORS.white, fontFamily: FONT1BOLDITALIC, fontSize: hp("4%"), marginLeft: 10, marginTop: -5 },
    deviceText: { color: COLORS.white, fontFamily: FONT1REGULAR, fontSize: hp("4%") },
    buttonContainer: { width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    deviceList: { width: '100%', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'column', top: 10, left: -30 },
    listView: { flexDirection: 'row', width: '60%', alignItems: 'center' },
    shortButton: { width: '48%' }
});

export default RadianView;