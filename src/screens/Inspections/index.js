import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { SvgXml } from 'react-native-svg'
import searchIcon from '../../assets/svg/search.svg';
import lock from '../../assets/svg/lock.svg';
import warning from '../../assets/svg/warning.svg';
import tick from '../../assets/svg/tick.svg';
import listimage from '../../assets/svg/listimage.svg';
import errorIcon from '../../assets/svg/error.svg';
import dots from '../../assets/svg/dots.svg';
import { Header } from '../../components'
import { COLORS, FONT1BOLD, FONT1REGULAR } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Inspections() {

    const [selectedValue, setSelectedValue] = useState("java");
    const [openOption, setOpenOption] = useState(-1);
    const [isActive, setIsActive] = useState(0);

    const list = [
        {
            title: "Radian 001", status: 'Inspection Needed',
            statusIcon: errorIcon, isButton: true, imageIcon: lock,
            statusColor: COLORS.alertButon, dotColor: COLORS.alertButon
        },
        {
            title: "Radian 002", status: 'Inspected 120 days ago',
            statusIcon: false, isButton: false, imageIcon: warning,
            statusColor: COLORS.white, opacity: 0.6, inspected: true, dotColor: COLORS.success
        },
        {
            title: "Radian 003", status: 'Inspected 253 days ago',
            statusIcon: false, isButton: false, imageIcon: tick,
            statusColor: COLORS.white, opacity: 0.6, optionButton: false, inspected: true, dotColor: COLORS.success
        },
        {
            title: "Radian 004", status: 'Inspected 253 days ago',
            statusIcon: false, isButton: false, imageIcon: tick,
            statusColor: COLORS.white, opacity: 0.6, disabled: false, inspected: true, dotColor: COLORS.success
        },
        {
            title: "Radian 005", status: 'Inspected 253 days ago',
            statusIcon: false, isButton: false, imageIcon: false,
            statusColor: COLORS.white, opacity: 0.6, disabled: true
        },
        {
            title: "Radian 006", status: 'Inspected 253 days ago',
            statusIcon: false, isButton: false, imageIcon: false,
            statusColor: COLORS.white, opacity: 0.6, disabled: true
        },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>
                <Header title={"Inspections"} profile menu />
                <View style={styles.searchView}>
                    <SvgXml style={styles.searchIcon} xml={searchIcon} />
                    <TextInput style={styles.searchInput} placeholderTextColor={"rgba(255,255,255,0.3)"} placeholder={"Search"} />
                    <Picker
                        selectedValue={selectedValue}
                        dropdownIconColor={"#fff"}
                        style={styles.picker}
                        mode={"dropdown"}
                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="SORT BY" value="java" />
                        <Picker.Item label="Radian 001" value="Radian 001" />
                    </Picker>
                </View>
                <View style={styles.tabs}>
                    <TouchableOpacity style={[styles.tab, { backgroundColor: isActive === 0 ? COLORS.secondary : 'transparent' }]} onPress={() => setIsActive(0)}>
                        <Text style={[styles.tabText, { opacity: isActive === 0 ? 1 : 0.3 }]}>ALL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, { backgroundColor: isActive === 1 ? COLORS.secondary : 'transparent' }]} onPress={() => setIsActive(1)}>
                        <Text style={[styles.tabText, { opacity: isActive === 1 ? 1 : 0.3 }]}>ACTIVE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, { backgroundColor: isActive === 2 ? COLORS.secondary : 'transparent' }]} onPress={() => setIsActive(2)}>
                        <Text style={[styles.tabText, { opacity: isActive === 2 ? 1 : 0.3 }]}>INACTIVE</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={list}
                    style={{ height: '68%' }}
                    showsVerticalScrollIndicator={false}
                    renderItem={(item, index) => (
                        <View key={index} style={[styles.listContainer, { opacity: item.item.disabled ? 0.6 : 1 }]}>
                            <View style={styles.listContainerLeft}>
                                <View style={styles.listImage}>
                                    <SvgXml xml={listimage} />
                                    {item.item.imageIcon && <View style={[styles.imageIcon, { backgroundColor: item.item.dotColor }]} />}
                                </View>
                                <View>
                                    <Text style={styles.listTitle}>{item.item.title}</Text>
                                    <View style={styles.statusView}>
                                        {item.item.statusIcon && <SvgXml style={styles.statusIcon} xml={item.item.statusIcon} />}
                                        <Text style={[styles.listStatus, { color: item.item.statusColor, opacity: item.item.opacity || 1 }]}>{item.item.status}</Text>
                                    </View>
                                </View>
                            </View>
                            {
                                item.item.isButton &&
                                <TouchableOpacity style={styles.listButton}>
                                    <Text style={styles.isButtonText}>Inspect</Text>
                                </TouchableOpacity>
                            }
                            {
                                item.item.optionButton &&
                                <TouchableOpacity style={styles.optionButton} onPress={({ nativeEvent }) => setOpenOption(openOption === item.item.title ? "" : item.item.title)}>
                                    <SvgXml xml={dots} />
                                </TouchableOpacity>
                            }
                            {
                                item.item.inspected &&
                                <SvgXml xml={tick} />
                            }
                            {
                                (openOption === item.item.title) &&
                                <View style={styles.optionsView}>
                                    <TouchableOpacity>
                                        <Text style={styles.optionsList}>EDIT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={styles.optionsList}>VIEW / CHANGE SCHEDULE</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={[styles.optionsList, { color: '#FF3434' }]}>DELETE</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    )}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', backgroundColor: '#191B25', alignItems: 'center' },
    viewContainer: { width: '85%', marginTop: hp("2%"), marginBottom: hp('4%') },
    searchView: { width: '100%', backgroundColor: '#30323B', borderRadius: 10, height: 45, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 15, marginBottom: 10 },
    searchInput: { fontSize: 14, width: '40%', marginLeft: 10, fontFamily: FONT1REGULAR },
    searchIcon: { opacity: 0.4 },
    picker: { height: 50, width: 150, color: "#fff" },
    listContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 },
    listContainerLeft: { flexDirection: 'row', alignItems: 'center' },
    listTitle: { color: '#fff', fontFamily: FONT1REGULAR, fontSize: 16 },
    statusView: { flexDirection: 'row', alignItems: 'center' },
    statusIcon: { marginRight: 5 },
    listStatus: { fontFamily: FONT1REGULAR, fontSize: 12 },
    listImage: { backgroundColor: 'rgba(0,0,0,0.4)', marginRight: 15, width: 62, height: 62, borderRadius: 6, alignItems: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    imageIcon: { marginTop: -60, zIndex: 1, marginLeft: 5, width: 10, height: 10, borderRadius: 10, marginRight: -20 },
    listButton: { backgroundColor: '#16A5EF', height: 30, width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
    isButtonText: { color: '#fff' },
    optionButton: { backgroundColor: 'rgba(255,255,255,0.1)', width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
    optionsView: {
        width: 150, height: 150, right: 5, top: 40, padding: 10, position: 'absolute', backgroundColor: "#191B25",
        shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', zIndex: 1, opacity: 1
    },
    optionsList: { color: 'rgba(255,255,255,0.56)', fontFamily: FONT1BOLD, marginTop: 10, marginBottom: 10 },
    tabs: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, width: '100%', marginTop: hp("1%"), marginBottom: hp("2%") },
    tab: { width: '33%', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
    tabText: { fontFamily: FONT1BOLD, fontSize: hp("2%"), color: COLORS.white },
});
