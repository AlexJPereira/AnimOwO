import React from 'react'
import { View, ImageSourcePropType, Text, Image, StyleSheet } from 'react-native'

import color from '../styles/color'

interface AnimeCardDeatailsProps{
    animeName: string,
    animeImage: ImageSourcePropType,
    details: string
}

export default function AnimeCardDetails(props: AnimeCardDeatailsProps){
    return(
        <View style={detailsStyle.container}>
            <Image source={props.animeImage} style={detailsStyle.animeImage}/>
            <View style={detailsStyle.texts}>
                <Text style={detailsStyle.animeName}>{props.animeName}</Text>
                <View>
                    <Text style={detailsStyle.animeDetails}>{props.details}</Text>
                </View>
            </View>
        </View>
    )
}

const detailsStyle = StyleSheet.create({
    container: {
        backgroundColor: color.corMenu.color,
        flexDirection: 'row',
        padding: 20
    },
    animeImage: {
        height: 138,
        width: 90
    },
    texts: {
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    animeName: {
        color: 'white',
    },
    animeDetails: {
        color: 'white',
        textAlign: 'right',
        width: '100%',
        backgroundColor: 'white'
    }
})