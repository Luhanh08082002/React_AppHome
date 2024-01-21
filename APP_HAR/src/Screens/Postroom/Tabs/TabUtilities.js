import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import ItemButon from '../LibraryRoom/ItemButon'
import RoomDirectory from '../LibraryRoom/RoomDirectory'
import { RoomContext } from '../../../Context/RoomContext'
import Buttons from '../LibraryRoom/Buttons'
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
const TabUtilities = ({ route }) => {
  const { tiennghi, setTiennghi, notthat, setNoithat, loaiphong, setLoaiphong, title, setTitle, onChangeText ,setImage , image} = useContext(RoomContext)
  const textKindofroom = [
    'Phòng Trọ',
    'Nhà Nguyên Căn',
    'Căn Hộ',
    'Chung Cư',
    'Kí Túc xá',
  ]
  const convenientRoom = [
    'Vệ sinh khép kín',
    'Có gác',
    'ban Công',
    'Ra vào có Vân tay',
    'Không Chung chủ',
    'Được Nuôi Thú cưng',
    'WiFi',
    'Camera An Ninh',
    'Tự Do',
    'Chổ Để Xe'

  ]
  const interiorRoom = [
    'Điều hoà',
    'Bình nóng lạnh',
    'Kệ bếp',
    'Tủ lạnh',
    'Giường Ngủ',
    'Máy giặt',
    'Đồ Dùng Bếp',
    'Bàn Ghế Học',
    'Đèn Trang Trí',
    'Cây cối trang trí',
    'Tủ quần áo',
    'Chăn ga gối',
    'Nệm',
    'Kệ giày dép',
    'Rèm',
    'Quạt trần',
    'Gương toàn thân',
    'sofa',
    'Bàn Ghế Phòng khách',
  ]

  const handleButtonPress = (item, index) => {
    setLoaiphong({ value: item, status: index });
  };


  const handleConvenientRoom = (item, index) => {
    if (tiennghi.value.includes(item) && tiennghi.status.includes(index)) {
      setTiennghi({ value: tiennghi.value.filter(i => i != item), status: tiennghi.status.filter((i) => i != index) })
    } else {
      setTiennghi({ value: [...tiennghi.value, item], status: [...tiennghi.status, index] })
    }
  }
  const handleInteriorRoom = (item, index) => {
    if (notthat.value.includes(item) && notthat.status.includes(index)) {
      setNoithat({ value: notthat.value.filter(i => i != item), status: notthat.status.filter((i) => i != index) })
    } else {
      setNoithat({ value: [...notthat.value, item], status: [...notthat.status, index] })
    }
  }

  // hàm chọn nhiều ảnh trong thiết bị 
  const handleAddMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: true
    });
    if (result.canceled) {
      console.log('Người dùng đã hủy');
    } else {
      const selectedImage = result.assets.map(asset => asset.uri)
      if (selectedImage) {
        setImage({value:selectedImage , error:''});
      }
    }
  };
  return (
    <View style={{ height: '92.5%', position: 'relative' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
          <View style={{
            height: 140,
            width: '100%',
            borderWidth: 2.5,
            borderStyle: 'dashed',
            borderColor: 'gray',
            borderRadius: 7,
            justifyContent: 'center',
          }}>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleAddMedia}>
              <Feather name="camera" size={54} color="#808080" />
              <Text>Thêm ảnh hoặc Video</Text>
            </TouchableOpacity>
          </View>
          <View style={{ maxHeight: 90, paddingVertical: 5 }}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal >
              {image && image.value.map((item , index) => {
                return <Image key={index} source={{ uri: item }} style={{ marginHorizontal: 2, borderRadius: 7, height: 70, width: 70 }} />
              })}
            </ScrollView>

          </View>
        </View>

        <View>
          <RoomDirectory title='Loại phòng' icon='layout' />
          <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, }}>
            {
              textKindofroom.map((item, index) => {
                const event = index % 2 === 0;
                
                return (
                  <View key={index.toString()} style={{ paddingLeft: !event ? 5 : 0, paddingRight: event ? 5 : 0, width: '50%', paddingVertical: 5, position: 'relative' }}>
                    <ItemButon title={item} onPress={() => handleButtonPress(item, index)} active={index === loaiphong.status} />
                  </View>
                )
              })
            }
          </View>
        </View>
        <View>
          <RoomDirectory title='Tiện Nghi' icon='carryout' />
          <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, }}>
            {
              convenientRoom.map((item, index) => {
                const event = index % 2 === 0;
                return (
                  <View key={index.toString()} style={{ paddingLeft: !event ? 5 : 0, paddingRight: event ? 5 : 0, width: '50%', paddingVertical: 5, position: 'relative' }}>
                    <ItemButon  title={item} onPress={() => handleConvenientRoom(item, index)} active={tiennghi.status.includes(index)} />
                  </View>
                )
              })
            }
          </View>
        </View>

        <View>
          <RoomDirectory title='Nội Thất' icon='API' />
          <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, }}>
            {
              interiorRoom.map((item, index) => {
                const event = index % 2 === 0;
                return (
                  <View key={index.toString()} style={{ paddingLeft: !event ? 5 : 0, paddingRight: event ? 5 : 0, width: '50%', paddingVertical: 5, position: 'relative' }}>
                    <ItemButon title={item} onPress={() => handleInteriorRoom(item, index)} active={notthat.status.includes(index)} />
                  </View>
                )
              })
            }
          </View>
        </View>
      </ScrollView>
      <Buttons title="Bước Tiếp Theo" onPrees={onChangeText} />
    </View>
  )
}

export default TabUtilities
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});
