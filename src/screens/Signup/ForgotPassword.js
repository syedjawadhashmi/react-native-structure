import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppButton, AppInput, Header } from '../../components';
import { validateEmail } from '../../utils/ValidateEmail';

function ForgotPassword({ handleBack, handleReset }) {
    const [state, setState] = useState({
        email: '',
        isEmailValid: false
    })


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

    const handleContinue = () => {
        handleReset()
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.topView}>
                    <Header title={"Forgot Password"} profile={false} menu={false} />
                    <Text style={styles.enterText}>Please enter the email address you’d like your password reset information to be sent to</Text>
                </View>
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
                    <AppButton title={"REQUEST RESET LINK"} onPress={handleContinue} />
                </View>
                <AppButton title={"BACK TO LOGIN"} onPress={handleBack} color={COLORS.greyButton} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '100%', flex: 1, backgroundColor: COLORS.primary },
    viewContainer: { alignItems: 'center', flex: 1, width: '90%', justifyContent: 'space-between', marginTop: hp("2%"), marginBottom: hp('4%') },
    topView: { alignItems: 'center', width: '100%' },
    textInputContainer: { marginBottom: hp("2%"), width: '100%' },
    enterText: { color: COLORS.white, fontSize: hp("2%"), textAlign: 'left', width: '90%', lineHeight: 23, opacity: 0.5 }
});

export default ForgotPassword;