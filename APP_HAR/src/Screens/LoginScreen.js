
import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { MainHeader, BackGround, TextInput, Button } from '../Components';

import { Add_Itional } from '../FrameWord/Add_Itional'

import { loginRouter } from '../Utils/ApiRouters'
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { showToast } from '../Components/ShowToast';
import ShowLoadings from '../Components/ShowLoadings';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../Context/AppContext';



export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [isLoading, setIsLoading] = useState(false)
    const {isLoggedIn,setIsLoggedIn,setIsUserName,login} = useContext(AppContext)

    useEffect(()=>{
        if(isLoggedIn === true){
            navigation.navigate('home')
        }
    })
    const emailValidator = (email) => {
        const re = /\S+@\S+\.\S+/
        if (!email) return "Email can't be empty."
        if (!re.test(email)) return 'Ooops! We need a valid email address.'
        return
    }

    const passwordValidator = (password) => {
        if (!password) return "Password can't be empty."
        if (password.length < 5) return 'Password must be at least 5 characters long.'
        return ''
    }
    const onLoginPressed = async () => {

        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        } else {
            setIsLoading(true);
            try {
                const { data } = await axios.post(loginRouter, {
                    email: email.value,
                    password: password.value,
                })
                if (data.status === false) {
                    setIsLoading(false)
                    setTimeout(() => {
                        showToast({
                            type: 'error',
                            info: 'Error !!',
                            title: data.message,
                        })
                    }, 500)

                }
                if (data.status === 500) {
                    showToast({
                        type: 'error',
                        info: 'Error your have !!',
                        title: data.message,
                    })
                }

                if (data.status === true) {
                    setIsLoading(false)
                    setTimeout(() => {
                        showToast({
                            type: 'success',
                            info: 'Success !',
                            title: data.message,
                        })
                        setTimeout(async() => {
                            const currentUser = data.payload
                            AsyncStorage.setItem('tokenUser', currentUser.user)
                            const tokenUser = await AsyncStorage.getItem('tokenUser');
                            setIsUserName(tokenUser)
                            setIsLoggedIn(true)
                            navigation.navigate('home')
                        }, 1000)

                    }, 500)
                }
            } catch (error) {
                setIsLoading(false)
                showToast({
                    type: 'error',
                    info: 'Error  !!',
                    title: error.message,
                })
            }
        }
    }
    return (
        <BackGround >

            {
                isLoading ?
                    <ShowLoadings modalVisible={true} tack={'Your tack'} />
                    : null
            }
            <MainHeader goBack={navigation.goBack} />
            <Image source={require('../assets/logo.png')} style={styles.image} />
            <Text style={styles.header} >Login To Use</Text>

            <TextInput
                label="Email"
                returnKeyType={"next"}
                value={email.value}
                // description="Enter your email address"
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"    // ko cho tự động viết hoa
                autoCompleteType="email" // tự động gợi ý email cho ta khi đã lưu hay ...
                textContentType="emailAddress"
                keyboardType="email-address"

            />
            <TextInput

                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}

                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPasswordScreen')}
                >
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <Button
                mode="contained"
                onPress={onLoginPressed}
            >
                LOGIN
            </Button>
            <View style={styles.row}>
                <Text>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
            <Toast />
        </BackGround>
    )
}

const styles = StyleSheet.create({
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
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    forgot: {
        fontSize: 13,
        color: Add_Itional.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: Add_Itional.colors.primary,
    },
})