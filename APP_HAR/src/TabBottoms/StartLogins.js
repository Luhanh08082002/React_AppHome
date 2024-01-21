import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView, Image } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../Components/Button';
import { Add_Itional } from '../FrameWord/Add_Itional'
export default StartLogins = () => {
    const navigation = useNavigation()
    return (
        <ImageBackground
            source={require('../assets/background_dot2x.png')}
            resizeMode="repeat"
            style={styles.background}
        >
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../assets/logo.png')} style={styles.image} />
                    <Text style={styles.header} >Login To Use</Text>
                    <Text style={styles.text} >Bắt Đầu để tìm Nhà , Căn hộ , Phòng trọ đơn giản nhất, Welcome to home </Text>

                </View>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    LOGIN
                </Button>
                <Button
                    mode="outlined"
                    onPress={() => navigation.navigate('RegisterScreen')}
                >
                    SIGN UP
                </Button>
            </KeyboardAvoidingView>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: Add_Itional.colors.surface,
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 110,
        height: 110,
        marginBottom: 8,
    },
    header: {
        fontSize: 21,
        color: Add_Itional.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
    text: {
        fontSize: 15,
        lineHeight: 21,
        textAlign: 'center',
        marginBottom: 12,
    },
    // container: {
    //     flex: 1,
    //     padding: 20,
    //     width: '100%',
    //     maxWidth: 340,
    //     alignSelf: 'center',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
})
