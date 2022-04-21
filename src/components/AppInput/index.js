import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { COLORS, FONT1REGULAR } from '../../constants'
import { SvgXml } from 'react-native-svg'
import check from '../../assets/svg/check.svg';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function AppInput({ label, placeholder, name, value, onChange, onBlur, isValid, secureTextEntry, keyboardType, maxLength, mastercard }) {
    const [focused, setFocused] = useState(false)

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: focused ? COLORS.secondary : COLORS.white, opacity: focused ? 1 : 0.7 }]}>{label}</Text>
            <View style={[styles.inputContainer, { borderColor: focused ? COLORS.secondary : 'transparent' }]}>
                <TextInput
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => {
                        setFocused(false)
                        onBlur && onBlur()
                    }}
                    returnKeyType={"done"}
                    secureTextEntry={secureTextEntry}
                    value={value}
                    maxLength={maxLength || null}
                    keyboardType={keyboardType || 'default'}
                    onChangeText={(text) => onChange(name, text)}
                    placeholderTextColor={"rgba(255, 255, 255, 0.3)"}
                    style={[styles.textInput, { color: focused ? COLORS.secondary : COLORS.white, opacity: focused ? 1 : 0.7 }]}
                />
                {
                    isValid && mastercard &&
                    <View style={styles.checkIcon}>
                        <SvgXml
                            xml={mastercard}
                        />
                    </View>
                }
                {
                    isValid &&
                    <View style={styles.checkIcon}>
                        <SvgXml
                            xml={check}
                        />
                    </View>
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: { width: '100%' },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
        height: hp("7%"),
        marginTop: hp("1%"),
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1
    },
    label: { fontFamily: FONT1REGULAR, fontSize: hp("2%") },
    textInput: { color: COLORS.white, width: '80%', fontSize: hp("2%") },
    checkIcon: { backgroundColor: COLORS.secondary, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }
});
