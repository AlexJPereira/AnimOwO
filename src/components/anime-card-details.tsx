import React from 'react'
import { View, ImageSourcePropType, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import { RootStackNavigator } from '../pages/rotas/rootNavigators/rootStackNavigator'

import color from '../styles/color'
import textStyle from '../styles/text'

interface AnimeCardDeatailsProps{
    animeName: string,
    id: number,
    animeImage: ImageSourcePropType,
    details: string
}

export default function AnimeCardDetails(props: AnimeCardDeatailsProps){

    function moveToAnimePage(){
        RootStackNavigator.push('anime-page', {id: props.id})
    }

    return(
        <TouchableOpacity onPress={moveToAnimePage} style={detailsStyle.container}>
            <Image source={props.animeImage} style={detailsStyle.animeImage}/>
            <View style={detailsStyle.texts}>
                <Text style={detailsStyle.animeName}>{props.animeName}</Text>
                <Text style={detailsStyle.animeDetails}>{props.details}</Text>
            </View>
        </TouchableOpacity>
    )
}

const detailsStyle = StyleSheet.create({
    container: {
        backgroundColor: color.corMenu.color,
        flexDirection: 'row',
        padding: 20,
        marginVertical: 5,
        borderBottomColor: color.corPrincipalClara.color,
        borderBottomWidth: 1
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