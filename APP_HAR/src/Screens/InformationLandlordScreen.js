import React from 'react'
import { View, Text, StyleSheet ,Image} from 'react-native'
import { Avatar } from 'react-native-paper'
import { MainHeader } from '../Components'
import { MaterialIcons } from '@expo/vector-icons';
const InformationLandlordScreen = ({ navigation }) => {
  return (
    <View>
      <MainHeader title='THÔNG TIN CHỦ TRỌ' goBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={{ alignItems: 'center'  , borderColor:'#6CA6CD' , borderBottomWidth:1, paddingBottom:20}}>
          <Avatar.Image size={94} source={require('../assets/logo.png')} />
          <Text style={styles.titleName}>NGUYỄN NGỌC THẮNG</Text>
          <Text style={styles.titleAddress}>ĐC: 19 Dương Khuê , Phường Bắc Mỹ An , Quận Ngũ Hành Sơn , TP Đà Nẵng</Text>
        </View>
        <View>
          <Text style={{color:'gray', marginLeft:10 , marginTop:10 , color:'darkorange' , fontWeight:'bold'}}> <Text style={{color:"orangered" , fontWeight:'bold'}}>1</Text> Bài Đăng</Text>
          <View style={styles.card}>
            <View style={styles.ViewLeft}>
              <Image source={require('../assets/imageshome.jpg')} style={styles.image} />
            </View>
            <View style={styles.ViewRight}>
              <View style={{}}>
                <Text style={{ fontSize: 17, fontWeight: 500, textAlign: 'justify' }} numberOfLines={3} ellipsizeMode="tail" s>Phòng trọ cho thuê giá rê chợ bắc mỹ an gần ắc mỹ  Phòng trọ cho thuêan gầnPhòng trọ cho thuê</Text>
                <Text style={{ color: '#FF3333', marginTop: 5, }}>400,000 đ</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Đà Nẵng</Text>
                <MaterialIcons name="favorite-outline" size={24} color="tomato" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default InformationLandlordScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  titleName: {
    marginTop: 10,
    marginBottom: 4,
    color:'#6CA6CD',
    fontSize: 18,
    fontWeight: 'bold'
  },
  titleAddress: {
    textAlign: 'center',
    fontSize: 13,
    color: 'gray',
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