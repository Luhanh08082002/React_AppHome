import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { HomeScreen, TabAccount, TabFavourite, TabInbox, TabSharedRoom } from '../TabBottoms';

import AsyncStorage from '@react-native-async-storage/async-storage'
const Tab = createBottomTabNavigator();


const getIconColor = (focused) => ({
    tintColor: focused ? 'blue' : 'gray',
    resizeMode: focused ? 'stretch' : 'cover'

});

const TabNavigationScreen = () => {
  
    // const Access_decodTonken = async () => {
    //     // const token = await SecureStore.getItemAsync('tokenUser');
    //     console.log(token)
    //     if (token) {
    //         setIsLoginToken(true)
    //     } else {
    //         setIsLoginToken(false)
    //     }
    // }
    // // useEffect(() => {
    // //     const checkLoginStatus=()=>{

    // //     }

    // // }, []) 
    // AsyncStorage.getItem('tokenUser').then(result => {
    //     console.log('result', result)
    //     setIsUser(result)
    // })

    const checkloginUser = () => {
        console.log('hhahahah may')
    }
    return (
        <Tab.Navigator
            initialRouteName="home"
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: styles.tabBar,

            }}>
            <Tab.Screen
                name='home'
                component={HomeScreen}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image source={require('../assets/iconhome.png')} style={[styles.tabBarIcon, getIconColor(focused)]} />
                        </View>
                    )
                }}

            />
            <Tab.Screen
                name={"SharedRoom"}
                component={TabSharedRoom}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image source={require('../assets/roommate.png')} style={[styles.tabBarIcon, getIconColor(focused)]} />
                        </View>
                    )
                }}

            />
            <Tab.Screen
                name={"Favourite"}
                component={TabFavourite}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image source={require('../assets/favorite.png')} style={[styles.tabBarIcon, getIconColor(focused)]} />
                        </View>
                    )
                }}

            />
            <Tab.Screen
                name='Inbox'
                component={TabInbox}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image source={require('../assets/iconUser1.png')} style={[styles.tabBarIcon, getIconColor(focused)]} />
                        </View>
                    )
                }}

            />
            <Tab.Screen
                name='Account'
                component={TabAccount}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image source={require('../assets/iconUser.png')} style={[styles.tabBarIcon, getIconColor(focused)]} />
                        </View>
                    )
                }}

            />
        </Tab.Navigator>
    )
}

export default TabNavigationScreen


const styles = StyleSheet.create({
    tabBar: {
        height: 56,
        backgroundColor: 'white',
        shadowColor: "#000",
    },
    tabBarIcon: {
        width: 32,
        height: 32,


    }
})