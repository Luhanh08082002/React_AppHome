import React from 'react'
import { View, Text} from 'react-native'
import { AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons, Feather, Entypo, Fontisto } from '@expo/vector-icons';

const RoomDirectory = ({title,icon}) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', width: 125, borderWidth: 1, borderColor: '#64004B', borderRadius: 7, padding: 5, }}>
            <AntDesign name={icon} size={20} color="black" />
            <Text style={{ color: '#F8444F', fontWeight: 'bold', paddingLeft: 5 }}>{title}</Text>
        </View>
    )
}

export default RoomDirectory