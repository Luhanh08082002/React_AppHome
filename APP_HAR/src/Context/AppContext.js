import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AppContext = createContext({});


export const AppProvider = ({ children }) => {

    const [isUserName, setIsUserName] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // hàm khi realod lại ứng dụng thì ko bị ẩn dữ liệu
    useEffect(() => {
        const userloginToken = async () => {
            const tokenUser = await AsyncStorage.getItem('tokenUser');
            if (tokenUser) {
                setIsLoggedIn(true)
                setIsUserName(tokenUser)
            } else {
                setIsLoggedIn(false)
            }
        }
        userloginToken()
    }, [])
    return <AppContext.Provider value={{ isUserName,setIsUserName, isLoggedIn,setIsLoggedIn}}>
        {children}
    </AppContext.Provider>

}