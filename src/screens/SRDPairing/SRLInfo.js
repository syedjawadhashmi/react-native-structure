import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { COLORS, FONT1REGULAR } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppButton, AppInput, BasicModal, Header } from '../../components';
import { SvgXml } from 'react-native-svg'
import checkIcon from '../../assets/svg/check.svg';
import addImage from '../../assets/svg/addImage.svg';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


function SRLInfo({ navigation }) {
    const [state, setState] = useState({
        acceptRole: false,
        name: "",
        location: "",
        employer: "",
        title: "",
        employeeID: "",
        email: "",
        mobilePhone: "",
        profile_picture: "",
        credential: "",
        uploading: false,
        confirmModal: false
    })



    const handleNext = () => {
        setState(pre => ({ ...pre, confirmModal: true }))
    }

    const handleCancel = () => {
        navigation.goBack(null)
    }

    const handleChange = (name, value) => {
        setState(pre => ({ ...pre, [name]: value }))
    }

    const _addImage = async (type) => {
        try {
            const response = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            })
            const uri = response.path;
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
            setState(pre => ({ ...pre, [type]: uploadUri }))
        } catch (error) {
            alert(JSON.stringify(error))
            console.warn('error', error);

        }
    }

    const handleCloseModal = () => {
        setState(pre => ({ ...pre, confirmModal: false }))
    }

    const handleModalClick = () => {
        setState(pre => ({ ...pre, confirmModal: false }))
        navigation.navigate("Home")
    }


    const { title, serialNumber, model, brand, employeeID, email, mobilePhone, confirmModal } = state;

    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>

                <Header title={"SRD Pairing"} />
                <View style={styles.centerContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>SRL INFO</Text>
                    </View>
                    <Text style={styles.subheading}>Fill in SRL info to bind to Radian</Text>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>

                        <View style={styles.textInputContainer}>
                            <AppInput
                                label={"Brand"}
                                placeholder={"Brand"}
                                name={'brand'}
                                value={brand}
                                onChange={handleChange}
                            />
                        </View>
                        <View style={styles.textInputContainer}>
                            <AppInput
                                label={"Model"}
                                placeholder={"Model"}
                                name={'model'}
                                value={model}
                                onChange={handleChange}
                            />
                        </View>
                        <View style={styles.textInputContainer}>
                            <AppInput
                                label={"Serial Number"}
                                placeholder={"Serial Number"}
                                name={'serialNumber'}
                                value={serialNumber}
                                onChange={handleChange}
                            />
                        </View>
                        <View style={styles.textInputContainer}>
                            <AppInput
                                label={"Title"}
                                placeholder={"Title"}
                                name={'title'}
                                value={title}
                                onChange={handleChange}
                            />
                        </View>
                        <View style={styles.textInputContainer}>
                            <AppInput
                                label={"Employee ID"}
                                placeholder={"Employee ID"}
                                name={'employeeID'}
                                value={employeeID}
                                onChange={handleChange}
                            />
                        </View>
                        <View style={styles.textInputContainer}>
                            <AppInput
                                label={"Email"}
                                placeholder={"Email"}
                                name={'email'}
                                value={email}
                                onChange={handleChange}
                            />
                        </View>
                        <View style={styles.textInputContainer}>
                            <AppInput
                                label={"Mobile Phone"}
                                placeholder={"Mobile Phone"}
                                name={'mobilePhone'}
                                value={mobilePhone}
                                keyboardType={"decimal-pad"}
                                onChange={handleChange}
                            />
                        </View>
                        <View style={styles.importContactView}>
                            <Text style={styles.or}>or</Text>
                            <TouchableOpacity>
                                <Text style={styles.importContact}> import from contacts</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.shortButton}>
                        <AppButton title={"BACK"} color={COLORS.greyButton} onPress={handleCancel} />
                    </View>
                    <View style={styles.shortButton}>
                        <AppButton title={"NEXT"} onPress={handleNext} />
                    </View>
                </View>
            </View>
            <BasicModal
                modalVisible={confirmModal}
                closeModalVisible={handleCloseModal}
                headerTitle={"Confirm Role"}
                content={'Please confirm role to proceed. App setup cannot continue until a program administrator has been selected and confirmed.'}
                buttonTitle={"CONTINUE"}
                handleClick={handleModalClick}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '100%', flex: 1, backgroundColor: COLORS.primary },
    viewContainer: { alignItems: 'center', flex: 1, width: '90%', justifyContent: 'space-between', marginTop: hp("2%"), marginBottom: hp('4%') },
    buttonContainer: { width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    centerContainer: { width: '90%', marginTop: hp('2%'), flex: 1, alignItems: 'center' },
    headingContainer: { width: '100%', borderBottomWidth: 1, borderBottomColor: COLORS.secondary, paddingBottom: 5 },
    heading: { fontFamily: FONT1REGULAR, color: COLORS.secondary },
    subheading: { fontFamily: FONT1REGULAR, color: COLORS.white, opacity: 0.6, fontSize: hp('1.8%'), width: '100%', marginTop: hp("1%") },
    shortButton: { width: '48%' },
    scrollView: { width: '100%', marginTop: hp('2%') },
    checkBox: { backgroundColor: 'transparent', borderWidth: 0, marginLeft: -10 },
    uncheckIcon: { borderWidth: 1, width: 20, height: 20, borderRadius: 4, marginRight: 5, borderColor: COLORS.white, opacity: 0.7 },
    checkIcon: { backgroundColor: COLORS.secondary, width: 20, height: 20, marginRight: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
    ImageView: { width: 83, height: 83, marginRight: 20, borderWidth: 1, borderColor: COLORS.imageBGBorder, borderRadius: 10, backgroundColor: COLORS.imageBG, alignItems: 'center', justifyContent: 'center' },
    addOpacity: { opacity: 0.3 },
    addImageContainer: { width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: hp('3%') },
    imageText: { fontFamily: FONT1REGULAR, color: COLORS.imageText },
    textInputContainer: { marginBottom: hp("2%"), width: '100%' },
    importContactView: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: hp("3%") },
    or: { fontFamily: FONT1REGULAR, color: COLORS.white, opacity: 0.5 },
    importContact: { fontFamily: FONT1REGULAR, color: COLORS.secondary },
});

export default SRLInfo;