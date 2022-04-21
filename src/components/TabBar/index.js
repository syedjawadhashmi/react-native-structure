import React, { Fragment } from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg'
import calendar from '../../assets/svg/tabs/calendar.svg';
import calendar_active from '../../assets/svg/tabs/calendar_active.svg';
import device from '../../assets/svg/tabs/device.svg';
import device_active from '../../assets/svg/tabs/device-active.svg';
import mail from '../../assets/svg/tabs/mail.svg';
import mail_active from '../../assets/svg/tabs/mail-active.svg';
import notification_outline from '../../assets/svg/tabs/notification_outline.svg';
import notification_active from '../../assets/svg/tabs/notification-active.svg';
import team from '../../assets/svg/tabs/team.svg';
import team_active from '../../assets/svg/tabs/team-active.svg';
import { COLORS } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';

function TabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <Fragment>

            {/* <LinearGradient colors={['#191B25', '#191B25']} style={{ height: 30 }}>
            </LinearGradient> */}
            <View style={styles.container}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const _getIcon = () => {
                        switch (label) {
                            case 'Devices':
                                return <View style={isFocused && styles.activeTab}><SvgXml xml={isFocused ? device_active : device} /></View>
                            case 'Teams':
                                return <View style={isFocused && styles.activeTab}><SvgXml xml={isFocused ? team_active : team} /></View>
                            case 'Alerts':
                                return <View style={isFocused && styles.activeTab}><SvgXml xml={isFocused ? notification_active : notification_outline} /></View>
                            case 'Messages':
                                return <View style={isFocused && styles.activeTab}><SvgXml xml={isFocused ? mail_active : mail} /></View>
                            default:
                                return <View style={isFocused && styles.activeTab}><SvgXml xml={isFocused ? calendar_active : calendar} /></View>
                        }
                    }

                    return (
                        <TouchableOpacity
                            key={label}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            activeOpacity={0.75}
                            onLongPress={onLongPress}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            {_getIcon()}
                        </TouchableOpacity>
                    )
                })}
            </View>

        </Fragment>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', backgroundColor: COLORS.primary, height: hp("7%"), paddingBottom: hp('2%'),
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.5,
        shadowRadius: 16,
        elevation: 12,
    },
    activeTab: { alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.secondary },
});

export default TabBar