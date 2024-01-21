import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const List_ViewSearch = ({title}) => {
    const navigation = useNavigation()
    const [images, setImages] = useState([
        {
            id: 1,
            image: "https://source.unsplash.com/1024x768/?nature",
            text: 'Ngũ Hành Sơn'
        },
        {
            id: 2,
            image: "https://source.unsplash.com/1024x768/?water",
            text: 'Liên Chiểu'
        },
        {
            id: 3,
            image: "https://source.unsplash.com/1024x768/?girl",
            text: 'Thanh Khê'
        },
        {
            id: 3,
            image: "https://source.unsplash.com/1024x768/?nature",
            text: 'Sơn Trà'
        },
        {
            id: 3,
            image: "https://source.unsplash.com/1024x768/?water",
            text: 'Cẩm Lệ '
        },
        {
            id: 3,
            image: "https://source.unsplash.com/1024x768/?tree",
            text: 'Hải Châu'
        },
    ])
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                {title.map((item, index) => (
                    <TouchableOpacity onPress={()=>navigation.navigate('SearchPageScreen',{districtkeywords:item.Name})} key={index} style={styles.imageContainer}>
                        <Image source={{ uri: 'https://source.unsplash.com/1024x768/?nature' }} style={styles.image_item} />
                        <Text style={styles.text_item}>{item.Name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    imageContainer: {
        padding: 5,
        alignItems: 'center',
    },
    image_item: {
        position: 'relative',
        width: 115,
        height: 110,
        borderRadius: 12,
    },
    text_item: {
        position: 'absolute',
        bottom: 10,
        fontWeight: 'bold',
        fontSize: 13,
        zIndex: 1,
        color: '#FFFFFF', // Màu chữ (trắng)
        textShadowColor: 'rgba(0, 255, 0, 0.7)', // Màu của viền xanh (màu xanh với độ mờ 50%)
        textShadowOffset: { width: 1, height: 1 }, // Độ dịch chuyển của viền (0 pixel ngang và 0 pixel dọc)
        textShadowRadius: 10, // Bán kính của viền (5 pixel)
    }
});
export default List_ViewSearch