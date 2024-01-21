import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {MapsView,SearchPage, LoginScreen, RegisterScreen, ResetPasswordScreen, TabNavigationScreen, RoomDetailScreen, ChatScreen, InformationLandlordScreen, StartScreen, ExtraRoom } from './src/Screens';
import { Add_Itional } from './src/FrameWord/Add_Itional';
import ManaementContract from './src/Components/CategoryManage/ManaementContract';
import ManagementPost from './src/Components/CategoryManage/ManagementPost';
import FavoritePosts from './src/Components/CategoryManage/FavoritePosts';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppProvider } from './src/Context/AppContext'
const Stack = createNativeStackNavigator();
function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('tokenUser');
  //       if (token) {
  //         setIsLoggedIn(true)
  //       } else {
  //         setIsLoggedIn(false)
  //       }
  //     } catch (error) {
  //       showToast({
  //         type: 'error',
  //         info: 'Thông báo lỗi !',
  //         title: error.message,
  //       })
  //     }
  //   }
  //   checkLoginStatus();
  // }, [])

  return (
    <Provider theme={Add_Itional}>
      <NavigationContainer>
        <AppProvider>
          <StatusBar />
          <Stack.Navigator
            initialRouteName='TabNavigationScreen'
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
            <Stack.Screen name='TabNavigationScreen' component={TabNavigationScreen} />
            <Stack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen} />
            <Stack.Screen name='StartScreen' component={StartScreen} />
            <Stack.Screen name='RoomDetailScreen' component={RoomDetailScreen} />
            <Stack.Screen name='ChatScreen' component={ChatScreen} />
            <Stack.Screen name='InformationLandlordScreen' component={InformationLandlordScreen} />
            <Stack.Screen name='ManaementContractScreen' component={ManaementContract} />
            <Stack.Screen name='ManaementPostScreen' component={ManagementPost} />
            <Stack.Screen name='FavoritePostsScreen' component={FavoritePosts} />
            <Stack.Screen name='ExtraRoomScreen' component={ExtraRoom} />

            <Stack.Screen name='SearchPageScreen' component={SearchPage} />
            <Stack.Screen name='MapsViewScreen' component={MapsView} />


          </Stack.Navigator>
        </AppProvider>

      </NavigationContainer>
    </Provider >
  );
}

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
