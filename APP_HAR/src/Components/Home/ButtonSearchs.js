import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Alert, Button } from 'react-native';
import { AntDesign, MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

import {useNavigation} from '@react-navigation/native'

const ButtonSearchs = ({id, title, icon, colors, lineargradient ,router}) => {
 const navigation = useNavigation();


    if (!lineargradient || !Array.isArray(lineargradient)) {
        lineargradient = []; // Hoặc giá trị mặc định khác tùy thích
    }
    const getIconComponents = (iconName) => {
        switch (iconName) {
            case 'add-business':
                return MaterialIcons
            case 'lightning-bolt-outline':
                return MaterialCommunityIcons
            case 'home-lightning-bolt-outline':
                return MaterialCommunityIcons
            default:
                return MaterialIcons
        }
    }
   

    const IconName = getIconComponents(icon);
    return (
        <TouchableOpacity style={styles.buttonSearch_item} onPress={() => {navigation.navigate(router ,{districtkeywords:'Quận'})}}>
            <LinearGradient style={styles.item_icon} colors={lineargradient}>
                <IconName name={icon} size={34} color={colors} style={{ fontWeight: 'bold' }} />
            </LinearGradient>
            <View style={styles.viewItemText}>
                <Text style={styles.itemText}>{title}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default ButtonSearchs

const styles = StyleSheet.create({
    buttonSearch_item: {
        width: '20%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },

    item_icon: {
        width: '80%',
        borderRadius: 20,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',

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