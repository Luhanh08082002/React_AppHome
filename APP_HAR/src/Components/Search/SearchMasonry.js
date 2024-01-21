import React from 'react'
import MasonryList from '@react-native-seoul/masonry-list';
import { View, Text } from 'react-native';
import CardContents from '../Shared/CardContents';

const SearchMasonry = ({ list}) => {
    return (
        <MasonryList
            data={list}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item ,i}) => (
               <CardContents item={item} index={i}/>
            )}
            refreshing={false}
        />
    )
}

export default SearchMasonry