import React from 'react'
import { View, ImageSourcePropType, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import LoadingImage from './loading/noImageOnDetails'
import NoText from './loading/noText'

import { RootStackNavigator } from '../pages/rotas/rootNavigators/rootStackNavigator'

import color from '../styles/color'
import textStyle from '../styles/text'

interface AnimeCardDeatailsProps{
    animeName: string,
    id: number,
    animeImage: ImageSourcePropType,
    details: string,
    isLoading?: boolean
}

export default function AnimeCardDetails(props: AnimeCardDeatailsProps){

    function moveToAnimePage(){
        RootStackNavigator.push('anime-page', {id: props.id})
    }

    return(
        <TouchableOpacity onPress={props.isLoading ? ()=>{} : moveToAnimePage} style={detailsStyle.container}>
            {props.isLoading ? <LoadingImage/> : <Image source={props.animeImage} style={detailsStyle.animeImage}/>}
            <View style={detailsStyle.texts}>
                {props.isLoading ? 
                    <View style={detailsStyle.noTitleContainer}><NoText/></View> 
                    : <Text style={detailsStyle.animeName}>{props.animeName}</Text>
                }
                {props.isLoading ? 
                    <View style={detailsStyle.noDetailContainer}><NoText/></View> 
                    : <Text style={detailsStyle.animeDetails}>{props.details}</Text>
                }
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
        alignItems: 'flex-end',
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
    },
    noTitleContainer: {
        width: '100%',
        overflow: 'hidden'
    },
    noDetailContainer: {
        width: '50%',
        overflow: 'hidden'
        
    }
})