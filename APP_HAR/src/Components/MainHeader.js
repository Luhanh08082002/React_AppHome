import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MainHeader(props) {
  const { goBack, title, icon_inf, onpress, background } = props
  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack} style={styles.btn_goback}>
          <Image
            style={[styles.image, { resizeMode: 'contain' }]}
            source={require('../assets/arrow_back2x.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headercenter}>
          {title}
        </Text>
        <TouchableOpacity style={styles.btn_icons} onPress={onpress} title="Share">
          <Entypo name={icon_inf} size={28} color="black" style={{ textAlign: 'right' }} />
        </TouchableOpacity>

      </View>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,

  },
  btn_goback: {

  },
  headercenter: {
    marginLeft: -15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
  },
  btn_icons: {

  },
  image: {
    width: 28,
    height: 28,
  },
})