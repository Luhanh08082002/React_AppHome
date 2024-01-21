import React, { useState } from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
const RanglerInput = ({ min, max, value, setValue, step }) => {
    const multiSliderValuesChange = (values) => {
        setValue({
            values,
        });
    }

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
        <View style={styles.slider_box}>
            <Text style={{ marginLeft: 10, fontWeight: '600', color: '#FF9900' }}> Lọc giá từ {Formatnumber(`${value.values[0]}`)} đến {Formatnumber(`${value.values[1]}`)} vnđ</Text>
            <MultiSlider
                values={[value.values[0], value.values[1]]}
                sliderLength={310}
                selectedStyle={{ backgroundColor: '#CD5808', }}
                containerStyle={{ alignSelf: 'center', marginTop: -10 }}
                onValuesChange={multiSliderValuesChange}
                markerStyle={{
                    ...Platform.select({
                        android: {
                            marginTop: 4,
                            height: 17,
                            width: 17,
                            borderRadius: 50,
                            backgroundColor: '#CD5808'
                        },

                    })
                }}
                trackStyle={{
                    height: 7, // Độ dày của thanh trượt
                    borderRadius: 5, // Độ cong viền của thanh trượt

                }}
                min={min}
                max={max}
                step={step}
            />
        </View>

    )
}

export default RanglerInput
const styles = StyleSheet.create({
    slider_box: {
        backgroundColor: 'rgba(255, 255, 255, 0.19)',
        borderRadius: 10,
        marginTop: 17,
    },
})