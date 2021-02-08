import React from 'react'
import { View, ImageSourcePropType, Text, Image, StyleSheet } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import color from '../styles/color'
import textStyle from '../styles/text'

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
                <Text style={detailsStyle.animeDetails}>{props.details}</Text>
            </View>
        </View>
    )
}

const detailsStyle = StyleSheet.create({
    container: {
        backgroundColor: color.corMenu.color,
        flexDirection: 'row',
        padding: 20,
        marginVertical: 2
    },
    animeImage: {
        height: 138,
        width: 90,
    },
    texts: {
        paddingLeft: 20,
        justifyContent: 'space-between',
        flex: 1,
    },
    animeName: {
        ...textStyle.padrao,
        fontSize: 15,
        color: 'white',
    },
    animeDetails: {
        ...textStyle.padrao,
        ...color.corRosa,
        textAlign: 'right',
        fontSize: 15,
    }
})