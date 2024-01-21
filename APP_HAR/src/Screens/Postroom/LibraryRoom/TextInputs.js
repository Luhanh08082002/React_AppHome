import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

const TextInputs = ({ activeHeight, errorText, title, unit, ...props }) => {

    return (
        <View style={{marginBottom:20}}>
            <View style={{ borderBottomWidth: 1, borderColor: 'gray' }}>
                <Text style={{ fontSize: 13, fontWeight: 500 }}>
                    {title} <Text style={{ color: 'red', fontSize: 16 }}>*</Text>
                </Text>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', position: 'relative'
                }}>
                    <TextInput
                        style={[styles.Textinput, errorText ? styles.error : '', activeHeight ? styles.heightActive : '']}
                        multiline
                        // placeholderTextColor={errorText ? 'red' : null}
                        {...props}
                    />
                    <Text style={{ marginLeft: 10, fontWeight: 600, color: '#6CA6CD' }}>{unit}</Text>
                </View>
            </View>


            {
                errorText ? <Text style={{ color: 'red', fontSize: 11, paddingTop: 5 }}>{errorText}</Text> : ''
            }
        </View>
    )
}

export default TextInputs

const styles = StyleSheet.create({
    Textinput: {
        flex: 1,
        paddingVertical: 5,
        lineHeight: 24,
        color: 'gray',
        opacity: 1,
        fontSize: 16,
    },
    heightActive: {
        maxHeight: 140,
    },
    error: {
        borderColor: 'red',
    },

})