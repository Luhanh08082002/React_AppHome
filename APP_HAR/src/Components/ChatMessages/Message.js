import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Message = ({ time, messageText, isLeft }) => {

    const isOnLeft = (type)=>{
        if(isLeft && type === "msgView"){
            return {
                backgroundColor:'#f0f0f0',
                alignSelf:'flex-start'
                
            }
        }
        if(isLeft && type === "msgText"){
            return {
             color:'black',
            }
        }
        else{
            return{
               
            }
        }
    }
    return (
        <View style={styles.container}>
            <View style={[styles.msgContainer,]}>
                <View style={[styles.msgView,isOnLeft('msgView')]}>
                    <Text style={[styles.msgText ,isOnLeft('msgText')]}>{messageText}</Text>
                </View>
                <View style={styles.msgTime}>
                    <Text style={{textAlign:'center',fontSize:12,opacity:0.5,}}>{time}</Text>
                </View>
            </View>

        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    container: {
      
        backgroundColor: 'white',
        paddingHorizontal:10,   
       
    },
    msgContainer:{
        maxWidth:'100%',
        
        
    },
    msgText:{
        maxWidth:'70%',
        color:'white',
        fontWeight:'500',
        fontSize:16

    },
    msgView:{
        alignSelf:'flex-end',
        backgroundColor:'#0084ff',
        padding:12,
        borderRadius:17,
    },
    msgTime:{
        marginTop:10,
        marginBottom:25,
    }
})