import React from 'react'
import { View,Text, ScrollView,Image } from 'react-native'
import { MainHeader } from '../Components'

export default TabSharedRoom = ({navigation}) => {
  return (
    <View style={{flex:1 , backgroundColor:'white'}}>
      <MainHeader title="Tìm Bạn Ở Ghép" goBack={()=>navigation.goBack()}/>
      <View style={{borderTopWidth:1, borderColor:'gray' ,opacity:0.5}}>
        <ScrollView>
          <View style={{flexDirection:'row'}}>
            <View style={{marginHorizontal:10,height:120 , width:100 , backgroundColor:'gray'}}>
              <Image source={''} />
            </View>
            <View style={{flex:1}}>
              <Text style={{flex:1}}>Nguyen Ngoc Thang</Text>
              <View>
                <Text style={{flex:1}}>Mức Giá : <Text>100000 vnđ - 500000 vnđ</Text></Text>
              </View>
              <Text style={{flex:1}}>Tìm : <Text>Nam</Text></Text>
              <Text>Vị trí Tìm Kiếm</Text>
              <Text>Quận Ngũ Hành sơn</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    
  </View>
  )
}
