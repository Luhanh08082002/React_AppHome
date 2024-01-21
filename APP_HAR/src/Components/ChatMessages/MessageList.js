import React, { useState } from 'react'
import { ScrollView, View ,Text} from 'react-native'
import Message from './Message'

const MessageList = () => {
    const [msg , setMsg] = useState([
        {
            user:0,
            time: '6:00',
            userName:"Jos Thế Anh",
            userImg:"",
            messageText:'hello Bạn ơi',
        },
        {
            user:1,
            time: '6:00',
            userName:"Lữ Hành",
            userImg:"",
            messageText:'Vâng Chào Bạn ạ ! bạn đang làm đó , tôi nhớ bạn rồis',
        },
        {
            user:0,
            time: '8:00',
            userName:"Jos Thế Anh",
            userImg:"",
            messageText:'Bạn Đang Làm j Đó Trong ví dụ trên, ChatInput sử dụng một ScrollView để hiển thị danh sách tin nhắn trong messages. Khi số lượng tin nhắn đạt đến 5, phần TextInput và nút "Send" sẽ được thay thế bằng một thông báo "Reached end of messages". Khi người dùng gửi tin nhắn mới, tin nhắn sẽ được thêm vào mảng messages.',
        },
        {
            user:1,
            time: '12:00',
            userName:"Lữ hành",
            userImg:"",
            messageText:'Tôi Đang Code',
        },
        {
            user:0,
            time: '8:25',
            userName:"Jos Thế Anh",
            userImg:"",
            messageText:'ok !',
        }
    ])

    currentUser = 0
  return (
    <ScrollView >
       {
           msg.map((messageItem,index)=>
              <Message key={index} time={messageItem.time} messageText={messageItem.messageText}  isLeft={messageItem.user !== currentUser} />
           )
       }
    </ScrollView>
  )
}

export default MessageList