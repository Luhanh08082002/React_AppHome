import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, FlatList, Alert, TouchableOpacity, Linking, Share } from 'react-native'
import { MainHeader, BackGround } from '../Components';
import { AntDesign, MaterialCommunityIcons, FontAwesome5, MaterialIcons, Ionicons, Feather, Entypo, Fontisto } from '@expo/vector-icons';
import { Card, CardContent, Title, Paragraph } from 'react-native-paper';
import { SEARCH_PLACES, user } from '../data/data';
import { getRoomId, getRooms } from '../Utils/ApiRouters';
import axios from 'axios'
import RoomDirectory from './Postroom/LibraryRoom/RoomDirectory';
import CardContents from '../Components/Shared/CardContents';
import { SafeAreaView } from 'react-native-safe-area-context';
const RoomDetailScreen = ({ navigation, route }) => {
  const { ParamItem } = route.params;
  const [interPost, setInterPost] = useState([])
  const [isUser, setIsUser] = useState({ name: '', phone: '', numberroom: '' });
  let dimensions = Dimensions.get("window");
  let imageHeight = Math.round((dimensions.width * 9) / 15);
  let imageWidth = dimensions.width;
  useEffect(() => {
    const GetUserAccountRoom = (id) => {
      try {
        user.filter((item) => {
          if (id == item.userID) {
            setIsUser({ name: item.name, phone: item.phonenumber, numberroom: item.numberRoom })
          }
        })
      } catch (error) {
        Alert.alert('thông báo lỗi ', error);
      }
    }
    GetUserAccountRoom(ParamItem.userID)
  }, [])

  useEffect(() => {
    const getinterPost = async () => {
      try {
        const result = await axios.get(getRooms)
        const data = result.data.room
        const resultInterPost = data.filter((post) => post._id !== ParamItem._id && post.kindOfRoom.includes(ParamItem.kindOfRoom))
        setInterPost(resultInterPost)
      } catch (error) {
        Alert.alert('thông báo lỗi ', error);
      }
    }
    getinterPost()
  }, [])

  const btn_ShareRoom = async () => {
    try {
      const result = await Share.share({
        url: 'daonj ấkdandkja',
        title: ParamItem.roomName,
        message: ParamItem.title,
      });
      if (result.action == Share.sharedAction) {
        Alert.alert('được chia sẻ với loại hoạt động', result.activityType)
      }
      else {
        Alert.alert('dismissed')
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  const [hoverIndex, setHoverIndex] = useState(null);
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setHoverIndex(index)}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={() => handleMouseLeave()}
      style={{}}
    >
      <Image
        style={{ height: imageHeight, width: imageWidth, resizeMode: 'cover' }}
        resizeMethod={'resize'}
        source={{ uri: item }}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <MainHeader title='CHI TIẾT PHÒNG' goBack={navigation.goBack} icon_inf='share' onpress={btn_ShareRoom} />
      <ScrollView >
        <View>
          <View style={styles.container}>
            <FlatList

              data={ParamItem.imageRoom}
              horizontal
              pagingEnabled
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
            {/* <View style={styles.dotContainer}>
              {isdata.imageRoom.map((_, index) => (
                <View
                  key={index}
                  style={[styles.dot, hoverIndex === index && styles.activeDot]}
                />
              ))}
            </View> */}
          </View>

          <View style={styles.infomations_title}>
            <View>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#777D71' }}> {ParamItem.kindOfRoom}  &#10569; {ParamItem.gioitinh}</Text>
              <Text style={{ fontSize: 18, fontWeight: '600', paddingVertical: 10, lineHeight: 28 }}>{ParamItem.roomName}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', paddingVertical: 10, }}>
                <Text style={{ fontSize: 16, color: '#F8444F', fontWeight: '500', letterSpacing: -1.3 }}>{ParamItem.price} Triệu/Tháng</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>

                  {!ParamItem.agreeAll === true ?
                    <Image source={require('../assets/image_nocheckaccout.png')} style={{ width: 20, height: 20 }} />
                    :
                    <Image source={require('../assets/image_check-success.png')} style={{ width: 20, height: 20 }} />
                  }
                  <Text style={!ParamItem.agreeAll === true ? styles.title_notAccurary : styles.title_Accurary} >
                    {
                      !ParamItem.agreeAll === true ? 'Chưa Kiểm Duyệt' : 'Đã Xác Thực'
                    }

                  </Text>
                </View>
                <MaterialIcons name="favorite-outline" size={24} color="black" />
              </View>
            </View>

            <View style={{ height: 10, marginHorizontal: -10, marginVertical: 20, backgroundColor: 'gray' }}></View>

            <View style={{ borderBottomWidth: 0.2, paddingBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <Ionicons name="location" size={29} color="black" />
                <Text style={{ fontSize: 14, paddingHorizontal: 30, paddingLeft: 5, fontWeight: '400' }}>{ParamItem.address}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <Feather name="phone-call" size={24} color="black" />
                <Text style={{ fontSize: 14, paddingHorizontal: 30, paddingLeft: 10, fontWeight: '400' }}>{ParamItem.contactPhone}</Text>
              </View>
            </View>

            <View style={{ flex: 1, borderBottomWidth: 0.2, borderTopWidth: 0.2, marginVertical: 30, paddingVertical: 15, }}>
              <FlatList
                style={{ width: '100%' }}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={
                  [
                    {
                      title: 'TẦNG',
                      quantitative: ParamItem.informationRoom.tang
                    },
                    {
                      title: 'DIỆN TÍCH',
                      quantitative: ParamItem.informationRoom.khonggian + ' m2'
                    },
                    {
                      title: 'ĐẶT CỌC',
                      quantitative: ParamItem.informationRoom.datcoc + ' VND',
                    },
                    {
                      title: 'SỐ NGƯỜI',
                      quantitative: ParamItem.informationRoom.soNguoi
                    },
                  ]}

                renderItem={({ item, index }) =>
                  <View key={index} style={{ flex: 1, alignItems: 'center', paddingHorizontal: 17 }}>
                    <Text style={{ fontSize: 13, color: 'gray', fontWeight: 'bold', marginBottom: 15 }}>{item.title}</Text>
                    <Text style={{ color: '#6CA6CD', fontWeight: '600' }}>{item.quantitative}</Text>
                  </View>
                } />
            </View>


            <View style={{ height: 10, marginHorizontal: -10, marginVertical: 20, backgroundColor: 'gray' }}></View>

            <View style={{ width: '100%', flex: 1, }}>
              <RoomDirectory title='Dịch Vụ' icon='carryout' />
              <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={{ width: '50%', flexDirection: 'row', padding: 10 }}>
                  <Text style={{ color: 'gray', fontSize: 14, fontWeight: 500 }}>Điện: </Text>
                  <Text style={{ color: '#6CA6CD', fontSize: 12, fontWeight: 400 }}>{ParamItem.service[0]} <Text style={{ color: '#6CA6CD' }}> /kwh</Text></Text>
                </View>

                <View style={{ width: '50%', flexDirection: 'row', padding: 10 }}>
                  <Text style={{ color: 'gray', fontSize: 14, fontWeight: 500 }}>Nước: </Text>
                  <Text style={{ color: '#6CA6CD', fontSize: 12, fontWeight: 400 }}>{ParamItem.service[1]} <Text style={{ color: '#6CA6CD' }}>/Người</Text></Text>
                </View>

                <View style={{ width: '50%', flexDirection: 'row', padding: 10 }}>
                  <Text style={{ color: 'gray', fontSize: 14, fontWeight: 500 }}>Wifi: </Text>
                  <Text style={{ color: '#6CA6CD', fontSize: 12, fontWeight: 300 }}>{ParamItem.service[2]} <Text style={{ color: '#6CA6CD' }}>/Phòng</Text></Text>
                </View>
                <View style={{ width: '50%', flexDirection: 'row', padding: 10 }}>
                  <Text style={{ color: 'gray', fontSize: 14, fontWeight: 500 }}>Wifi: </Text>
                  <Text style={{ color: '#6CA6CD', fontSize: 12, fontWeight: 300 }}>{ParamItem.service[3]} <Text style={{ color: '#6CA6CD' }}>/Phòng</Text></Text>
                </View>

                <View style={{ width: '50%', flexDirection: 'row', padding: 10 }}>
                  <Text style={{ color: 'gray', fontSize: 14, fontWeight: 500 }}>Rác: </Text>
                  <Text style={{ color: '#6CA6CD', fontSize: 12, fontWeight: 400 }}>{ParamItem.service[3]}<Text style={{ color: '#6CA6CD' }}>/Phòng</Text></Text>
                </View>
              </View>
            </View>

            <View style={{ height: 10, marginHorizontal: -10, marginVertical: 20, backgroundColor: 'gray' }}></View>

            <View style={{ width: '100%', flex: 1, }}>
              <RoomDirectory title='Tiện Nghi' icon='carryout' />
              <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                  ParamItem.interior.includes('Vệ sinh khép kín')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialCommunityIcons name="toilet" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Vệ sinh khép kín</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.interior.includes('Có gác')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialCommunityIcons name="stairs" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Có gác</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.interior.includes('ban Công')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialCommunityIcons name="balcony" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>ban Công</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.interior.includes('Ra vào có Vân tay')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <Entypo name="fingerprint" size={24} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Ra vào có Vân tay</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.interior.includes('Không Chung chủ')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <Entypo name="flow-parallel" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Không Chung Chủ</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.interior.includes('Được Nuôi Thú cưng')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <FontAwesome5 name="dog" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Được Nuôi Thú cưng</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.interior.includes('WiFi')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <Ionicons name="md-wifi" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>WiFi</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.interior.includes('Camera An Ninh')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <AntDesign name="videocamera" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Camera An Ninh</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.interior.includes('Tự Do')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <Ionicons name="md-time-outline" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Tự Do</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.interior.includes('Chổ Để Xe')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <Fontisto name="motorcycle" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Chổ Để Xe</Text>
                    </View>
                    :
                    ""
                }
              </View>
            </View>

            <View style={{ height: 10, marginHorizontal: -10, marginVertical: 20, backgroundColor: 'gray' }}></View>

            <View style={{ width: '100%', flex: 1, }}>
              <RoomDirectory title='Nội Thất' icon='API' />
              <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                  ParamItem.facilities.includes('Chăn ga gối')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <Ionicons name="bed-outline" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Chăn Ga Gối</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Điều hoà')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <Entypo name="air" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Điều Hoà</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Kệ bếp')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialCommunityIcons name="stove" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 300, textAlign: 'center', marginTop: 5 }}>Kệ bếp</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Máy giặt')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialCommunityIcons name="washing-machine-alert" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 300, textAlign: 'center', marginTop: 5 }}>Máy giặt</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Đồ Dùng Bếp')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <FontAwesome5 name="utensils" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Đồ Dùng Bếp</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Cây cối trang trí')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <Entypo name="tree" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Cây cối trang trí</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Tủ quần áo')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialCommunityIcons name="wardrobe-outline" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Tủ quần áo</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Nệm')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialIcons name="confirmation-num" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Nệm</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Rèm')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialCommunityIcons name="curtains" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Rèm</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('sofa')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialCommunityIcons name="sofa-single-outline" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>sofa</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Bàn Ghế Phòng khách')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialIcons name="table-chart" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Bàn Ghế Phòng khách</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Bình nóng lạnh')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <FontAwesome5 name="digital-tachograph" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Bình nóng lạnh</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Quạt trần')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialCommunityIcons name="ceiling-fan" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Quạt trầns</Text>
                    </View>
                    :
                    ""
                }

                {
                  ParamItem.facilities.includes('Tủ lạnh')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialIcons name="kitchen" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Tủ lạnh</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Giường Ngủ')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialCommunityIcons name="bed" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Giường Ngủ</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Bàn Ghế Học')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialCommunityIcons name="chair-school" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Bàn Ghế Học</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Đèn Trang Trí')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialCommunityIcons name="ceiling-light-multiple-outline" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Đèn Trang Trí</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Kệ giày dép')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialCommunityIcons name="shoe-heel" size={22} color="#6CA6CD" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Kệ giày dép</Text>
                    </View>
                    :
                    ""
                }
                {
                  ParamItem.facilities.includes('Gương toàn thân')
                    ?
                    <View style={{ alignItems: 'center', width: '25%', padding: 10 }}>
                      <MaterialIcons name="kitchen" size={22} color="gray" />
                      <Text style={{ color: 'gray', fontSize: 13, fontWeight: 400, textAlign: 'center', marginTop: 5 }}>Gương toàn thân</Text>
                    </View>
                    :
                    ""
                }
              </View>
            </View>
            <View style={{ height: 10, marginHorizontal: -10, marginVertical: 20, backgroundColor: 'gray' }}></View>

            <View style={{ width: '100%', flex: 1, }}>
              <RoomDirectory title='Chi Tiết' icon='API' />
              <View style={{ padding: 10 }}>
                <Text style={{ marginTop: 10 }}>{ParamItem.description}</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 16 }}>Tiện ích</Text>
              </View>
            </View>
          </View>
          <View style={{ borderBottomWidth: 5, borderTopWidth: 5, borderColor: 'gray', padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('InformationLandlordScreen')} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <MaterialIcons name="report" size={40} color="#F5CD6C" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>{ParamItem.userName}</Text>
                  <Text style={{ color: '#6CA6CD' }}> {isUser.numberroom} 2 Bài đăng </Text>
                </View>
              </View>
              <MaterialIcons name="report" size={20} color="#F5CD6C" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Bài Đăng Liên Quan</Text>
          <ScrollView
            horizontal
            numberOfLines
            showsHorizontalScrollIndicator={false}
            style={{

            }}>
            <View style={{ flexDirection: 'row', marginRight: 20, marginVertical: 10, marginHorizontal: 5 }}>
              {
                interPost.map((item, i) => {

                  return <View style={{ width: imageWidth / 2.1 }}>
                    <CardContents item={item} index={i} />
                  </View>
                })
              }
            </View>

            {

              interPost.map((item, index) => ''
                // <View key={index} style={{ width: imageWidth / 2, marginRight: 20, marginVertical: 10, marginHorizontal: 5 }}>
                //   <Card onPress={() => navigation.navigate('RoomDetailScreen', { ParamItem: item.id })}>
                //     <Card.Cover style={{ height: 150, padding: 3 }} source={{ uri: item.imageAvatar }} />
                //     <Card.Content style={{ marginHorizontal: -9 }}>
                //       <Paragraph style={{ color: 'gray', fontWeight: '600', fontSize: 13 }}>{item.apartment}    {item.quantity} &#9896;\&#9792;</Paragraph>
                //       <Title style={{ fontSize: 16, fontWeight: '600', lineHeight: 17, color: 'black', letterSpacing: -0.5, minHeight: 35 }} numberOfLines={2}>{item.title}</Title>
                //       <Paragraph style={{ color: 'red', fontSize: 12, fontWeight: 'bold' }}>{item.price} Triệu/Phòng</Paragraph>
                //       <Paragraph style={{ fontSize: 16, fontWeight: '500', opacity: 0.7, letterSpacing: -1 }}>{item.district}</Paragraph>
                //     </Card.Content>
                //   </Card>
                // </View>

              )
            }

          </ScrollView>
        </View>
      </ScrollView >
      <View style={styles.fooderifnomations}>
        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')} style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingHorizontal: 10, backgroundColor: '#F8444F', marginHorizontal: 10 }}>
          <Entypo name="chat" size={20} color="white" />
          <Text style={{ marginLeft: 5, color: 'white', fontWeight: '600', fontSize: 12 }}>CHAT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { Linking.openURL('tel:0832241244'); }} title="Call Helpline" style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'green', borderWidth: 1, borderRadius: 12, padding: 5, marginHorizontal: 10 }}>
          <Feather name="phone" size={20} color="green" />
          <Text style={{ marginLeft: 5, color: 'green', fontWeight: '600', fontSize: 12 }}>GỌI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderColor: '#F8444F', borderRadius: 12, paddingHorizontal: 10, borderWidth: 1, marginHorizontal: 10 }}>
          <Entypo name="creative-commons-attribution" size={20} color="#F8444F" />

          <Text style={{ marginLeft: 5, color: '#F8444F', fontWeight: '600', fontSize: 12 }}>GIỮ CHỔ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderRadius: 12, borderColor: '#F5CD6C', paddingHorizontal: 10, borderWidth: 1, marginHorizontal: 10 }}>
          <MaterialIcons name="report" size={20} color="#F5CD6C" />

          <Text style={{ marginLeft: 5, color: '#F5CD6C', fontWeight: '600', fontSize: 12 }}>BÁO CÁO</Text>
        </TouchableOpacity>

      </View>
    </>
  )
}

export default RoomDetailScreen
const styles = StyleSheet.create({
  container: {
    height: 230,
  },
  infomations_title: {
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: "space-between"

  },
  fooderifnomations: {
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,

  },
  title_Accurary: {
    fontSize: 16, color: 'green', fontWeight: '500', paddingLeft: 4, letterSpacing: -1
  },
  title_notAccurary: {
    fontSize: 16, color: 'red', fontWeight: '500', paddingLeft: 4, letterSpacing: -1
  }
});