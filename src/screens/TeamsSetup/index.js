import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppButton, Header, BasicModal } from '../../components';

function TeamsSetup({ navigation }) {
    const [state, setState] = useState({
        skipModal: false,
    })



    const handleContinue = () => {
        navigation.navigate("AddProgramAdministrator")
    }

    const handleSkip = () => {
        setState(pre => ({ ...pre, skipModal: !pre.skipModal }))
    }


    const handleModalClick = () => {
        handleSkip()
        navigation.navigate("SRDPairing")
    }

    const { skipModal } = state;
    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>

                <Header title={"Team Setup"} />
                <View style={styles.centerContainer}>
                    <Text style={styles.centerHeadText}>Setup Teams</Text>
                    <Text style={styles.centerText}>Create teams and define user roles to manage activities within the app.</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton title={"SKIP"} onPress={handleSkip} color={COLORS.greyButton} />
                    <AppButton title={"CONTINUE"} onPress={handleContinue} />
                </View>
            </View>
            <BasicModal
                modalVisible={skipModal}
                closeModalVisible={handleSkip}
                headerTitle={"Skip?"}
                content={'Are you sure you want to skip?  Alerts and notifications through the app will be unavailable until subscription is set up.'}
                buttonTitle={"CONTINUE"}
                handleClick={handleModalClick}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: { alignItems: 'center', width: '100%', flex: 1, backgroundColor: COLORS.primary },
    viewContainer: { alignItems: 'center', flex: 1, width: '90%', justifyContent: 'space-between', marginTop: hp("2%"), marginBottom: hp('4%') },
    centerHeadText: { color: COLORS.white, fontSize: hp("3%"), textAlign: 'center', width: '80%', lineHeight: 27, marginBottom: hp("2%") },
    centerText: { color: COLORS.white, fontSize: hp("2%"), textAlign: 'center', width: '80%', lineHeight: 23, opacity: 0.5 },
    buttonContainer: { width: '100%' },
    centerContainer: { width: '100%', alignItems: 'center' },
});

export default TeamsSetup;