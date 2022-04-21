import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { COLORS, FONT1BOLD, FONT1REGULAR } from '../../constants';
import qrcode from '../../assets/svg/qrcode.svg';
import qrborder from '../../assets/svg/qrborder.svg';
import cameraIcon from '../../assets/svg/camera.svg';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';

function QRScanner({ navigation }) {
    let camera = useRef(null)
    const [state, setState] = useState({
        loading: false
    })


    const takePicture = async () => {
        try {
            navigation.navigate("RadianView")
            // if (camera) {
            //     setState(pre => ({ ...pre, loading: true }))
            //     const options = { quality: 0.5, base64: true };
            //     const data = await camera.takePictureAsync(options);
            //     setState(pre => ({ ...pre, loading: false }))
            //     console.log(data.uri);
            // }
        } catch (error) {
            console.log(error);
            setState(pre => ({ ...pre, loading: false }))

        }
    };


    return (
        <RNCamera
            ref={ref => {
                camera = ref;
            }}
            style={{ flex: 1 }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onBarCodeRead={(barcodes) => {
                console.log(barcodes);
            }}
        >
            <View
                style={styles.container}
            >
                <View style={styles.topContent}>
                    <Text style={styles.heading}>Scan QR Code</Text>
                    <Text style={styles.description}>SCAN QR CODE LOCATED ON DEVICE</Text>
                </View>
                <View style={styles.qrContainer}>
                    <View style={styles.qrborderView}>
                        <SvgXml xml={qrborder} height={hp('50%')} />
                    </View>
                    <SvgXml xml={qrcode} height={hp('50%')} style={{ top: "-100%" }} />
                </View>
                <View style={styles.topContent}>
                    <TouchableOpacity style={styles.camButton} onPress={() => takePicture()}>
                        {state.loading ? <ActivityIndicator color={COLORS.black} size={"small"} /> :
                            <>
                                <SvgXml xml={cameraIcon} />
                                <Text style={styles.buttonText}>TAKE PHOTO</Text>
                            </>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </RNCamera>
    )
}

const styles = StyleSheet.create({
    container: { width: '100%', flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'space-between', alignItems: 'center' },
    topContent: { width: '100%', alignItems: 'center', marginTop: hp('4%') },
    heading: { fontSize: hp("4%"), color: COLORS.white, fontFamily: FONT1REGULAR },
    buttonText: { fontSize: hp("2%"), color: COLORS.black, fontFamily: FONT1BOLD, marginLeft: 15 },
    qrContainer: { height: '50%', alignItems: 'center', justifyContent: 'flex-start' },
    qrborderView: { height: '100%' },
    description: { color: COLORS.white, opacity: 0.6, fontFamily: FONT1REGULAR, fontSize: hp("1.6%") },
    camButton: { backgroundColor: COLORS.white, width: '90%', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 50, marginBottom: 20 }
});

export default QRScanner;
