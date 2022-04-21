import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONT1BOLD, FONT1REGULAR } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import mobileIcon from '../../assets/svg/mobileIcon.svg';
import { SvgXml } from 'react-native-svg'

function SelectSubscription() {

    const [index, setIndex] = useState(0)
    const [state, setState] = useState({
        selected: ''
    })

    const handleSelect = (item) => {
        setState(pre => ({ ...pre, selected: item.type }))
    }

    const SubscriptionList = [
        { type: 'Free', feature: 'Basic features', amount: "$0.00" },
        { type: 'Silver', feature: 'Feature', feature1: 'Feature', amount: "$9.99", activeDevice: '1' },
        { type: 'Premium', feature: 'Feature', feature1: 'Feature', feature2: 'Feature', amount: "$19.99", activeDevice: '1-5' },
    ]
    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setIndex(0)} style={[styles.tabItem, { borderBottomWidth: index === 0 ? 2 : 0, borderBottomColor: index === 0 ? COLORS.secondary : 'transparent' }]}>
                    <Text style={[styles.tabItemText, { color: index === 0 ? COLORS.secondary : COLORS.white }]}>MONTHLY</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIndex(1)} style={[styles.tabItem, { borderBottomWidth: index === 1 ? 2 : 0, borderBottomColor: index === 1 ? COLORS.secondary : 'transparent' }]}>
                    <Text style={[styles.tabItemText, { color: index === 1 ? COLORS.secondary : COLORS.white }]}>YEARLY</Text>
                </TouchableOpacity>
            </View>
            {
                SubscriptionList.map((item, i) => (
                    <TouchableOpacity key={i} onPress={() => handleSelect(item)} style={[styles.list, { backgroundColor: state.selected === item.type ? COLORS.secondary : COLORS.inactiveTab }]}>
                        <View style={styles.typeContainer}>
                            <Text style={styles.type}>{item.type}</Text>
                            <Text style={styles.amount}>{item.amount}<Text style={styles.amountMonth}>{item.type !== "Free" ? (index === 0 ? "/mo" : "/yr") : ""}</Text></Text>
                        </View>
                        <Text style={styles.feature}>{item.feature}</Text>
                        {
                            item.feature1 &&
                            <Text style={styles.feature}>{item.feature1}</Text>
                        }
                        {
                            item.feature2 &&
                            <Text style={styles.feature}>{item.feature2}</Text>
                        }
                        {
                            item.activeDevice &&
                            <View style={styles.activeDevice}>
                                <SvgXml xml={mobileIcon} />
                                <Text style={styles.activeText}>{item.activeDevice + " active device"}</Text>
                            </View>
                        }
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '100%', flex: 1, backgroundColor: COLORS.primary },
    tabItemText: { color: COLORS.secondary, fontSize: hp('2%'), fontFamily: FONT1BOLD },
    tabs: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent', width: '100%', padding: 5 },
    list: { width: '100%', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, marginTop: hp("2%") },
    typeContainer: { width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
    type: { color: COLORS.white, fontFamily: FONT1BOLD },
    amount: { color: COLORS.white, fontFamily: FONT1REGULAR, fontSize: hp("3%") },
    amountMonth: { color: COLORS.white, fontFamily: FONT1REGULAR, fontSize: hp("2%") },
    feature: { color: COLORS.white, fontFamily: FONT1REGULAR, fontSize: hp("2%"), opacity: 0.6 },
    activeDevice: { flexDirection: 'row', alignItems: 'center', marginTop: hp("2%") },
    activeText: { color: COLORS.white, fontFamily: FONT1REGULAR, fontSize: hp("2%"), marginLeft: 8 },
    tabItem: { backgroundColor: "transparent", width: '50%', alignItems: 'center', justifyContent: 'center', height: 30 }
});

export default SelectSubscription;