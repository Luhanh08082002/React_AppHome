import axios from 'axios';
import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import { MainHeader, BackGround, TextInput, Button } from '../Components';
import { Add_Itional } from '../FrameWord/Add_Itional'
import { SignUpRouter, loginRouter } from '../Utils/ApiRouters'
import Toast from 'react-native-toast-message';
import { showToast } from '../Components/ShowToast';
import ShowLoadings from '../Components/ShowLoadings';
export default function RegisterScreen({ navigation }) {
  const [isName, setIsName] = useState({ value: '', error: '' })
  const [isemail, setIsEmail] = useState({ value: '', error: '' });
  const [isPassWord, setIsPassWord] = useState({ value: '', error: '' });
  const [isLoading, setIsLoading] = useState(false)

  const nameValidator = (name) => {
    if (!name) return 'UserName không được bỏ trống'
    if (name.length < 6) return 'username không được bé thua 6'
  }
  const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/
    if (!email) return 'Email không được bỏ trống !';
    if (!re.test(email)) return "Email không đúng định dạng !"
    return ''
  }
  const passwordValidator = (password) => {
    if (!password) return 'Mật Khẩu Không Được Bỏ Trống'
    if (password.length < 5) return 'Password must be at least 5 characters long.'
    return ''
  }


  const onSingUpPressed = async () => {
    const nameError = nameValidator(isName.value);
    const emailError = emailValidator(isemail.value);
    const passwordError = passwordValidator(isPassWord.value)
    if (nameError || emailError || passwordError) {
      setIsName({ ...isName, error: nameError })
      setIsEmail({ ...isemail, error: emailError })
      setIsPassWord({ ...isPassWord, error: passwordError })
      return;
    } else {
      try {
        setIsLoading(true)
        const { data } = await axios.post(SignUpRouter, {
          username: isName.value,
          email: isemail.value,
          password: isPassWord.value
        })
        if (data.status === false) {
          setIsLoading(false)
          setTimeout(() => {
            showToast({
              type: 'error',
              info: 'Error SignUp ',
              title: data.checkName ? data.checkName : data.checkEmail
            })
          }, 500)

        } if(data.status === true) {
          setIsLoading(false)
          setTimeout(() => {
            setTimeout(() => {
              navigation.navigate('Home')
            }, 1000)
            showToast({
              type: 'success',
              info: 'Login failed Error',
              title: 'Đăng Ký Thành Công 1 User'
            })
          }, 500)
        }
      } catch (error) {
        setIsLoading(false)
        showToast({
          type: 'error',
          info: 'Error SignUp ',
          title: error.message
        })
      }
    }
  }

  return (

    <BackGround>
      {
        isLoading ?
          <ShowLoadings />
          : null
      }
      <MainHeader goBack={navigation.goBack} />
      <Image source={require('../assets/logo.png')} style={styles.image} />
      <Text style={styles.header} >Create Account</Text>
      <TextInput
        label="UserName"
        value={isName.value}
        onChangeText={(text) => setIsName({ value: text, error: '' })}
        error={!!isName.error}
        errorText={isName.error}

      />
      <TextInput
        label="Email"
        returnKeyType={"next"}
        value={isemail.value}
        onChangeText={(text) => setIsEmail({ value: text, error: '' })}
        error={!!isemail.error}
        errorText={isemail.error}
        autoCapitalize="none"    // ko cho tự động viết hoa
        autoCompleteType="email" // tự động gợi ý email cho ta khi đã lưu hay ...
        textContentType="emailAddress"
        keyboardType="email-address"

      />
      <TextInput
        label="PassWord"
        returnKeyType='done'
        value={isPassWord.value}
        onChangeText={(text) => { setIsPassWord({ value: text, error: '' }) }}
        error={!!isPassWord.error}
        errorText={isPassWord.error}
        secureTextEntry

      />
      <TextInput
        label="PassWord"

      />
      <Button
        mode='contained'
        onPress={onSingUpPressed}
      >SIGN UP</Button>
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
  toastshow: {
    color: 16,
    zIndex: 100
  }
})