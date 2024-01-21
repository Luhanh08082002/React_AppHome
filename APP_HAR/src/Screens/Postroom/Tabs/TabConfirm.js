import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import TextInputs from '../LibraryRoom/TextInputs'
import Buttons from '../LibraryRoom/Buttons'
import { RoomContext } from '../../../Context/RoomContext'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
const TabConfirm = () => {
  const {
    contact, setContact,
    detail, setDetail,
    onChangeText,
    agreeAll, setAgreeAll
  } = useContext(RoomContext)

  return (
    <View style={{ margin: 10 }}>
      <TextInputs
        value={contact.value}
        errorText={contact.error}
        onChangeText={(text) => setContact({ value: text, error: '' })}
        activeHeight={true}
        keyboardType="numeric"
        title="Số Điện Thoại Liên hệ"
        placeholder="VD: 083334484" />
      <TextInputs
        value={detail.value}
        errorText={detail.error}
        onChangeText={(text) => setDetail({ value: text, error: '' })}
        activeHeight={true}
        title="Mô tả chi tiết"
        placeholder="vui lòng nhập thông tin" />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
        <TouchableOpacity onPress={() => setAgreeAll(!agreeAll)}>
          {
            agreeAll ?
              <MaterialCommunityIcons name="checkbox-marked" size={24} color="#6CA6CD" />
              :
              <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />

          }
        </TouchableOpacity>
        <Text>Yêu Cầu Xác Thực Thông tin</Text>
        <TouchableOpacity onPress={() => ''}>
          <AntDesign name="infocirlceo" size={22} color="#6CA6CD" />
        </TouchableOpacity>
      </View>
      <Buttons title="Xác Nhận" onPrees={onChangeText} />
    </View>
  )
}

export default TabConfirm