import React from 'react'
import { TouchableOpacity, View ,Text} from 'react-native'

const Buttons = ({title,onPrees}) => {
  return (
    <View style={{width:'100%',position:'relative',bottom:-5}}>
        <TouchableOpacity style={{backgroundColor:'#87CEFF',paddingVertical:15,borderRadius:12}} onPress={onPrees}>
            <Text style={{textAlign:"center", color:'white', fontWeight:'bold',}}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Buttons