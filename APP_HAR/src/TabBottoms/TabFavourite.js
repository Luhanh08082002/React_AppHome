import React, { useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { MainHeader } from '../Components';
import { AppContext } from '../Context/AppContext';
import { MaterialIcons } from '@expo/vector-icons';

export default TabFavourite = ({ navigaton }) => {
  const { isUserName, setIsUserName, isLoggedIn, setIsLoggedIn } = useContext(AppContext)
  console.log('account:', 'isUserName:', isUserName, 'isLoggedIn:', isLoggedIn)
  return (
    <View style={styles.container}>
      <MainHeader title='Yêu Thích' />
      <ScrollView style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.ViewLeft}>
            <Image source={require('../assets/imageshome.jpg')} style={styles.image} />
          </View>
          <View style={styles.ViewRight}>
            <View style={{}}>
              <Text style={{ fontSize: 17, fontWeight: 500 ,textAlign: 'justify'}} numberOfLines={2} ellipsizeMode="tail" s>Phòng trọ cho thuê giá rê chợ bắc mỹ an gần ắc mỹ  Phòng trọ cho thuêan gầnPhòng trọ cho thuê</Text>
              <Text style={{color:'#FF3333',marginTop:5,}}>400,000 đ</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Đà Nẵng</Text>
              <MaterialIcons name="favorite" size={24} color="red" />
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.ViewLeft}>
            <Image source={require('../assets/imageshome.jpg')} style={styles.image} />
          </View>
          <View style={styles.ViewRight}>
            <View style={{}}>
              <Text style={{ fontSize: 17, fontWeight: 500 ,textAlign: 'justify'}} numberOfLines={3} ellipsizeMode="tail" s>Phòng trọ cho thuê giá rê chợ bắc mỹ an gần ắc mỹ  Phòng trọ cho thuêan gầnPhòng trọ cho thuê</Text>
              <Text style={{color:'#FF3333',marginTop:5,}}>400,000 đ</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Đà Nẵng</Text>
              <MaterialIcons name="favorite" size={24} color="red" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    padding: 10,
  },
  card: {
    marginVertical:20,
    width: '100%',
    height: 130,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 12,

    shadowColor:'#000',
    shadowOffset:{
      width:1,
      height:3
    },
    shadowOpacity:0.5,


    // alignItems:'center',
  },
  ViewLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  image: {
    width: 100,
    height: 110,
    resizeMode: 'cover',
    borderRadius:12,
  },
  ViewRight: {
    flexDirection:'column',
    justifyContent:'space-between',
    flex: 1.5,
    paddingHorizontal: 10,
    paddingVertical:10,
  }

})