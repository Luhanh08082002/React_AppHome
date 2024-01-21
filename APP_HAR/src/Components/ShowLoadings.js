import React from 'react'
import { Modal, View, ActivityIndicator, StyleSheet, Text } from 'react-native'
const ShowLoadings = ({ modalVisible, tack }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            statusBarTranslucent={true}

        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ActivityIndicator size={'large'} color={'red'} />
                    {
                        tack ?
                            <Text style={styles.modalText}>{tack}</Text>
                            :
                            <Text style={styles.modalText}>Loading..</Text>


                    }
                </View>
            </View>

        </Modal>
    )
}

export default ShowLoadings

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0008'
    },
    modalView: {
        width: 200,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 17,
        textAlign: 'center',
        marginLeft: 15,
        marginVertical: 15,
    }
})