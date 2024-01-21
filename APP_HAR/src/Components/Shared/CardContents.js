import React from 'react'
import { Card, CardContent, Title, Paragraph } from 'react-native-paper';
import { Alert, View, To } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CardContents = ({ item, index }) => {
    const firstImageUrl = item.imageRoom.find((url) => url);
    const event = index % 2 === 0;
    const navigation = useNavigation();
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
    return (
        <View style={{
            paddingTop: index === 1 ? 24 : 0,
            paddingLeft: !event ? 7 : 1,
            paddingRight: event ? 7 : 1,
            paddingBottom: 24,
        }}>
            <Card onPress={() => navigation.navigate('RoomDetailScreen', { ParamItem: item, key: index })}>
                <Card.Cover style={{ height: 150, padding: 3 }} source={{ uri: firstImageUrl }} />
                <Card.Content style={{ marginHorizontal: -9 }}>
                    <Paragraph style={{ color: 'gray', fontWeight: '600', fontSize: 13 }}>{item.kindOfRoom}    {item.numberpeople} &#9896;\&#9792;</Paragraph>
                    <Title style={{ fontSize: 16, fontWeight: '600', lineHeight: 17, color: 'black', letterSpacing: -0.5, minHeight: 35 }} numberOfLines={2}>{item.roomName}</Title>
                    <Paragraph style={{ color: 'red', fontSize: 12, fontWeight: 'bold' }}>{Formatnumber(item.price)} Triệu/Phòng</Paragraph>
                    <Paragraph style={{ fontSize: 16, fontWeight: '500', opacity: 0.7, letterSpacing: -1 }}>{item.location}</Paragraph>
                </Card.Content>
            </Card>
        </View>

    )
}

export default CardContents