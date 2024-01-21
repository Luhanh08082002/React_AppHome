
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Tabs_Item = ({ items }) => {

    const [isIndex, setIsIndex] = useState(0)
    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                {
                    items.map((tab, index) => {
                        const active = isIndex === index;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setIsIndex(index)}
                                style={styles.btn_tabsItem}

                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    {active && <View style={styles.animated_tab}>
                                    </View>}
                                    <Text style={active ? styles.activeText : styles.noActiveText}>{tab.title}</Text>
                                </View>

                            </TouchableOpacity>

                        )
                    })
                }
            </View>
            {
                items[isIndex].content()
            }


        </View>
    )
}

export default Tabs_Item

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    btn_tabsItem: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    animated_tab: {
        width: 7,
        height: 7,
        backgroundColor: 'blue',
        borderRadius: 50,
        marginRight: 5,

    },
    activeText: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 16,
    },
    noActiveText: {
        color: 'gray',
        fontWeight: '500',
        fontSize: 15,
    }

})