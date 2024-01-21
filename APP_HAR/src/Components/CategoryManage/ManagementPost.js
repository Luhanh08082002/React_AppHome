import React from 'react'
import { View ,Text } from 'react-native'
import MainHeader from '../MainHeader'

const ManagementPost = ({navigation}) => {
  return (
    <View>
      <MainHeader goBack={navigation.goBack} title="Quản Lý bài Đăng" />
        <Text>Bài Đăng</Text>
    </View>
  )
}

export default ManagementPost