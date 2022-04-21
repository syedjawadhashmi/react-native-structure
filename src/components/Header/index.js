import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { COLORS, FONT1REGULAR } from '../../constants'
import UserProfile from '../../assets/images/user.png'
import { SvgXml } from 'react-native-svg'
import menuIcon from '../../assets/svg/menu.svg';
import backIcon from '../../assets/svg/back.svg';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'


export default function Header({ title, menu, profile, subHeading, subHeadingText, back, left, right }) {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            {
                menu ?
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <SvgXml
                            xml={menuIcon}
                            style={{ marginTop: 5 }}
                        />
                    </TouchableOpacity>
                    :
                    back ?
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <SvgXml
                                xml={backIcon}
                                style={{ marginTop: 5, marginLeft: left ? left : 0, marginRight: right ? right : 0 }}
                            />
                        </TouchableOpacity>
                        :
                        <View />
            }
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                {
                    subHeading &&
                    <Text style={styles.subHeading}>{subHeadingText}</Text>
                }
            </View>
            {
                profile ?
                    <Image source={UserProfile} />
                    :
                    <View />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: hp("8%"),
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleContainer: { alignItems: 'center' },
    title: { color: COLORS.white, fontFamily: FONT1REGULAR, fontSize: hp("3%") },
    subHeading: { color: COLORS.white, fontFamily: FONT1REGULAR, opacity: 0.6, fontSize: hp("2%") }
});
