import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
const ChatInput = () => {
    const [message, setMessage] = useState('');


    return (
        <View style={styles.inputChat}>
            <TouchableOpacity style={styles.btnIcon}>
                <Ionicons name="add-circle-sharp" size={24} color="#0084ff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIcon}>
                <Ionicons name="camera" size={24} color="#0084ff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIcon}>
                <Ionicons name="image" size={24} color="#0084ff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIcon}>
                <Ionicons name="mic-sharp" size={24} color="#0084ff" />
            </TouchableOpacity>

            <View style={{ width: 180, maxHeight: 140, paddingVertical: 4, backgroundColor: '#f0f0f0', borderRadius: 19, flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>

                <TextInput
                    value={message}
                    style={styles.input}
                    placeholder="Aa"
                    onChangeText={setMessage}
                    editable
                    multiline

                />
                {
                    !message ?
                        <TouchableOpacity style={styles.btnIcon}>
                            <Feather name="smile" size={24} color="#0084ff" />
                        </TouchableOpacity>

                        :
                        <TouchableOpacity style={styles.btnIcon}>
                            <Ionicons name="ios-search-circle" size={24} color="#0084ff" />
                       
                        </TouchableOpacity>
                }

            </View>
            {
                !message ?
                    <TouchableOpacity style={styles.btnIcon}>
                        <AntDesign name="like1" size={24} color="#0084ff" />
                    </TouchableOpacity>

                    :
                    <TouchableOpacity style={styles.btnIcon}>
                        <Ionicons name="send-sharp" size={24} color="#0084ff" />
                    </TouchableOpacity>
                 
            }



        </View>
    )
}

export default ChatInput

const styles = StyleSheet.create({
    // input chat
    inputChat: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        position: 'absolute',
        backgroundColor: 'white',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        width: 145,
        alignContent: 'center',
        paddingLeft: 10,
        fontSize: 19,
    }

})