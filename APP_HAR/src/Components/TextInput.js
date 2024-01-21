import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { Add_Itional } from '../FrameWord/Add_Itional'

export default  TextInput = ({ errorText,description, ...props }) => {
    return (

        <View style={styles.container}>
            <Input
                style={styles.input}
                selectionColor={Add_Itional.colors.primary}
                input
                underlineColor="transparent"
                mode="outlined"
                {...props}
            />

            {description && !errorText? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
        width: '90%',
        marginVertical: 12,
    },
    input: {
        backgroundColor: Add_Itional.colors.surface,
    },
    description: {
        fontSize: 13,
        color: Add_Itional.colors.secondary,
        paddingTop: 8,
    },
    error: {
        fontSize: 13,
        color: Add_Itional.colors.error,
        paddingTop: 8,
    },
})
