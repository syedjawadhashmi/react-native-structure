import React from 'react'
import { Modal, StyleSheet, Text, View } from "react-native";
import { COLORS, FONT1REGULAR } from '../../constants'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AppButton } from '..';


export default function BasicModal({ modalVisible, closeModalVisible, headerTitle, content, buttonTitle, handleClick }) {
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
                    <Text style={styles.headerTitle}>{headerTitle}</Text>
                    <Text style={styles.content}>{content}</Text>
                    <AppButton title={buttonTitle} onPress={handleClick} />
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.4)' },
    modalView: {
        backgroundColor: COLORS.primary,
        width: '90%',
        height: 300,
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
    button: { borderRadius: 20, padding: 10, elevation: 2 },
    buttonClose: { backgroundColor: "#2196F3", },
    textStyle: { color: "white", fontWeight: "bold", textAlign: "center" },
    headerTitle: { textAlign: "center", fontSize: hp('4%'), color: COLORS.white, fontFamily: FONT1REGULAR },
    content: { textAlign: "center", fontSize: hp('2%'), color: COLORS.white, fontFamily: FONT1REGULAR, opacity: 0.7, lineHeight: 21 }
});
