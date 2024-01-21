import React from 'react'
import { View, Text, StyleSheet,Image } from 'react-native'
import { MainHeader, BackGround ,TextInput,Button} from '../Components'
import { Add_Itional } from '../FrameWord/Add_Itional'

export default function ResetPasswordScreen({ navigation }) {
  const sendResetPasswordEmail =()=>{
    
  }
  return (
    <BackGround>
      <MainHeader goBack={navigation.goBack} />
      <Image source={require('../assets/logo.png')} style={styles.image} />
      <Text style={styles.header} >Restore PassWord</Text>
      <TextInput
      label = "Email"
      
      description="You will receive email with password reset link."
      />
      <Button

      mode='contained'
      onPress={sendResetPasswordEmail}
      style={{marginTop:16}}
      >SEND INSTRUCTIONS</Button>

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
})
