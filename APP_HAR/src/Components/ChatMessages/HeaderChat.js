import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
const HeaderChat = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <View style={styles.nodeChat}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name="arrow-back" size={28} color="#0084ff" />
                </TouchableOpacity>

                <View style={styles.titleChat}>
                    <View style={{ position: 'relative', }}>
                        <Avatar.Image style={styles.imgAvatar} size={36} source={require('../../assets/logo.png')} />
                        <View style={{ width: 14, height: 14, backgroundColor: 'green', position: 'absolute', borderRadius: 50, borderWidth: 1.5, borderColor: 'white', bottom: 0, right: 0 }}></View>
                    </View>
                    <View style={styles.textUser}>
                        <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'black' }}>N Ngọc Thắng</Text>
                        <Text style={{ fontSize: 12 }}>Đang hoạt động</Text>
                    </View>
                </View>
                <View style={styles.btnIconChat}>
                    <TouchableOpacity style={styles.btnIcon}>
                        <Ionicons name="call" size={24} color="#0084ff" />
                    </TouchableOpacity >
                    <TouchableOpacity style={[styles.btnIcon, { justifyContent: 'center', position: 'relative' }]}>
                        <FontAwesome5 name="video" size={24} color="#0084ff" />
                        <Entypo style={{ position: 'absolute', left: 23 }} name="dot-single" size={40} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnIcon}>
                        <Entypo name="dots-three-vertical" size={24} color="#0084ff" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default HeaderChat

const styles = StyleSheet.create({
    nodeChat: {
        paddingHorizontal: 10,
        width: '100%',
        height: 55,
        background: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    titleChat: {
        marginRight: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textUser: {
        marginLeft: 7,
    },
    btnIconChat: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: -10

    },
    btnIcon: {
        paddingHorizontal: 10,
    },

})