import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Platform, KeyboardAvoidingViewBase } from 'react-native'
import ChatInput from '../Components/ChatMessages/ChatInput';
import HeaderChat from '../Components/ChatMessages/HeaderChat';
import MessageList from '../Components/ChatMessages/MessageList';
const ChatScreen = ({ navigation }) => {
  return (

    <View style={{ flex: 1, position: 'relative', backgroundColor: 'white' }}>

      <HeaderChat />

      <MessageList />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      >
        <ChatInput />
      </KeyboardAvoidingView>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({

})

