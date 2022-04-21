import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { COLORS, FONT1REGULAR } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppButton, AddInspectorModal, Header } from '../../components';
import { SvgXml } from 'react-native-svg'
import confirmTeam from '../../assets/svg/confirmTeam.svg';
import menuHorizontal from '../../assets/svg/menuHorizontal.svg';
import ImagePicker from 'react-native-image-crop-picker';


function ConfirmTeam({ navigation, route }) {
    const [state, setState] = useState({
        leadRole: false,
        name: "",
        location: "",
        employer: "",
        title: "",
        employeeID: "",
        email: "",
        mobilePhone: "",
        profile_picture: "",
        inspectorList: [],
        rescueList: [],
        uploading: false,
        confirmModal: false,
        updateMemberModal: false,
        type: "",
        listIndex: null
    })

    useEffect(() => {
        const inspectorList = route.params?.inspectorList
        const rescueList = route.params?.rescueList
        if (inspectorList?.length) {
            setState(pre => ({ ...pre, inspectorList }))
        }
        if (rescueList?.length) {
            setState(pre => ({ ...pre, rescueList }))
        }
    }, [route])

    const handleNext = () => {
        navigation.navigate("SRDPairing");
    }


    const handleOpenModal = (member, type, index) => {
        setState(pre => ({
            ...pre, updateMemberModal: true, type: type, listIndex: index,
            name: member?.name,
            mobilePhone: member?.mobilePhone,
            leadRole: member?.leadRole,
            profile_picture: member?.profile_picture,
            headerTitle: type === "inspector" ? "ADD INSPECTOR" : "ADD RESCUER",
            checkboxText: type === "inspector" ? "Inspection Team Lead" : "Rescue Team Lead",
            checkboxDescription: type === "inspector" ? "The Inspection Team Lead is responsible for overseeing inspection functions.  Please refer to ANSI Z359 for additional information." : "The Rescue Team Lead is responsible for overseeing rescue functions.  Please refer to ANSI Z359 for additional information.",
            buttonBottomText: type === "inspector" ? "By hitting confirm, you verify that this person is authorized to perform inspections per the requirements set forth in ANSI Z359." : "By hitting confirm, you verify that this person is authorized to perform rescues per the requirements set forth in ANSI Z359.",
        }))
    }

    const handleCloseModal = () => {
        setState(pre => ({ ...pre, updateMemberModal: false }))
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

    const handleModalClick = (checked) => {
        const { name, mobilePhone, leadRole, profile_picture, inspectorList, rescueList, type, listIndex } = state;
        const list = type === "inspector" ? inspectorList : rescueList
        const stateType = type === "inspector" ? "inspectorList" : "rescueList"
        // const checkLeadRole = list.some(e => e.leadRole === true)
        // if (checkLeadRole && leadRole && checked !== true) {
        //     // handleOpenConfirmModalClick()
        //     return
        // }

        list[listIndex].name = name
        list[listIndex].mobilePhone = mobilePhone
        list[listIndex].leadRole = leadRole
        list[listIndex].profile_picture = profile_picture


        setState(pre => ({
            ...pre, updateMemberModal: false, [stateType]: list,
            name: "", mobilePhone: "", leadRole: false, profile_picture: ""
        }))
    }


    const programAdmin = route.params?.programAdmin
    const { name, mobilePhone, leadRole, profile_picture, headerTitle, checkboxText, inspectorList, rescueList, checkboxDescription, buttonBottomText, updateMemberModal } = state;
    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>
                <Header title={"Team Setup"} back left={"5%"} right={"-5%"} />
                <View style={styles.centerContainer}>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>CONFIRM TEAM</Text>
                        </View>
                        <Text style={styles.subheading}>Confirm details are accurate</Text>
                        <SvgXml width={"100%"} xml={confirmTeam} style={styles.confirmTeam} />
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>TEAM MEMBERS</Text>
                        </View>
                        <View style={styles.programAdmin}>
                            <View style={styles.listContainer}>
                                <View style={styles.listLeftSide}>
                                    <Image source={{ uri: programAdmin?.profile_picture }} style={styles.listImage} />
                                    <View>
                                        <Text style={styles.nameText}>{programAdmin.name}</Text>
                                        <Text style={styles.designationText}>{"Program Administrator"}</Text>
                                    </View>

                                </View>
                                <TouchableOpacity>
                                    <SvgXml xml={menuHorizontal} />
                                </TouchableOpacity>
                            </View>
                            <AppButton title={"CONTACT"} />
                        </View>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>INSPECTION TEAM</Text>
                        </View>
                        {
                            inspectorList?.map((inspector, i) => (
                                <View key={i} style={styles.inspectorListContainer}>
                                    <View style={styles.listLeftSide}>
                                        <Image source={{ uri: inspector?.profile_picture }} style={styles.listImage} />
                                        <View>
                                            <Text style={styles.nameText}>{inspector.name}</Text>
                                            <Text style={styles.designationText}>{"Authorized Inspector"}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => handleOpenModal(inspector, "inspector", i)}>
                                        <SvgXml xml={menuHorizontal} />
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>RESCUE TEAM</Text>
                        </View>
                        {
                            rescueList?.map((rescuer, i) => (
                                <View key={i} style={styles.inspectorListContainer}>
                                    <View style={styles.listLeftSide}>
                                        <Image source={{ uri: rescuer?.profile_picture }} style={styles.listImage} />
                                        <View>
                                            <Text style={styles.nameText}>{rescuer.name}</Text>
                                            <Text style={styles.designationText}>{"Authorized Inspector"}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => handleOpenModal(rescuer, "rescuer", i)}>
                                        <SvgXml xml={menuHorizontal} />
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>OTHER TEAM MEMBERS </Text>
                        </View>
                    </ScrollView>
                </View>
                <AppButton title={"FINISH TEAM SETUP"} onPress={handleNext} />
            </View>
            <AddInspectorModal
                modalVisible={updateMemberModal}
                closeModalVisible={handleCloseModal}
                handleChange={handleChange}
                name={name}
                mobilePhone={mobilePhone}
                _addImage={_addImage}
                leadRole={leadRole}
                profile_picture={profile_picture}
                headerTitle={headerTitle}
                checkboxText={checkboxText}
                checkboxDescription={checkboxDescription}
                buttonBottomText={buttonBottomText}
                buttonTitle={"CONFIRM"}
                handleClick={handleModalClick}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '100%', flex: 1, backgroundColor: COLORS.primary },
    viewContainer: { alignItems: 'center', flex: 1, width: '90%', justifyContent: 'space-between', marginTop: hp("2%"), marginBottom: hp('4%') },
    centerContainer: { width: '90%', marginTop: hp('2%'), flex: 1, alignItems: 'center' },
    headingContainer: { width: '100%', borderBottomWidth: 1, borderBottomColor: COLORS.secondary, paddingBottom: 5, marginTop: hp("2%") },
    heading: { fontFamily: FONT1REGULAR, color: COLORS.secondary },
    subheading: { fontFamily: FONT1REGULAR, color: COLORS.white, opacity: 0.6, fontSize: hp('1.8%'), width: '100%', marginTop: hp("1%") },
    scrollView: { width: '100%', marginTop: hp('1%') },
    confirmTeam: { marginBottom: hp('2%') },
    listImage: { width: 50, height: 50, borderRadius: 6, marginRight: hp("2%") },
    programAdmin: { width: '100%', borderWidth: 1, borderColor: COLORS.borderColor, marginTop: 20, borderRadius: 10, padding: 15 },
    listContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    inspectorListContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 },
    listLeftSide: { flexDirection: 'row', alignItems: 'center', width: '80%', },
    nameText: { fontSize: hp("2.4%"), color: COLORS.white, fontFamily: FONT1REGULAR },
    designationText: { fontSize: hp("1.8%"), color: COLORS.white, fontFamily: FONT1REGULAR, opacity: 0.6 },
});

export default ConfirmTeam;