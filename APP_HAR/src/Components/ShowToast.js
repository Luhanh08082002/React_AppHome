import Toast from 'react-native-toast-message'
export const showToast = ({ type, info, title }) => {
      Toast.show({
        type: type,
        text1: info,
        text2: title
      })
    }