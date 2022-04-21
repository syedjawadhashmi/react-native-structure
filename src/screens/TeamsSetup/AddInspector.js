import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS, FONT1REGULAR } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppButton, AddInspectorModal, BasicModal, Header } from '../../components';
import { SvgXml } from 'react-native-svg'
import group from '../../assets/svg/group.svg';
import warningGrey from '../../assets/svg/warningGrey.svg';
import ImagePicker from 'react-native-image-crop-picker';


function AddInspector({ navigation, route }) {
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
        uploading: false,
        confirmModal: false,
        addInspectorModal: false
    })

    const handleNext = () => {
        const { inspectorList } = state;
        const programAdmin = route.params?.programAdmin
        navigation.navigate("AddRescue", { programAdmin, inspectorList });
    }

    const handleCloseConfirmModal = () => {
        setState(pre => ({ ...pre, confirmModal: false }))
    }

    const handleConfirmModalClick = () => {
        setState(pre => ({ ...pre, confirmModal: false }))
        handleModalClick(true)
    }

    const handleOpenConfirmModalClick = () => {
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

    const handleOpenModal = () => {
        setState(pre => ({ ...pre, addInspectorModal: true }))
    }

    const handleCloseModal = () => {
        setState(pre => ({ ...pre, addInspectorModal: false }))
    }

    const handleModalClick = (checked) => {
        const { name, mobilePhone, leadRole, profile_picture, inspectorList } = state;
        const checkLeadRole = inspectorList.some(e => e.leadRole === true)
        if (checkLeadRole && leadRole && checked !== true) {
            handleOpenConfirmModalClick()
            return
        }
        const list = {
            name, mobilePhone, leadRole, profile_picture
        }
        if (leadRole) {
            inspectorList.forEach(element => {
                if (element.leadRole) {
                    element.leadRole = false
                }
            });
        }
        const newlist = inspectorList
        setState(pre => ({
            ...pre, addInspectorModal: false, inspectorList: [...newlist, list],
            name: "", mobilePhone: "", leadRole: false, profile_picture: ""
        }))
    }


    const { name, mobilePhone, leadRole, profile_picture, inspectorList, addInspectorModal, confirmModal } = state;

    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>

                <Header title={"Team Setup"} />
                <View style={styles.centerContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>INSPECTION TEAM</Text>
                    </View>
                    <Text style={styles.subheading}>Add and Confirm Inspection Personnel</Text>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                        <Text style={[styles.selectTeam]}>Select team members authorized to perform SRL inspections for this Radian.</Text>
                        {
                            inspectorList.map((inspector, index) => (
                                <View key={index} style={styles.addContainer}>
                                    <Image source={{ uri: inspector.profile_picture }} style={styles.inspectorImage} />
                                    <View>
                                        <Text style={styles.nametext}>{inspector.name}</Text>
                                        {
                                            inspector.leadRole ?
                                                <View style={styles.subView}>
                                                    <SvgXml xml={group} />
                                                    <Text style={styles.leadtext}>{'Inspection Team Lead'}</Text>
                                                </View>
                                                :
                                                <Text style={styles.addtext}>{"Inspector"}</Text>
                                        }
                                    </View>

                                </View>
                            ))
                        }
                        <TouchableOpacity style={styles.addContainer} onPress={handleOpenModal}>
                            <View style={styles.addIconView}>
                                <Icon name={"plus"} type={"antdesign"} color={COLORS.white} containerStyle={{ opacity: 0.6 }} />
                            </View>
                            <Text style={styles.addtext}>Add Inspector</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.responsibleView}>
                        <SvgXml xml={warningGrey} />
                        <Text style={styles.responsibleText}>The Inspection Team Lead is responsible for overseeing inspection functions.  Please refer to ANSI Z359 for additional information.</Text>
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
            </View>
            <AddInspectorModal
                modalVisible={addInspectorModal}
                closeModalVisible={handleCloseModal}
                handleChange={handleChange}
                name={name}
                mobilePhone={mobilePhone}
                _addImage={_addImage}
                leadRole={leadRole}
                profile_picture={profile_picture}
                headerTitle={"ADD INSPECTOR"}
                contentType={'inspector'}
                checkboxText={'Inspection Team Lead'}
                checkboxDescription={'The Inspection Team Lead is responsible for overseeing inspection functions.  Please refer to ANSI Z359 for additional information.'}
                buttonBottomText={'By hitting confirm, you verify that this person is authorized to perform inspections per the requirements set forth in ANSI Z359.'}
                buttonTitle={"CONFIRM"}
                handleClick={handleModalClick}
            />
            <BasicModal
                modalVisible={confirmModal}
                closeModalVisible={handleCloseConfirmModal}
                headerTitle={"Confirm Role Change"}
                content={'By selecting a new team lead, you confirm that the previously selected team lead will be removed.'}
                buttonTitle={"CONTINUE"}
                handleClick={handleConfirmModalClick}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '100%', flex: 1, backgroundColor: COLORS.primary },
    viewContainer: { alignItems: 'center', flex: 1, width: '90%', justifyContent: 'space-between', marginTop: hp("2%"), marginBottom: hp('4%') },
    bottomContainer: { width: "100%", alignItems: 'center' },
    buttonContainer: { width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    centerContainer: { width: '90%', marginTop: hp('2%'), flex: 1, alignItems: 'center' },
    headingContainer: { width: '100%', borderBottomWidth: 1, borderBottomColor: COLORS.secondary, paddingBottom: 5 },
    heading: { fontFamily: FONT1REGULAR, color: COLORS.secondary },
    subheading: { fontFamily: FONT1REGULAR, color: COLORS.white, opacity: 0.6, fontSize: hp('1.8%'), width: '100%', marginTop: hp("1%") },
    responsibleView: { width: '90%', flexDirection: 'row', alignItems: 'center', marginBottom: hp("1%") },
    responsibleText: { fontFamily: FONT1REGULAR, color: COLORS.white, opacity: 0.3, fontSize: hp('1.8%'), width: '85%', marginTop: hp("1%"), marginLeft: hp("2%") },
    selectTeam: { fontFamily: FONT1REGULAR, color: COLORS.white, opacity: 0.3, fontSize: hp('1.8%'), width: '100%', marginTop: hp("1%"), marginBottom: hp("2%") },
    shortButton: { width: '48%' },
    scrollView: { width: '100%', marginTop: hp('1%') },
    addIconView: { width: 50, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.greyButton, borderRadius: 6 },
    inspectorImage: { width: 50, height: 50, borderRadius: 6 },
    addContainer: { width: "100%", alignItems: 'center', flexDirection: 'row', marginTop: hp("2%") },
    addtext: { fontFamily: FONT1REGULAR, color: COLORS.white, fontSize: hp('1.8%'), marginLeft: 10, opacity: 0.5 },
    leadtext: { fontFamily: FONT1REGULAR, color: COLORS.white, fontSize: hp('1.8%'), marginLeft: 5, opacity: 0.5 },
    nametext: { fontFamily: FONT1REGULAR, color: COLORS.white, fontSize: hp('2.4%'), marginLeft: 10 },
    subView: { flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 2 }
});

export default AddInspector;