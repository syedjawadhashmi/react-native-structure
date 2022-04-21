import React from 'react';
import { View, Image, StyleSheet, Text, ScrollView, Animated, Easing } from 'react-native';
import { COLORS, FONT1REGULAR } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppButton, List } from '../../components';
import rescueMan from '../../assets/svg/redMan.svg';
import redWaves from '../../assets/svg/redWaves.svg';
import mapIcon from '../../assets/svg/mapIcon.svg';
import phone from '../../assets/svg/phone.svg';
import image1 from '../../assets/images/image1.png';
import image2 from '../../assets/images/image2.png';
import image3 from '../../assets/images/image3.png';
import calendarGrey from '../../assets/svg/calendarGrey.svg';
import { SvgXml } from 'react-native-svg';

function RescueMode1({ handleChangeStep }) {
    let spinValue = new Animated.Value(0)

    // First set up animation 
    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: false  // To make use of native driver for performance
            }
        )
    ).start()

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['50%', '100%']
    })


    const rescueTeam = [
        { title: 'Charlie Wise', subHeading: 'Program Administrator', image: image1 },
        { title: 'John Doe', subHeading: 'Authorized Rescuer', image: image2 },
        { title: 'Jack Daphne', subHeading: 'Authorized Rescuer', image: image3 },
    ]
    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>
            <Animated.View style={{ width: spin, alignItems: 'center' }}>
                <SvgXml xml={redWaves} style={[styles.rescueRed]} />
            </Animated.View>
            <SvgXml xml={rescueMan} style={[styles.rescueRedMen]} />
            <Text style={styles.timeLeft}>3:28</Text>
            <Text style={styles.elapsedTime}>ELAPSED TIME</Text>
            <Text style={styles.bayArea}>BAY 3 AREA-A</Text>
            <View style={styles.appButtonView}>
                <AppButton title={"VIEW MAP"} color={COLORS.alertButon} radius={50} prefix={<SvgXml xml={mapIcon} style={{ marginLeft: -20, marginRight: 10 }} />} onPress={() => handleChangeStep(1)} />
            </View>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>RESCUE PLAN</Text>
            </View>
            <View style={styles.addContainer}>
                <Image source={{ uri: '' }} style={styles.rescuePlanImage} />
                <View>
                    <Text style={styles.nametext}>{"Tesla HQ Bay 3"}</Text>

                    <View style={styles.subView}>
                        <SvgXml xml={phone} />
                        <Text style={styles.addtext}>{'(415) 123 1234'}</Text>
                    </View>
                    <View style={styles.subView}>
                        <SvgXml xml={calendarGrey} />
                        <Text style={styles.addtext}>{'AUG 7 2020'}</Text>
                    </View>
                </View>

            </View>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>RESCUE STEPS</Text>
            </View>
            <View style={styles.stepContainer}>
                <View style={styles.stepCount}>
                    <Text style={styles.stepCountText}>1</Text>
                </View>
                <Text style={styles.stepText}>Identify equipment needed to perform rescue</Text>
            </View>
            <View style={styles.stepContainer}>
                <View style={styles.stepCount}>
                    <Text style={styles.stepCountText}>2</Text>
                </View>
                <Text style={styles.stepText}>Lorem ipsum dolor sit amet</Text>
            </View>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>EQUIPMENT</Text>
            </View>
            <View style={styles.listContainer}>
                <List
                    title={"Aerial Lift"}
                    subHeading
                    subHeadingText={"Tesla HQ Bay 3"}
                />
            </View>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>CRITICAL RESCUE FACTORS</Text>
            </View>
            <View style={styles.listContainer}>
                <List
                    title={"Obstruction Hazards"}
                    subHeading
                    subHeadingText={"28 JUN 2019"}
                />
            </View>
            <View style={styles.listContainer}>
                <List
                    title={"Landing Area"}
                    subHeading
                    subHeadingText={"28 JUN 2019"}
                />
            </View>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>RESCUE TEAM</Text>
            </View>
            <View style={styles.listContainer}>
                {
                    rescueTeam.map((member, index) => (
                        <List
                            key={index}
                            title={member.title}
                            borderHide={true}
                            imageURL={member.image}
                            subHeading
                            subHeadingText={member.subHeading}
                        />
                    ))
                }
            </View>
        </ScrollView>

    )
}




const styles = StyleSheet.create({
    scrollView: { width: '100%' },
    scrollViewContainer: { width: '100%', alignItems: 'center' },
    rescueRed: { maxWidth: '100%' },
    rescueRedMen: { maxWidth: '80%', marginTop: '-100%' },
    appButtonView: { maxWidth: '50%', marginVertical: hp("3%") },
    timeLeft: { fontSize: hp("5%"), fontFamily: FONT1REGULAR, color: COLORS.white },
    bayArea: { fontSize: hp("3%"), fontFamily: FONT1REGULAR, color: COLORS.white, marginTop: hp("3%") },
    elapsedTime: { fontSize: hp("2%"), opacity: 0.4, fontFamily: FONT1REGULAR, color: COLORS.white },
    centerText: { color: COLORS.white, fontSize: hp("2%"), textAlign: 'center', width: '80%', lineHeight: 23, opacity: 0.5 },
    headingContainer: { width: '100%', borderBottomWidth: 1, borderBottomColor: COLORS.secondary, paddingBottom: 5, marginTop: hp('2%') },
    heading: { fontFamily: FONT1REGULAR, color: COLORS.secondary },
    addtext: { fontFamily: FONT1REGULAR, color: COLORS.white, fontSize: hp('1.8%'), marginLeft: 10, opacity: 0.5 },
    addContainer: { width: "100%", alignItems: 'center', flexDirection: 'row', marginTop: hp("2%") },
    rescuePlanImage: { width: 65, height: 65, borderRadius: 10, borderWidth: 1, borderColor: COLORS.borderColor },
    nametext: { fontFamily: FONT1REGULAR, color: COLORS.white, fontSize: hp('2.4%'), marginLeft: 10 },
    subView: { flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 2 },
    stepContainer: { flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: hp('3%') },
    stepCount: { width: 30, height: 30, borderRadius: 6, backgroundColor: COLORS.secondary, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
    stepText: { fontFamily: FONT1REGULAR, color: COLORS.white, fontSize: hp('1.8%'), opacity: 0.75 },
    stepCountText: { fontFamily: FONT1REGULAR, color: COLORS.white, fontSize: hp('3%') },
    listContainer: { marginTop: 20, width: '100%' }
});

export default RescueMode1;