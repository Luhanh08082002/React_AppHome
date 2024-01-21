import React from 'react'
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const MapsView = ({ navigation }) => {

  const { width, height } = Dimensions.get('window')
  const INITIAL_POSITION = {
    latitude: 16.054407,
    longitude: 108.202164,
    latitudeDelta: 0.3,
    longitudeDelta: 0.06 * (width / height),
  };

  const roomData = [
    { id: 1, name: 'Phòng Trọ cho thuê gần đại học duy tân đại học dư phạm, giá rẻ đầy đủ tiện nghi', latitude: 16.054407, longitude: 108.202164 },
    { id: 2, name: 'Phòng Căn hộ ccho thuê gần đại học FPT , Đại Học Việt Hàn', latitude: 15.980000, longitude: 108.262000 },
    { id: 3, name: 'Căn Hô giá rẻ gần đại học Việt Hàn - FPT  , Cao Đẳng DVTCNH', latitude: 15.976000, longitude: 108.250000 },
    { id: 4, name: 'Phòng Căn hộ ccho thuê gần đại học FPT , Đại Học Việt Hàn', latitude: 15.990000, longitude: 108.267000 },
    { id: 5, name: 'Căn Hô giá rẻ gần đại học Việt Hàn - FPT  , Cao Đẳng DVTCNH', latitude: 15.976000, longitude: 108.250000 },
    { id: 6, name: 'Phòng Căn Hộ cho thuê gần chợ bắc mỹ an , đại học kinh tế', latitude: 15.999900, longitude: 108.262000 },
    { id: 7, name: 'Căn Hô giá rẻ gần đại học Việt Hàn - FPT  , Cao Đẳng DVTCNH', latitude: 16.041000, longitude: 108.250000 },
    { id: 8, name: 'Phòng Căn Hộ cho thuê gần chợ bắc mỹ an , đại học kinh tế', latitude: 16.030000, longitude: 108.252000 },
    { id: 9, name: 'Căn Hô giá rẻ gần đại học Việt Hàn - FPT  , Cao Đẳng DVTCNH', latitude: 16.049000, longitude: 108.230000 },
  ];
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      <TouchableOpacity onPress={() => navigation.navigate('home')} style={{ position: "absolute", zIndex: 250, top: 50, left: 10, backgroundColor: 'transparent', }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'orangered' }}>Thoát</Text>
      </TouchableOpacity>

      <MapView
        style={{ flex: 1, position: 'relative' }}
        PROVIDER_GOOGLE
        initialRegion={INITIAL_POSITION}
        
      >
        {roomData.map((room) => (
          <Marker
            key={room.id}
            coordinate={{
              latitude: room.latitude,
              longitude: room.longitude,
              
            }}
            title={room.name}
          />
        ))}
      </MapView>

    </View>
  )
}

export default MapsView