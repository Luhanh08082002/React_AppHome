import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Add_Itional } from '../FrameWord/Add_Itional'
export default function BackGround({children}) {
    return (
        <ImageBackground
          source={require('../assets/background_dot2x.png')}
          resizeMode="repeat"
          style={styles.background}
        >
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            {children}
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
        paddingHorizontal:20,
        width: '100%',
        alignItems: 'center',
       
      },
    })