import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import TextInputs from '../LibraryRoom/TextInputs'
import Buttons from '../LibraryRoom/Buttons'
import { RoomContext } from '../../../Context/RoomContext'
import { MaterialCommunityIcons } from '@expo/vector-icons';
const TabInformation = ({ navigation }) => {
  const {
    acreage, setAcreage,
    rentalPrice, setRentalPrice,
    depositPrice, setDepositPrice,
    service, setService,
    capacity, setCapacity,
    data,
    title, setTitle,
    onChangeText,
    gender, setGender,
    isActiveCheck, setIsActiveCheck,
  } = useContext(RoomContext)
  const genders = [
    'Nam/Nữ',
    'Nam',
    'Nữ',
  ]
  const handleCheckbox = (item, index) => {
    const newIsActiveCheck = [...isActiveCheck];
    const newInputValues = [...service.value];
    // set trạng thái cho checkboxValue === false
    newIsActiveCheck[index] = !newIsActiveCheck[index];
    setIsActiveCheck(newIsActiveCheck);

    // khi checkboxValue === true thi gán giá trị value cho ô input
    if (newIsActiveCheck[index]) {
      newInputValues[index] = 'Miễn Phí';
      setService({value:newInputValues , error:''})
    }
    // và ngược lại
    else {
      newInputValues[index] = '';
      setService({value:newInputValues , error:''})
    }
  };
  const Formatnumber = (text) => {
    if (!text) {
      return ''; // Trả về chuỗi rỗng nếu không có tham số truyền vào
    }
    const cleanedInput = text.replace(/[^0-9]/g, '');
    const number = parseInt(cleanedInput, 10);
    const formattedNumber = number.toLocaleString('vi-VN');
    const formattedValue = `${formattedNumber}`;
    return formattedValue
  };

  const handleInputChange = (text, index) => {
    const newInputValues = [...service.value]
    newInputValues[index] = Formatnumber(text)
    setService({value:newInputValues , error:''})
  };
  return (
    <View style={{ marginHorizontal: 10, height: '92.5%', position: 'relative' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
          <TextInputs
            value={title.value}
            errorText={title.error}
            onChangeText={(text) => setTitle({ value: text, error: '' })}
            activeHeight={true}
            title="Tiêu Đề Bài Đăng"
            placeholder="Nhập tiêu đề bài đăng" />
          <View style={{ marginBottom: 20 }}>
            <View>
              <Text style={{ fontWeight: 500, fontSize: 13, marginBottom: 10 }}>Giới Tính<Text style={{ color: 'red' }}>*</Text></Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
              {
                genders.map((item, index) => {
                  const actives = gender.status === index
                  return (
                    <TouchableOpacity key={index} onPress={() => setGender({ value: item, error: '', status: index })} style={actives ? styles.activeBtn : styles.noActive}>
                      {
                        actives ? <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color="#6CA6CD" paddingHorizontal={5} />
                          :
                          <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="gray" paddingHorizontal={5} />
                      }
                      <Text style={[actives ? styles.activeText : styles.noActiveText, { fontSize: 15 }]}>{item}</Text>
                    </TouchableOpacity>

                  )
                })
              }

            </View>
            {
              gender.error ? <Text style={{ color: 'red', fontSize: 11, paddingTop: 5 }}>{gender.error}</Text> : ''

            }
          </View>

          <TextInputs
            value={acreage.value}
            errorText={acreage.error}
            keyboardType="numeric"
            onChangeText={(text) => setAcreage({ value: text, error: '' })}
            title="Diện tích"
            unit={'\u33A1'}
            placeholder="0" />
          <TextInputs
            value={capacity.value}
            errorText={capacity.error}
            keyboardType="numeric"
            onChangeText={(text) => setCapacity({ value: text, error: '' })}
            title="Sức chứa"
            unit='Người/Phòng'
            placeholder="0" />
          <TextInputs
            value={rentalPrice.value}
            errorText={rentalPrice.error}
            onChangeText={(text) => setRentalPrice({ value: Formatnumber(text), error: '' })}
            keyboardType="numeric"
            title="Tiền Phòng"
            unit='Vnđ/Phòng'
            placeholder="0.0" />
          <TextInputs
            value={depositPrice.value}
            errorText={depositPrice.error}
            onChangeText={(text) => setDepositPrice({ value: Formatnumber(text), error: '' })}
            keyboardType="numeric"
            title="Tiền Cọc"
            unit='Vnđ/Tháng'
            placeholder="0" />
          <View>
            {data.map((item, index) => {
              const isActive = isActiveCheck[index];
              return (
                <View key={index} style={{marginBottom:15}}>
                  <Text style={{ marginBottom: 5, fontSize: 13, fontWeight: 500 ,marginBottom:5}}>
                    {item.label}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1, marginRight: 20 }}>
                      <TextInput
                        style={[!isActive ? styles.ErrorValueInput : '' , styles.valueInput , {position:'relative'}]}
                        keyboardType='numeric'
                        placeholder={'0'}
                        maxLength={18}
                        editable={!isActive}
                        onChangeText={(text) => handleInputChange(text, index)}
                        value={service.value[index]}
                      />
                      <Text style={{position:'absolute' ,fontSize:10,fontWeight:600 , color:'#6CA6CD' ,right:10 , top:15 }}>{item.valuation}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleCheckbox(item, index)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {
                        isActive ?
                          <MaterialCommunityIcons name="checkbox-marked" size={24} color="#6CA6CD" />
                          :
                          <MaterialCommunityIcons name="checkbox-blank-outline" size={22} color="#6CA6CD" />
                      }

                      <Text style={{ fontSize: 13, fontWeight: 500, marginLeft: 5 }}>
                        Miễn Phí
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })
            }

          </View>
        </KeyboardAvoidingView >
      </ScrollView >
      <Buttons title="Bước Tiếp Theo" onPrees={onChangeText} />

    </View >





  )
}
export default TabInformation


const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'lightgray',
  },
  activeButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'lightblue',
  },
  activeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, borderWidth: 1,
    borderColor: '#6CA6CD',
    paddingVertical: 10,
    marginHorizontal: 3,
    borderRadius: 7
  },
  noActive: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
    marginHorizontal: 3,
    borderRadius: 7,
    opacity: 0.8
  },
  activeText: {
    color: "#6CA6CD",
    fontSize: 18,
    fontWeight: 'bold'
  },
  noActiveText: {
    color: 'gray'
  },
  valueInput: {
    fontSize: 16,
    padding: 7,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  ErrorValueInput:{
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    padding: 7,
  }
  
});