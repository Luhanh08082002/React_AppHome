import React, { useState, useContext, useEffect } from 'react';
import { RefreshControl, TouchableOpacity, Text, View, StyleSheet, Alert, Button, Image, ScrollView } from 'react-native';
import SlideShow from '../Components/SlideShow';
import { TextInput } from 'react-native-paper';
import { AntDesign, Feather } from '@expo/vector-icons';
import ButtonSearchs from '../Components/Home/ButtonSearchs';
import List_ViewSearch from '../Components/Home/List_ViewSearch';
import Tabs_Item from '../Components/Home/Tabs_Item';
import SearchMasonry from '../Components/Search/SearchMasonry';
import { SEARCH_ALL, SEARCH_PLACES, SEARCH_HOTELS } from '../data/data'
import axios from 'axios';
import { getFindLocation, getRooms } from '../Utils/ApiRouters';
import Modal from "react-native-modal";
export default HomeScreen = ({ navigation, props }) => {
  // const { isUserName, isLoggedIn } = useContext(AppContext)
  // console.log('home','isUserName:', isUserName, 'isLoggedIn:', isLoggedIn,)
  const [issearch, setIsSearch] = useState("");
  const [isdata, setIsData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [iskhuvuc, setIskhuvuc] = useState({ value: 'Đà Nẵng', id: 4 })
  const Tabs = [
    {
      title: 'All',
      content: () => <SearchMasonry key={'index1'} list={isdata} />
    },
    {
      title: 'Places',
      content: () => (
        <SearchMasonry key={'index2'} list={isdata} />
      )
    },
    {
      title: 'Hotels',
      content: () => (
        <SearchMasonry key={'index3'} list={SEARCH_HOTELS} />
      )
    },
  ]

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const databaseKhuvuc = [
    {
      value: "Đà Nẵng", id: 4
    },
    {
      value: "Hà Nội", id: 1
    },
    {
      value: "TP HCM", id: 2
    },
    {
      value: "Thừa Thiên Huế", id: 57
    },
  ]
  const handleFindKhuvuc = (item) => {
    setIskhuvuc({ value: item.value, id: item.id })
    setIsModalVisible(false)
  }
  useEffect(() => {
    const getFindLocations = async () => {
      const response = await axios.get(getFindLocation, {
        params: {
          location: iskhuvuc.value
        }
      })
      setIsData(response.data.data)
    }
    const fetchDataDistrict = async () => {
      try {
        const response = await axios.get(district_url);
        const data_filter = response.data.filter((item) => item.ProvinceId === iskhuvuc.id)
        setDistrict_list(data_filter)
      } catch (error) {
        console.error(error);
      }
    };
    getFindLocations()
    fetchDataDistrict()
  }, [iskhuvuc.value])


  // const [isProvinces, setIsProvinces] = useState([])
  // const [ward_list, setWard_list] = useState([])
  // const provice_url = "https://api.npoint.io/ac646cb54b295b9555be";
  const [district_list, setDistrict_list] = useState([])
  const district_url = "https://api.npoint.io/34608ea16bebc5cffd42";
  // const ward_url = "https://api.npoint.io/dd278dc276e65c68cdf5";

  return (
    <ScrollView style={{ flex: 1 }} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    } >
      <View style={{ flex: 1 }}>
        <SlideShow />
        <View style={styles.findsBox}>
          <View style={styles.findsBox_item}>

            <View style={styles.headerButton_in}>
              <TouchableOpacity
                icon='send'
                style={styles.buttonStyle}
                onPress={() => setIsModalVisible(true)}>
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 13 }}>{iskhuvuc.value}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextInput
                  style={styles.inputStyle}
                  value={issearch}
                  onPressIn={() => navigation.navigate('SearchPageScreen')}
                  onChangeText={(text) => setIsSearch(text)}
                  placeholder="Tìm Kiếm ..." />
                <AntDesign name="search1" size={20} color="blue" style={{ fontWeight: 'bold', position: 'absolute', right: 10 }} />
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <ButtonSearchs router='SearchPageScreen' title="Tìm Theo Nhiều Quận" icon='lightning-bolt-outline' colors="#fafaf5" lineargradient={['#ebdc15', '#f0e660', '#ded228']} />
              <ButtonSearchs router='MapsViewScreen' title="Tìm Gần Nơi Học & Làm" icon='home-lightning-bolt-outline' colors="white" lineargradient={['#18f20c', '#71e86b', '#ade6aa']} />
              <ButtonSearchs router='ExtraRoomScreen' title="Đăng Phòng Cho Thuê" icon='add-business' colors="yellow" lineargradient={['#e326ed', '#d873de', '#e499e8']} />
            </View>

          </View>

        </View>
        <View style={{ width: '100%', paddingHorizontal: 20, backgroundColor: '#f5f3f2' }}>
          <Text style={{ marginVertical: 10, color: 'gray', fontSize: 20, marginTop: -24, fontWeight: 'bold' }}>Tìm Kiếm Xu Hướng</Text>
          <List_ViewSearch title={district_list} />
          <View style={{ width: '100%' }}>
            <Tabs_Item items={Tabs} />
          </View>
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 300, height: 220, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
              <Feather name="map-pin" size={24} color="orangered" />
              <Text style={{ fontSize: 16, color: 'tomato', marginLeft: 10, fontWeight: 'bold' }}>Chọn Khu Vực Tìm Kiếm</Text>
            </View>

            {
              databaseKhuvuc.map((item, index) => {
                return (
                  <TouchableOpacity key={index} style={{ flex: 1 }} onPress={() => handleFindKhuvuc(item)}>
                    <Text style={iskhuvuc.value === item.value ? { color: 'orangered', left: 20 } : { color: 'black', left: 20 }}>Thành Phố {item.value}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  findsBox: {
    alignItems: 'center',
    width: '100%',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },


  },
  findsBox_item: {
    backgroundColor: '#E8E8E8',
    width: '90%',
    top: -40,
    borderRadius: 12,

  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  headerButton_in: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: 60,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,

  },
  buttonStyle: {
    // fontSize:13,
    paddingHorizontal: 5,
    height: '100%',
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  inputStyle: {
    flex: 1,
    backgroundColor: 'azure',
    position: 'relative',
    height: 25,
    fontSize: 13,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    paddingRight: 20,
    paddingVertical: 5,
  },
  // iconStyle: {
  //   position: 'absolute',
  //   right: 20,
  //   bottom: 20,
  // },


  container: {
    width: '100%',
    backgroundColor: '#E8E8E8',
    height: 120,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonSearch_item: {
    width: '20%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  item_icon: {
    width: '80%',
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',

  },

  viewItemText: {
    flex: 1,
    alignItems: 'center',
    marginTop: 12,
  },
  itemText: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    // Phong cách văn bản
  },

})