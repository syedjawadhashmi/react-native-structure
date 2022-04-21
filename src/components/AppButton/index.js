import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, FONT1BOLD } from '../../constants'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';


export default function AppButton({ title, onPress, color, prefix, radius }) {

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <LinearGradient colors={color ? [color, color] : ['#26B2DF', '#0597FD']} style={[styles.buttonContainer, { borderRadius: radius ? radius : 10 }]}>
                {
                    prefix && prefix
                }
                <Text style={styles.title}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: { width: '100%' },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        height: hp("7%"),
        marginTop: hp("2%"),
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: { fontFamily: FONT1BOLD, color: COLORS.white, fontSize: hp("2%") },
});
