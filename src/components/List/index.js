import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { COLORS, FONT1REGULAR } from '../../constants'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'


export default function List({ title, subHeading, subHeadingText, borderHide, imageURL }) {
    return (
        <View style={[styles.container, { borderWidth: borderHide ? 0 : 1, paddingLeft: borderHide ? 0 : 10 }]}>
            {
                imageURL &&
                <Image source={imageURL} style={styles.image} />
            }
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                {
                    subHeading &&
                    <Text style={styles.subHeading}>{subHeadingText}</Text>
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: COLORS.primary,
        borderWidth: 1, borderColor: COLORS.borderColor,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
    },
    image: { marginRight: 10 },
    titleContainer: { textAlign: 'left' },
    title: { color: COLORS.white, fontFamily: FONT1REGULAR, fontSize: hp("2.3%") },
    subHeading: { color: COLORS.white, fontFamily: FONT1REGULAR, opacity: 0.6, fontSize: hp("1.7%") }
});
