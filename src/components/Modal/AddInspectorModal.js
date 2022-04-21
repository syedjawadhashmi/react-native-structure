import React from 'react'
import { Modal, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import { COLORS, FONT1BOLD, FONT1REGULAR } from '../../constants'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AppButton, AppInput } from '..';
import { SvgXml } from 'react-native-svg';
import addImage from '../../assets/svg/addImage.svg';
import { Icon, CheckBox } from 'react-native-elements';
import checkIcon from '../../assets/svg/check.svg';


export default function AddInspectorModal({
    modalVisible,
    closeModalVisible,
    headerTitle,
    profile_picture,
    _addImage, buttonTitle,
    handleClick,
    name,
    mobilePhone,
    handleChange,
    leadRole,
    checkboxText,
    checkboxDescription,
    buttonBottomText
}) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                closeModalVisible();
            }}
        >
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <View style={styles.headerView}>
                        <Text style={styles.headerTitle}>{headerTitle}</Text>
                        <TouchableOpacity onPress={() => closeModalVisible()}>
                            <Icon name={"close"} type={"antdesign"} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.addImageContainer} onPress={() => _addImage("profile_picture")}>
                        {
                            profile_picture ?
                                <ImageBackground source={{ uri: profile_picture }} imageStyle={styles.imageStyle} style={styles.ImageView}>
                                    <View style={styles.ImageViewOpacity}>
                                        <SvgXml width={hp("5%")} height={hp("5%")} xml={addImage} />
                                    </View>
                                </ImageBackground>
                                :
                                <View style={styles.ImageView}>
                                    <SvgXml width={hp("5%")} height={hp("5%")} style={styles.addOpacity} xml={addImage} />
                                </View>
                        }
                        <Text style={styles.imageText}>Profile Picture</Text>
                    </TouchableOpacity>
                    <View style={styles.textInputContainer}>
                        <AppInput
                            label={"Name"}
                            placeholder={"Name"}
                            name={'name'}
                            value={name}
                            onChange={handleChange}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <AppInput
                            label={"Mobile Phone"}
                            placeholder={"(415)-123-4567"}
                            name={'mobilePhone'}
                            value={mobilePhone}
                            keyboardType={"phone-pad"}
                            onChange={handleChange}
                        />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            disabled={false}
                            checked={leadRole}
                            titleProps={{ style: { fontWeight: 'normal', color: COLORS.white, opacity: 0.7, } }}
                            title={checkboxText}
                            containerStyle={styles.checkBox}
                            checkedIcon={<View style={styles.checkIcon}><SvgXml xml={checkIcon} /></View>}
                            uncheckedIcon={<View style={styles.uncheckIcon} />}
                            onPress={() => handleChange('leadRole', !leadRole)}
                        />
                    </View>
                    <Text style={styles.checkboxDescription}>{checkboxDescription}</Text>
                    <View style={styles.importContactView}>
                        <Text style={styles.or}>or</Text>
                        <TouchableOpacity>
                            <Text style={styles.importContact}> import from contacts</Text>
                        </TouchableOpacity>
                    </View>
                    <AppButton title={buttonTitle} onPress={handleClick} />
                    <Text style={styles.buttonBottomText}>{buttonBottomText}</Text>
                </View>
            </View>
        </Modal >
    )
}


const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.4)' },
    modalView: {
        backgroundColor: COLORS.primary,
        width: '90%',
        minHeight: 300,
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    headerView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
    headerTitle: { textAlign: "center", fontSize: hp('2.5%'), color: COLORS.white, fontFamily: FONT1BOLD },
    ImageView: { width: hp("10%"), height: hp("10%"), marginRight: 20, borderWidth: 1, borderColor: COLORS.imageBGBorder, borderRadius: 10, backgroundColor: COLORS.imageBG, alignItems: 'center', justifyContent: 'center' },
    ImageViewOpacity: { width: hp("10%"), paddingLeft: 8, height: hp("10%"), borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
    addOpacity: { opacity: 0.3 },
    imageStyle: { borderRadius: 10 },
    textInputContainer: { marginTop: hp("2%"), width: '100%' },
    checkboxContainer: { width: '100%' },
    addImageContainer: { width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: hp('3%') },
    imageText: { fontFamily: FONT1REGULAR, color: COLORS.imageText },
    checkboxDescription: { fontFamily: FONT1REGULAR, color: COLORS.white, opacity: 0.3, fontSize: hp("1.8%"), marginTop: hp("-1%") },
    checkBox: { backgroundColor: 'transparent', borderWidth: 0, marginLeft: -10 },
    uncheckIcon: { borderWidth: 1, width: 20, height: 20, borderRadius: 4, marginRight: 5, borderColor: COLORS.white, opacity: 0.7 },
    checkIcon: { backgroundColor: COLORS.secondary, width: 20, height: 20, marginRight: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
    importContactView: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: hp("3%") },
    or: { fontFamily: FONT1REGULAR, color: COLORS.white, opacity: 0.5 },
    importContact: { fontFamily: FONT1REGULAR, color: COLORS.secondary },
    buttonBottomText: { fontFamily: FONT1REGULAR, color: COLORS.white, opacity: 0.3, fontSize: hp("1.8%"), marginTop: hp("2%"), textAlign: 'center' },
});
