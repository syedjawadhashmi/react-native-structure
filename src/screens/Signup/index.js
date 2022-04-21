import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Animated, Easing, BackHandler } from 'react-native'
import { CheckBox } from 'react-native-elements';
import { COLORS } from '../../constants';
import { SvgXml } from 'react-native-svg'
import logo from '../../assets/svg/logo.svg';
import checkIcon from '../../assets/svg/check.svg';
import { AppInput, AppButton } from '../../components';
import { validateEmail } from '../../utils/ValidateEmail'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ForgotPassword from './ForgotPassword';

export default function Signup({ navigation, route }) {
    const [state, setState] = useState({
        email: '',
        password: '',
        name: '',
        company: '',
        isRemember: false,
        login: false,
        forgotPassword: false,
        welcome: false,
        isEmailValid: false,
        leftPosition: new Animated.Value(200),
        rightPosition: new Animated.Value(0)
    })


    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", onHardwareBackPress)
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", onHardwareBackPress)
        }
    }, [state])

    useEffect(() => {
        if (route.params?.welcome) {
            setState(pre => ({ welcome: route.params?.welcome ? true : false }))
        }
    }, [route])

    const onHardwareBackPress = () => {
        if (state.welcome) {
            setState(pre => ({ ...pre, welcome: false }))
            handleSignin()
            return true
        } else if (state.forgotPassword) {
            setState(pre => ({ ...pre, forgotPassword: false, welcome: false }))
            return true
        } else if (state.login) {
            setState(pre => ({ ...pre, login: false, welcome: false }))
            return true
        } else {
            BackHandler.exitApp()
            return false
        }
    }


    const handleChange = (name, value) => {
        setState(pre => ({ ...pre, [name]: value }))
    }

    const isEmailValid = () => {
        const isValid = validateEmail(state.email)
        if (!isValid) {
            setState(pre => ({ ...pre, email: '' }))
            alert("email is not valid")
        } else {
            setState(pre => ({ ...pre, isEmailValid: true }))
        }
    }

    const handleSignin = () => {
        mooveRL()
        mooveLR()
    }

    const handleNavigate = (route) => {
        navigation.navigate(route)
    }

    function mooveLR() {
        Animated.timing(
            state.leftPosition,
            {
                toValue: state.welcome ? 200 : 0,
                useNativeDriver: false,
                duration: 400, // the duration of the animation
                easing: Easing.linear, // the style of animation 
            }
        ).start() // starts this annimation once this method is called
    }

    function mooveRL() {
        Animated.timing(
            state.rightPosition,
            {
                useNativeDriver: false,
                toValue: state.welcome ? 0 : 100,
                duration: 100, // the duration of the animation
                easing: Easing.linear, // the style of animation 
            },

        ).start(({ finished }) => {
            if (finished) {
                if (!state.welcome) {
                    setState(pre => ({ ...pre, welcome: true }))
                }
            }
        }) // starts this annimation once this method is called
    }

    const activeComponent = (active) => {
        if (active === "forgotPassword") {
            setState(pre => ({ ...pre, forgotPassword: true }))
        } else {
            setState(pre => ({ ...pre, login: !pre.login }))
        }
    }

    const handleReset = () => {
        handleSignin()
        setState(pre => ({ ...pre, forgotPassword: false, welcome: true }))
    }

    const handleBack = () => {
        setState(pre => ({ ...pre, forgotPassword: false, welcome: false }))
    }

    const { login, welcome, password, name, isRemember, forgotPassword } = state;
    if (forgotPassword) return <ForgotPassword handleBack={handleBack} handleReset={handleReset} />
    return (
        <KeyboardAwareScrollView scrollEnabled={false} style={styles.container} contentContainerStyle={[styles.contentContainer, { height: welcome || login ? '100%' : 'auto' }]}>
            <View style={styles.viewContainer}>
                <SvgXml xml={logo} width={hp("25%")} style={styles.logo} />
                {
                    !welcome ?
                        <Animated.View style={[styles.animation_view, { right: state.rightPosition }]}>
                            <View style={styles.mainView}>
                                <View style={styles.textInputContainer}>
                                    <AppInput
                                        label={"Email"}
                                        placeholder={"Email"}
                                        name={'email'}
                                        value={state.email}
                                        onChange={handleChange}
                                        onBlur={isEmailValid}
                                        isValid={state.isEmailValid}
                                    />
                                </View>
                                <View style={styles.textInputContainer}>
                                    <AppInput
                                        label={"Password"}
                                        placeholder={"Password"}
                                        name={'password'}
                                        value={password}
                                        onChange={handleChange}
                                        secureTextEntry={true}
                                    />
                                </View>
                                {
                                    !login &&
                                    <>
                                        <View style={styles.textInputContainer}>
                                            <AppInput
                                                label={"Name"}
                                                placeholder={"Name"}
                                                name={'name'}
                                                value={name}
                                                onChange={handleChange}
                                            />
                                        </View>
                                        <View style={styles.textInputContainer}>
                                            <AppInput
                                                label={"Company"}
                                                placeholder={"Company"}
                                                name={'company'}
                                                value={state.company}
                                                onChange={handleChange}
                                            />
                                        </View>
                                    </>
                                }
                                <View style={styles.remeberContainer}>
                                    <CheckBox
                                        disabled={false}
                                        checked={isRemember}
                                        titleProps={{ style: { fontWeight: 'normal', color: COLORS.white, opacity: 0.7, } }}
                                        title={"Remember Me"}
                                        containerStyle={styles.checkBox}
                                        checkedIcon={<View style={styles.checkIcon}><SvgXml xml={checkIcon} /></View>}
                                        uncheckedIcon={<View style={styles.uncheckIcon} />}
                                        onPress={() => handleChange('isRemember', !isRemember)}
                                    />
                                    <TouchableOpacity onPress={() => activeComponent("forgotPassword")}>
                                        <Text style={styles.forgotText}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.mainView}>
                                <TouchableOpacity onPress={() => activeComponent('login')}>
                                    <Text style={styles.haveAccount}>{login ? "Don’t have an account?" : "Have an account?"} <Text style={{ color: COLORS.secondary }}>{login ? "Sign Up" : "Log in"}</Text></Text>
                                </TouchableOpacity>
                                <Text style={styles.agreeText}>By clicking, you agree to our terms & conditions as well as our privacy policy</Text>
                                <AppButton title={login ? "LOG IN" : "SIGN IN"} onPress={handleSignin} />
                            </View>
                        </Animated.View>
                        :
                        <Animated.View style={[styles.animation_view, { left: state.leftPosition }]}>
                            <View />
                            <View style={styles.welcomeContainer}>
                                <Text style={styles.welcomeTitle}>Welcome</Text>
                                <Text style={styles.welcomeText}>Z-AXIS devices work with this app to improve the safety of people working at height.</Text>
                                <Text style={styles.welcomeText}>You will now be guided through the setup process.</Text>
                            </View>
                            <AppButton title={"CONTINUE"} onPress={() => handleNavigate("Legal")} />
                        </Animated.View>
                }
            </View>
        </KeyboardAwareScrollView>
    )
}


