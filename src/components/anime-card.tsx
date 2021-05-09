import React from 'react'
import ReactNative from 'react-native'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { RootStackNavigator } from '../pages/rotas/rootNavigators/rootStackNavigator'

import NoImage from './loading/noImageOnDetails'

export interface AnimeCardProps {
    image: ReactNative.ImageSourcePropType
    id: number
    name?: string,
    isLoading?: boolean
}

export default function AnimeCard(props: AnimeCardProps){

    function goToAnimePage(){
        RootStackNavigator.push('anime-page', {id: props.id})
    }

    function AnimeName(){
        if(props.name) return(
            <View style={animeCardStyle.animeNameContainer}>
                <Text style={animeCardStyle.animeNameText} ellipsizeMode='tail' numberOfLines={2}>{props.name}</Text>
            </View>
        )
        else return(<View></View>)
    }

    return(
        <TouchableOpacity 
            onPress={props.isLoading ? ()=>{} : goToAnimePage} style={animeCardStyle.animeCard}>
            {props.isLoading ? 
                <NoImage/>
                : <Image style={animeCardStyle.animeImage} source={props.image}/>
            }
            <AnimeName/>
        </TouchableOpacity>
    )
}

const animeCardStyle = StyleSheet.create({
    animeCard: {
        height: 138,
        width: 90,
        borderRadius: 15,
        justifyContent: 'flex-end',
        marginHorizontal: 4
    },
    animeImage: {
        height: '100%',
        width: '100%',
        borderRadius: 15,
        position: 'absolute'
    },
    animeNameContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 3,
        justifyContent: 'center',
        height: 35,
    },
    animeNameText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 15,
        color: '#FFFFFF',
    }
})
