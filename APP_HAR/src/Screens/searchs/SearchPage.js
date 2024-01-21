import React, { useEffect, useRef, useState, useCallback } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import Slider from '@react-native-community/slider';
import SearchMasonry from '../../Components/Search/SearchMasonry';
import { getFilterPriceRoom, getRooms, getRoomSearch } from '../../Utils/ApiRouters';
import axios from 'axios';
import ShowLoadings from '../../Components/ShowLoadings';
import Toast from 'react-native-toast-message';
import { showToast } from '../../Components/ShowToast';
import RanglerInput from './RanglerInput';
const SearchPage = ({ navigation, route }) => {
    const [istokenUser, setTokenUser] = useState('')
    useEffect(() => {
        const getUserToken = async () => {
            const tokenUser = await AsyncStorage.getItem('tokenUser');
            setTokenUser(tokenUser)
        }
        getUserToken()
    }, [])

    // if (!istokenUser) {
    //     navigation.navigate('LoginScreen')
    // }
    // const { districtkeywords } = route.params;
    const inputRef = useRef(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isdata, setIsData] = useState([])
    const [isDataSearch, setIsDataSearch] = useState([])
    const [isValueinput, setIsValueInput] = useState('')
    const [value, setValue] = useState({ values: [0, 5000000] })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getRoomPosts = async () => {
            const { data } = await axios.get(getRooms)
            setIsData(data.room.map((item) => item))
        }
        getRoomPosts()
    }, [])

    // useEffect(() => {
    //     const getDistrictRoom = async () => {
    //         const result = await axios.get(getRoomSearch(districtkeywords))
    //         setIsDataSearch(result.data.searchkey)
    //     }
    //     getDistrictRoom()
    // }, [districtkeywords])

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }

    const dataFilterArrange = [
        { title: 'Tin mới', icon: "time-outline" },
        { title: 'Giá cao nhất', icon: "arrow-up-circle-outline" },
        { title: 'Giá thấp nhất', icon: "arrow-down-circle-outline" }
    ]
    const dataFilterRoom = [
        { title: 'Phòng trọ', icon: "home-outline" },
        { title: 'Nhà Nguyên căn', icon: "home-outline" },
        { title: 'Căn Hộ', icon: "home-outline" },
        { title: 'Chưng cư', icon: "home-outline" },
        { title: 'Kí Túc xá', icon: "home-outline" }

    ]
    const handleSearchAll = async () => {
        try {
            setIsLoading(true)
            if (!isValueinput) {
                setIsLoading(false)
                showToast({
                    type: 'error',
                    info: '1 Thông báo dành cho bạn !',
                    title: 'Bạn  vui lòng nhập thông tin tìm kiếm',
                })
            } else {
                const result = await axios.get(getRoomSearch(isValueinput))
                setIsDataSearch(result.data.searchkey)
                setIsValueInput('')
                setIsLoading(false)
            }

        } catch (error) {
            Alert.alert('thông báo lỗi', error)
        }

    }
    const handlefilterPriceRoom = async () => {
        const response = await axios.get(getFilterPriceRoom, {
            params: {
                min: value.values[0],
                max: value.values[1],
            }
        })
        setIsDataSearch(response.data.filterPriceRoom)
        setModalVisible(false)
    }

    const RenderItemfilter = (props) => {
        return (
            <View style={{ paddingVertical: 10, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name={props.icon} size={20} color="gray" />
                    <Text style={{ fontSize: 13, fontWeight: 500, color: 'gray', marginLeft: 10 }}>{props.title}</Text>
                </View>
                <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="gray" />
            </View>
        )
    }


    return (

        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView />
            {
                isLoading ?
                    <ShowLoadings modalVisible={true} tack='Đang tải dữ liệu' />
                    :
                    null
            }
            <View style={{ flex: 1, marginTop: 10, marginHorizontal: 10, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: '#6CA6CD', padding: 7, borderRadius: 10 }} onPress={() => navigation.navigate('home')}>
                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'white' }}>Huỷ</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                        <TextInput
                            style={{ flex: 1, marginHorizontal: 10, paddingHorizontal: 15, paddingVertical: 5, borderWidth: 1, borderColor: '#6CA6CD', borderRadius: 7 }}
                            ref={inputRef}
                            autoFocus={true}
                            value={isValueinput}
                            placeholder="Nhập từ khóa tìm kiếm"
                            // Xử lý logic tìm kiếm khi người dùng nhập liệu
                            onChangeText={(text) => setIsValueInput(text)}
                        />
                        <TouchableOpacity onPress={handleSearchAll} style={{ position: 'absolute', right: 15 }} >
                            <Ionicons name="search" size={24} color="#6CA6CD" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{}} onPress={toggleModal}>
                        <MaterialCommunityIcons style={{ alignItems: "center", textAlign: 'center' }} name="filter-plus-outline" size={24} color="darkkhaki" />
                        <Text style={{ fontSize: 10, fontWeight: 700, color: "darkkhaki" }}>Bộ Lọc</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginVertical: 10 }}>
                    <View>
                        <Text>Khu Vực Tìm Kiếm</Text>
                        <Text style={{ fontSize: 12, fontWeight: 700, color: "darkkhaki" }}>số lượng : <Text style={{ color: '#E33539' }}>{isDataSearch.length}</Text> item</Text>
                    </View>
                    <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false}>
                        <SearchMasonry key={'index'} list={isDataSearch} />
                    </ScrollView>
                    <Toast />
                </View>
            </View>


            <Modal
                isVisible={isModalVisible}
                animationIn="slideInUp"
            >
                <View style={{ flex: 1, backgroundColor: 'white', marginHorizontal: -20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 1, borderColor: 'gray' }}>
                        <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
                            <MaterialIcons name="clear" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, fontWeight: 600 }}>Lọc kết Quả</Text>
                        <TouchableOpacity>
                            <Text style={{ color: 'orangered', fontWeight: 'bold' }}>Bỏ Lọc</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginHorizontal: 10, paddingVertical: 20 }}>

                            <RanglerInput min={0} max={15000000} step={100000} value={value} setValue={setValue} />
                        </View>
                        <View style={{ backgroundColor: 'gainsboro', paddingVertical: 10 }}>
                            <Text style={{ paddingVertical: 10, color: 'gray', marginLeft: 20 }}>SẮP XẾP THEO</Text>
                            <View style={{ backgroundColor: "white", paddingHorizontal: 20 }}>
                                {
                                    dataFilterArrange.map((item) => {
                                        return <RenderItemfilter title={item.title} icon={item.icon} />
                                    })
                                }
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'gainsboro', paddingVertical: 10 }}>
                            <Text style={{ paddingVertical: 10, color: 'gray', marginLeft: 20 }}>Loại Phòng</Text>
                            <View style={{ backgroundColor: "white", paddingHorizontal: 20 }}>
                                {
                                    dataFilterRoom.map((item) => {
                                        return <RenderItemfilter title={item.title} icon={item.icon} />
                                    })
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{ width: "100%", backgroundColor: 'white', padding: 10 }}>
                        <TouchableOpacity onPress={handlefilterPriceRoom} style={{ backgroundColor: 'orangered', paddingVertical: 10, marginHorizontal: 10, borderRadius: 8 }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: 600 }}>Áp Dụng</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </Modal>

        </View>
    )
}

export default SearchPage