const styles = StyleSheet.create({
    container: { width: '100%', flex: 1, backgroundColor: COLORS.primary },
    contentContainer: { alignItems: 'center', },
    viewContainer: { alignItems: 'center', width: '90%', marginTop: hp("2%"), marginBottom: hp('2%') },
    logo: { marginBottom: hp("1.8%") },
    textInputContainer: { marginBottom: hp("2%"), width: '100%' },
    remeberContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: -10, marginBottom: hp("2%") },
    checkBox: { backgroundColor: 'transparent', borderWidth: 0, marginLeft: -10 },
    uncheckIcon: { borderWidth: 1, width: 20, height: 20, borderRadius: 4, marginRight: 5, borderColor: COLORS.white, opacity: 0.7 },
    checkIcon: { backgroundColor: COLORS.secondary, width: 20, height: 20, marginRight: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
    forgotText: { color: COLORS.secondary },
    haveAccount: { color: COLORS.grey },
    agreeText: { color: COLORS.white, textAlign: 'center', width: '80%', marginTop: hp("3%"), marginBottom: hp("2%"), opacity: 0.2 },
    animation_view: { alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '89%' },
    welcomeContainer: { width: '100%', alignItems: 'center' },
    welcomeTitle: { color: COLORS.white, fontSize: hp('3%'), marginBottom: hp("4%"), textAlign: 'center' },
    welcomeText: { color: COLORS.white, fontSize: hp('2%'), textAlign: 'center', width: '70%', marginBottom: hp('1%'), lineHeight: 20, opacity: 0.5 },
    mainView: { width: '100%', alignItems: 'center' }
});
