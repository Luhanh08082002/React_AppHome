import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { MainHeader } from '../../Components'
import { RoomProvicer } from '../../Context/RoomContext'
import TabAddress from './Tabs/TabAddress'
import TabConfirm from './Tabs/TabConfirm'
import TabInformation from './Tabs/TabInformation'
import TabUtilities from './Tabs/TabUtilities'
import Toast from 'react-native-toast-message';
const ExtraRoom = ({ navigation }) => {
    const [isIndex, setIsIndex] = useState(0)
    const Tabs = [
        {
            title: 'Tiện ích',
            content: () =>
                <TabUtilities key={'index2'} />
        },
        {
            title: 'Thông tin',
            content: () =>
                <TabInformation key={'index1'} />
        },
        {
            title: 'Địa Chỉ',
            content: () =>
                <TabAddress key={'index3'} />

        },
        {
            title: 'Xác Nhận',
            content: () =>
                <TabConfirm key={'index3'} />

        }

    ]
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const animate = (isIndex) => {
        Animated.spring(fadeAnim, {
            toValue: isIndex,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        animate(isIndex);
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.toastContainer}>
                <Toast />
            </View>
           
            <MainHeader goBack={navigation.goBack} title="Đăng Phòng" />
            <View style={{ marginHorizontal: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    {
                        Tabs.map((item, index) => {
                            const active = isIndex === index
                            return (
                                <TouchableOpacity
                                    style={[styles.btn_tabs, active ? styles.active : ""]}
                                    key={index}
                                    onPress={() => { setIsIndex(index) }}
                                >
                                    <Animated.Text style={[styles.noActivite, active ? styles.active : ""]}>{item.title}</Animated.Text>
                                </TouchableOpacity>
                            )

                        }

                        )
                    }
                </View>
                <View style={{ paddingTop: 10 }}>
                    <RoomProvicer>
                        {Tabs[isIndex].content()}
                    </RoomProvicer>

                </View>

            </View>

        </View>
    )
}

export default ExtraRoom

const styles = StyleSheet.create({
    btn_tabs: {
        flex: 1,
        paddingBottom: 10,
        alignItems: 'center',
        borderColor: '#CAE1FF',
        borderBottomWidth: 4,
    },
    noActivite: {
        color: '#87CEFF',
        fontWeight: 600,
    },
    active: {
        color: '#6CA6CD',
        fontWeight: 'bold',
        borderColor: '#6CA6CD',
        borderBottomWidth: 4,
        borderRadius: 4,
    },
    toastContainer: {
        zIndex: 9999, 
      },
})