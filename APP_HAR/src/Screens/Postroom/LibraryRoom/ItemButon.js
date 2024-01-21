import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Entypo } from '@expo/vector-icons';
import { RoomContext } from '../../../Context/RoomContext';

const ItemButon = ({ title, active, onPress}) => {
    var buttonStyle = active ? styles.activeClick : styles.btn_click;
    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
        >
            {
                active ? <View style={styles.checkView}>
                    <View style={styles.rightTriangle} />
                    <Entypo name="check" size={12} color="white" style={{ top: -20, left: 5 }} />
                </View>
                    : ''
            }

            <Text style={[active ? styles.activeColor : styles.Textcolor, { fontWeight: '600', textAlign: 'center' }]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ItemButon

const styles = StyleSheet.create({

    checkView: {
        position: 'absolute',
        top:-1,
        left:-1,
    },
    rightTriangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 35,
        borderBottomWidth: 20,
        borderColor: '#6CA6CD',
        borderBottomColor: 'transparent',
    },
    btn_click: {
        padding: 10,
        backgroundColor: '#ECECEC',
        borderRadius: 7,
        borderWidth:1,
        borderColor:'#D7D7D7'
    },
    activeClick: {
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#87CEFF',
        borderRadius: 7
    },
    Textcolor: {
        color: 'gray',
        fontWeight: 'bold',
    },
    activeColor: {
        color: '#87CEFF',
        fontWeight: 'bold',
    }

})