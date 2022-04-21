import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CheckBox } from 'react-native-elements';
import paypal from '../../assets/svg/paypal.svg';
import checkIcon from '../../assets/svg/check.svg';
import mastercard from '../../assets/svg/mastercard.svg';
import { SvgXml } from 'react-native-svg'
import { AppInput } from '../../components';

function PaymentMethod() {

    const [state, setState] = useState({
        name: '',
        cardNumber: '',
        expire: '',
        cvc: '',
        saveInfo: false,
        isValidNumber: false,
    })

    function addHyphen(element) {
        let val = element?.split('-').join('');   // Remove dash (-) if mistakenly entered.
        let finalVal = val && val.match(/.{1,4}/g).join('-');    // Add (-) after 3rd every char.
        return finalVal || ''	// Update the input box.
    }

    function addSlash(element) {
        let val = element?.split('/').join('');   // Remove dash (-) if mistakenly entered.
        let finalVal = val && val.match(/.{1,2}/g).join('/');    // Add (-) after 3rd every char.
        return finalVal || ''	// Update the input box.
    }

    const handleChange = (name, value) => {
        if (name === 'cardNumber') {
            setState(pre => ({ ...pre, [name]: addHyphen(value), isValidNumber: pre.cardNumber.length === 18 ? true : false }))
        } else if (name === 'expire') {
            setState(pre => ({ ...pre, [name]: addSlash(value) }))
        } else {
            setState(pre => ({ ...pre, [name]: value }))
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <AppInput
                    placeholder={"Name on Card"}
                    name={"name"}
                    label={"Name on Card"}
                    value={state.name}
                    onChange={handleChange}
                />
            </View>
            <View style={styles.textInputContainer}>
                <AppInput
                    placeholder={"xxxx-xxxx-xxxx-xxxx"}
                    name={"cardNumber"}
                    label={"Card Number"}
                    keyboardType={"decimal-pad"}
                    maxLength={19}
                    value={state.cardNumber}
                    isValid={state.isValidNumber}
                    mastercard={mastercard}
                    onChange={handleChange}
                />
            </View>
            <View style={styles.textRowInputContainer}>
                <View style={styles.textInputNumber}>
                    <AppInput
                        placeholder={"MM/YY"}
                        name={"expire"}
                        label={"Valid Until"}
                        keyboardType={"decimal-pad"}
                        maxLength={5}
                        value={state.expire}
                        onChange={handleChange}
                    />
                </View>
                <View style={styles.textInputCVC}>
                    <AppInput
                        placeholder={"123"}
                        name={"cvc"}
                        label={"CVC"}
                        keyboardType={"decimal-pad"}
                        value={state.cvc}
                        maxLength={3}
                        onChange={handleChange}
                    />
                </View>
            </View>
            <View style={styles.remeberContainer}>
                <CheckBox
                    disabled={false}
                    checked={state.saveInfo}
                    titleProps={{ style: { fontWeight: 'normal', color: COLORS.white, opacity: 0.7, } }}
                    title={"Save card information?"}
                    containerStyle={styles.checkBox}
                    checkedIcon={<View style={styles.checkIcon}><SvgXml xml={checkIcon} /></View>}
                    uncheckedIcon={<View style={styles.uncheckIcon} />}
                    onPress={() => handleChange('saveInfo', !state.saveInfo)}
                />
            </View>
            <TouchableOpacity style={styles.paypalButton}>
                <SvgXml xml={paypal} style={{ marginTop: hp('1%') }} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: { width: '100%', backgroundColor: COLORS.primary },
    textInputContainer: { marginBottom: hp("2%"), width: '100%' },
    textRowInputContainer: { marginBottom: hp("2%"), width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    textInputNumber: { width: '70%' },
    textInputCVC: { width: '27%' },
    remeberContainer: { width: '100%', marginTop: -10, marginBottom: hp("2%") },
    checkBox: { backgroundColor: 'transparent', borderWidth: 0, marginLeft: -10 },
    uncheckIcon: { borderWidth: 1, width: 20, height: 20, borderRadius: 4, marginRight: 5, borderColor: COLORS.white, opacity: 0.7 },
    checkIcon: { backgroundColor: COLORS.secondary, width: 20, height: 20, marginRight: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
    paypalButton: { width: '100%', height: hp("7%"), alignItems: 'center', justifyContent: 'center', borderRadius: 25, backgroundColor: COLORS.paypal }

});

export default PaymentMethod;