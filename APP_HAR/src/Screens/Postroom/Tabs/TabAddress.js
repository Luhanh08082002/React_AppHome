import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import axios from 'axios'
import { RoomContext } from '../../../Context/RoomContext';
import Buttons from '../LibraryRoom/Buttons'
import TextInputs from '../LibraryRoom/TextInputs';
// import { TextInput } from 'react-native-paper'
const TabAddress = (props) => {
    const {
        province, setProvince,
        district, setDistrict,
        ward, setWard,
        street, setStreet,
        apartmentNumber, setApartmentNumber,
        onChangeText
    } = useContext(RoomContext)
    const [isProvinces, setIsProvinces] = useState([])
    const [district_list, setDistrict_list] = useState([])
    const [ward_list, setWard_list] = useState([])
    const provice_url = "https://api.npoint.io/ac646cb54b295b9555be";
    const district_url = "https://api.npoint.io/34608ea16bebc5cffd42";
    const ward_url = "https://api.npoint.io/dd278dc276e65c68cdf5";

    const fetchDataProvice = async () => {
        try {
            const response = await axios.get(provice_url);
            setIsProvinces(response.data)
        } catch (error) {
            console.error(error);
        }
    };
    const fetchDataDistrict = async () => {
        try {
            const response = await axios.get(district_url);
            const data_filter = response.data.filter((item) => item.ProvinceId === province.id)
            setDistrict_list(data_filter)
        } catch (error) {
            console.error(error);
        }
    };
    const fetchDataWard = async () => {
        try {
            const response = await axios.get(ward_url);
            const data_filter = response.data.filter((item) => item.DistrictId === district.id)
            setWard_list(data_filter)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataProvice()
    }, [])
    useEffect(() => {
        fetchDataDistrict();
    }, [province.id]);
    useEffect(() => {
        fetchDataWard();
    }, [district.id]);


    return (
        <View style={styles.container}>

            <View style={styles.list_TextInput}>
                <Text style={{ color: 'gray', fontWeight: 600, marginBottom: 10 }}>{props.textLable}</Text>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <SelectDropdown
                        data={isProvinces.map((item) => item.Name)}
                        key='index1'
                        onSelect={(selectedItem, index) => {
                            const selectedDistrict = isProvinces.find(
                                (item) => item.Name === selectedItem
                            );
                            setProvince({ value: selectedItem, id: selectedDistrict.Id });
                        }}
                        renderDropdownIcon={isOpened => {
                            return <FontAwesome
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={'black'}
                                size={15}
                            />;
                        }}
                        buttonTextAfterSelection={() => province.value}

                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                        buttonStyle={styles.input}
                        buttonTextStyle={styles.textInput}
                    />
                </View>
            </View>
            <View style={styles.list_TextInput}>
                <Text style={{ color: 'gray', fontWeight: 600, marginBottom: 10 }}>{props.textLable}</Text>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <SelectDropdown
                        data={district_list.map((item) => item.Name)}
                        key='index2'
                        onSelect={(selectedItem, index) => {
                            const selectedWard = district_list.find((item) => item.Name === selectedItem)
                            setDistrict({ value: selectedItem, id: selectedWard.Id })
                        }}
                        renderDropdownIcon={isOpened => {
                            return <FontAwesome
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={'black'}
                                size={15}
                            />;
                        }}
                        buttonTextAfterSelection={() => district.value ? district.value : "Custom Text"}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        buttonStyle={styles.input}
                        buttonTextStyle={styles.textInput}
                    />
                </View>
            </View>
            <View style={styles.list_TextInput}>
                <Text style={{ color: 'gray', fontWeight: 600, marginBottom: 10 }}>{props.textLable}</Text>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <SelectDropdown
                        data={ward_list.map((item) => item.Name)}
                        key='index3'
                        onSelect={(selectedItem, index) => {
                            setWard({ value: selectedItem, id: '' })
                        }}
                        renderDropdownIcon={isOpened => {
                            return <FontAwesome
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={'black'}
                                size={15}
                            />;
                        }}
                        buttonTextAfterSelection={() => ward.value}

                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                        buttonStyle={styles.input}
                        buttonTextStyle={styles.textInput}
                    />
                </View>
            </View>
            <TextInputs
                value={street.value}
                title='Tên đường , Thôn / Xóm'
                placeholder='vd: đường 19/5 Quốc lộ 1 '
                errorText={street.error}
                onChangeText={(text) => setStreet({ value: text, error: '' })}
            />
            <TextInputs
                title='Số Nhà'
                value={apartmentNumber.value}
                placeholder='vd: 19 Dương Khuê'
                errorText={apartmentNumber.error}
                onChangeText={(text) => setApartmentNumber({ value: text, error: '' })}
            />
            <Buttons title="Bước Tiếp Theo" onPrees={onChangeText} />
        </View>
    )
}

export default TabAddress

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        marginVertical: 20,
    },
    list_TextInput: {
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 7,
    },
    textInput: {

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0008'
    },
    modalView: {
        width: 200,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 17,
        textAlign: 'center',
        marginLeft: 15,
        marginVertical: 15,
    }

})

