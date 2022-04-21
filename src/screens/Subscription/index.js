import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, BackHandler, Animated } from 'react-native';
import { COLORS } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppButton, Header, BasicModal } from '../../components';
import SelectSubscription from './SelectSubscription';
import PaymentMethod from './PaymentMethod';

function Subscription({ navigation }) {
    const [state, setState] = useState({
        selectSubscription: false,
        paymentMethod: false,
        skipModal: false,
        fadeAnimation: new Animated.Value(0),
        fadeAnimationPayment: new Animated.Value(0),
    })

    const fadeIn = () => {
        Animated.timing(state.fadeAnimation, {
            toValue: state.selectSubscription ? 0 : 1,
            useNativeDriver: false,
            duration: 1000
        }).start();
    };

    const fadeInPayment = () => {
        Animated.timing(state.fadeAnimationPayment, {
            toValue: state.paymentMethod ? 0 : 1,
            useNativeDriver: false,
            duration: 1000
        }).start();
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", onHardwareBackPress)
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", onHardwareBackPress)
        }
    }, [state])

    const onHardwareBackPress = () => {
        if (state.selectSubscription) {
            setState(pre => ({ ...pre, selectSubscription: false }))
            fadeIn()
            return true
        } else if (state.paymentMethod) {
            setState(pre => ({ ...pre, selectSubscription: true, paymentMethod: false }))
            fadeInPayment()
            return true
        } else {
            navigation.goBack(null)
            return true
        }
    }

    const handleContinue = () => {
        if (state.selectSubscription) {
            addPaymentMethod()
        } else if (state.paymentMethod) {
            navigation.navigate("TeamsSetup")
        }
        else {
            setState(pre => ({ ...pre, selectSubscription: true }))
            fadeIn()
        }
    }

    const handleSkip = () => {
        setState(pre => ({ ...pre, skipModal: !pre.skipModal }))
    }

    const addPaymentMethod = () => {
        setState(pre => ({ ...pre, paymentMethod: true, selectSubscription: false }))
        fadeInPayment()
    }

    const handleModalClick = () => {
        handleSkip()
        navigation.navigate("TeamsSetup")
    }

    const { skipModal, selectSubscription, fadeAnimation, paymentMethod, fadeAnimationPayment } = state;
    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>

                <Header title={state.paymentMethod ? "Subscriptions" : "Subscription"} subHeading={state.selectSubscription} subHeadingText={state.paymentMethod ? "PAYMENT METHOD" : "CHOOSE A SUBSCRIPTION PLAN"} profile={false} menu={false} />
                {
                    selectSubscription &&
                    <Animated.View
                        style={[{ flex: 1, width: '100%', opacity: fadeAnimation }]}
                    >
                        <SelectSubscription />
                    </Animated.View>
                }
                {
                    paymentMethod &&
                    <Animated.View
                        style={[{ height: '75%', width: '100%', opacity: fadeAnimationPayment }]}
                    >
                        <PaymentMethod />
                    </Animated.View>
                }
                {(!paymentMethod && !selectSubscription) &&
                    <Text style={styles.centerText}>Radian uses cellular technology to connect with the app. A subscription is required to enable app based features.</Text>
                }
                <View style={styles.buttonContainer}>
                    {
                        (!selectSubscription && !paymentMethod) &&
                        <AppButton title={"SKIP"} onPress={handleSkip} color={COLORS.greyButton} />
                    }
                    <AppButton title={paymentMethod ? "SUBSCRIBE FOR $9.99/MO" : "CONTINUE"} onPress={handleContinue} />
                </View>
            </View>
            <BasicModal
                modalVisible={skipModal}
                closeModalVisible={handleSkip}
                headerTitle={"Skip?"}
                content={'Are you sure you want to skip?  Alerts and notifications through the app will be unavailable until subscription is set up.'}
                buttonTitle={"CONTINUE"}
                handleClick={handleModalClick}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '100%', flex: 1, backgroundColor: COLORS.primary },
    viewContainer: { alignItems: 'center', flex: 1, width: '90%', justifyContent: 'space-between', marginTop: hp("2%"), marginBottom: hp('4%') },
    centerText: { color: COLORS.white, fontSize: hp("2%"), textAlign: 'center', width: '80%', lineHeight: 23, opacity: 0.5 },
    buttonContainer: { width: '100%' },
});

export default Subscription;