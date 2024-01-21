import React, { createContext, useState } from 'react'
import { textValidate } from '../Components/validation/validate'
var currencyFormatter = require('currency-formatter');
import axios from 'axios';
import { addRoom } from '../Utils/ApiRouters';
import { showToast } from '../Components/ShowToast';
import { useNavigation } from '@react-navigation/native';

export const RoomContext = createContext({})
export const RoomProvicer = ({ children }) => {

    const Formatnumber = (text) => {
        if (!text) {
          return ''; // Trả về chuỗi rỗng nếu không có tham số truyền vào
        }
        const cleanedInput = text.replace(/[^0-9]/g, '');
        const number = parseInt(cleanedInput, 10);
        return number;
      };
    const navigation = useNavigation();
    const [loaiphong, setLoaiphong] = useState({ value: "", status: "" })
    const [tiennghi, setTiennghi] = useState({ value: [], status: [] })
    const [notthat, setNoithat] = useState({ value: [], status: [] })
    const [image, setImage] = useState({ value: [], error: '' });
    const [title, setTitle] = useState({ value: "", error: "" })
    const [gender, setGender] = useState({ value: "", status: [], error: "" })
    const [acreage, setAcreage] = useState({ value: "", error: "" })
    const [capacity, setCapacity] = useState({ value: "", error: "" })
    const [rentalPrice, setRentalPrice] = useState({ value: "", error: "" })
    const [depositPrice, setDepositPrice] = useState({ value: "", error: "" })
    const [contact, setContact] = useState({ value: "", error: "" })
    const [detail, setDetail] = useState({ value: "", error: "" })
    const [agreeAll, setAgreeAll] = useState(false)
    const data = [
        {label :'Tiền Điện', valuation: 'VNĐ/Kwh' },
        {label :'Tiền Nước', valuation: 'VNĐ/Người' },
        {label :'Internet/Truyền hình cap', valuation: 'VNĐ/Tháng' },
        {label :'Chổ để xe', valuation: 'VNĐ/Xe' }
    ];
    const [service, setService] = useState({ value: Array(data.length).fill(''), error: "" });
    const [isActiveCheck, setIsActiveCheck] = useState(Array(data.length).fill(false));
    const [province, setProvince] = useState({ value: "", id: "" })
    const [district, setDistrict] = useState({ value: "", id: "" })
    const [ward, setWard] = useState({ value: "", id: "" })
    const [street, setStreet] = useState({ value: "", error: "" })
    const [apartmentNumber, setApartmentNumber] = useState({ value: "", error: "" })

    const onChangeText = async () => {
        const textError = textValidate(title.value)
        const acreageError = textValidate(acreage.value)
        const capacityError = textValidate(capacity.value)
        const genderError = textValidate(gender.value)
        const rentalPriceError = textValidate(rentalPrice.value)
        const depositPriceError = textValidate(depositPrice.value)
        const detailError = textValidate(detail.value)
        const contactError = textValidate(contact.value)
        const imageError = textValidate(image.value)
        const streetError = textValidate(street.value)
        const apartmentNumberError = textValidate(apartmentNumber.value)
        if (textError || acreageError || capacityError || rentalPriceError || depositPriceError || detailError || contactError || imageError ||streetError||apartmentNumberError) {
            setTitle({ ...title, error: textError })
            setAcreage({ ...acreage, error: acreageError })
            setCapacity({ ...capacity, error: capacityError })
            setGender({ ...gender, error: genderError })
            setRentalPrice({ ...rentalPrice, error: rentalPriceError })
            setDepositPrice({ ...depositPrice, error: depositPriceError })
            setContact({ ...contact, error: contactError })
            setDetail({ ...detail, error: detailError })
            setImage({ ...image, error: imageError })
            setStreet({ ...street, error: streetError })
            setApartmentNumber({ ...apartmentNumber, error: apartmentNumberError })

        } else {
            try {
                const { data } = await axios.post(addRoom, {
                    imageRoom: image.value,
                    roomNumber: "phòng 101",
                    roomName: title.value,
                    userName: 'Nguyễn Ngọc Thắng',
                    kindOfRoom: loaiphong.value,
                    gioitinh: gender.value,
                    agreeAll: agreeAll,
                    price: Formatnumber(rentalPrice.value),
                    userID: '84984572',
                    location: province.value,
                    address: province.value + ' ' + district.value+ ' ' +ward.value+ ' ' +street.value + ' ' + apartmentNumber.value,
                    informationRoom: {
                        tang: 1,
                        khonggian: acreage.value,
                        datcoc: Formatnumber(rentalPrice.value),
                        soNguoio: capacity.value
                    },
                    service: service.value,
                    interior: tiennghi.value,
                    facilities: notthat.value,
                    description: detail.value,
                    contactPhone: contact.value,
                })
                if (data.status === true) {
                    // setIsLoading(false)
                    setTimeout(() => {
                        setTimeout(() => {
                            // navigation.navigate('home')
                        }, 1000)
                        showToast({
                            type: 'success',
                            info: 'Đăng Thành Công ',
                            title: 'Bài viết của bạn đã đăng thành công'
                        })
                    }, 500)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    return <RoomContext.Provider
        value={{
            data,
            tiennghi, setTiennghi,
            notthat, setNoithat,
            loaiphong, setLoaiphong,
            title, setTitle,
            gender, setGender,
            image, setImage,
            acreage, setAcreage,
            rentalPrice, setRentalPrice,
            depositPrice, setDepositPrice,
            service, setService,
            capacity, setCapacity,
            contact, setContact,
            detail, setDetail,
            // tỉnh thành
            province, setProvince,
            district, setDistrict,
            ward, setWard,
            street, setStreet,
            apartmentNumber, setApartmentNumber,

            isActiveCheck, setIsActiveCheck,
            onChangeText,
            currencyFormatter,

            agreeAll, setAgreeAll
        }}>
        {children}
    </RoomContext.Provider>
}