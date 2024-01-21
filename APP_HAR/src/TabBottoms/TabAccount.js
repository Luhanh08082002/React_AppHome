import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import { FontAwesome, SimpleLineIcons, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from 'react-native-paper';
import { showToast } from '../Components/ShowToast';
import { StartLogins } from '../TabBottoms';
import { AppContext } from '../Context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default TabAccount = ({ navigation }) => {
  const { isUserName, setIsUserName, isLoggedIn, setIsLoggedIn } = useContext(AppContext)
  console.log('account:', 'isUserName:', isUserName, 'isLoggedIn:', isLoggedIn)

  const userLogoutToken = async () => {
    try {
      await AsyncStorage.removeItem('tokenUser');
      setIsUserName(null)
      setIsLoggedIn(false)
      setTimeout(() => {
        navigation.navigate('home')
      }, 2000);
    } catch (error) {
      console.log('Lỗi đăng xuất người dùng')
    }
  }
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Bạn có muốn đăng xuất không ?',
      [
        {
          text: 'Cancel', onPress: () => console.log('Cancel pressed')
        },
        {
          text: 'Continue', onPress: () => userLogoutToken()
        },
        { defaultIndex: 1 }
      ]
    )
  }
  const dataCategory = [
    {
      Imageicon: require('../assets/category/img_category.png'),
      title: 'Quản lý bài đăng',
      routers: 'ManaementPostScreen'
    },
    {
      Imageicon: require('../assets/category/img_category.png'),
      title: 'Quản lý Khách hàng',
      routers: 'lamhi'
    },
    {
      Imageicon: require('../assets/category/img_hopdong.png'),
      title: 'Hợp đồng',
      routers: 'ManaementContractScreen'
    },
    {
      Imageicon: require('../assets/category/img_baidangyt.png'),
      title: 'Bài đăng yêu thích',
      routers: 'FavoritePostsScreen'
    },
    {
      Imageicon: require('../assets/category/img_dangxuat.png'),
      title: 'Đăng xuất',
      routers: 'lôut',
      clicklogout: handleLogout
    },
  ]

  return (
    <>
      <SafeAreaView />
      {
        isLoggedIn === true ?
          <View style={styles.container}>
            <SafeAreaView backgroundColor='#fc6603' />
            <LinearGradient style={styles.infoAccount} colors={['#fc6603', '#fc7b03', '#eddab9']}>
              <TouchableOpacity style={styles.btnAccounttransfer}>
                <Text style={styles.viewAccounttransfer}>Chuyển tài khoản </Text>
                <FontAwesome name="refresh" size={16} color="#fc6603" />
              </TouchableOpacity>
              <View style={styles.headingAccount}>
                <View style={styles.leftView}>
                  <Avatar.Image source={require('../assets/iconUser.png')} backgroundColor='white' />
                  <View style={{ paddingLeft: 15, }}>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'white' }}>Xin Chào Bạn</Text>
                    <Text style={{ fontSize: 20, paddingVertical: 5, fontWeight: 500, color: 'white', fontWeight: 'bold' }}>{isUserName ? isUserName : ""}</Text>
                    <TouchableOpacity style={{ backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 20, borderBottomLeftRadius: 50, borderTopRightRadius: 50, }}>
                      <Text style={{ fontSize: 12, color: '#fc6603', fontWeight: 'bold' }}>Kích Hoạt Ví</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity style={styles.rightView}>
                  <SimpleLineIcons name="earphones-alt" size={30} color="white" />
                  <Text style={{ color: 'white', fontSize: 14, paddingTop: 5, fontWeight: 500 }}>Trợ giúp</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
            <ScrollView>
              <View style={styles.categoryContainer}>
                {
                  dataCategory.map((item, index) =>
                    <TouchableOpacity key={index} style={styles.itemCategory} onPress={() => item.clicklogout()}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 20, height: 25, resizeMode: 'cover' }} source={item.Imageicon} />
                        <Text style={{ marginLeft: 15, fontSize: 16, fontWeight: 700, color: 'gray' }}>{item.title}</Text>
                      </View>
                      <EvilIcons name="chevron-right" size={24} color="black" />
                    </TouchableOpacity>
                  )
                }

              </View>

            </ScrollView>

          </View>
          :
          <StartLogins />
      }
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  infoAccount: {
    height: 230,
    backgroundColor: 'blue',
    borderBottomRightRadius: 35,
    borderBottomStartRadius: 35,
  },
  btnAccounttransfer: {
    marginVertical: 30,
    paddingVertical: 5,
    paddingLeft: 20,
    width: 170,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  viewAccounttransfer: {
    fontFamily: '',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#fc6603'
  },
  headingAccount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  leftView: {
    flexDirection: 'row',
  },
  rightView: {
    flexDirection: 'column',
    alignItems: 'center'
  },


  categoryContainer: {

    marginTop: 20,
    marginHorizontal: 30,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  itemCategory: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: 'gray'
  }


})