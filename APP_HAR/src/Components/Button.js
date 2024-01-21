import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { Add_Itional } from '../FrameWord/Add_Itional';


export default function Button({ mode, style, ...props }) {
    return (
        <PaperButton
            style={[
                styles.button,
                mode === 'outlined' && { backgroundColor: Add_Itional.colors.surface },
                style,
            ]}
            labelStyle={styles.text}
            mode={mode}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        width: '90%',
        marginVertical: 10,
        paddingVertical: 2,
        borderRadius:7
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
})