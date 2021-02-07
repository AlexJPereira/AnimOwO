import React from 'react'
import ReactNative from 'react-native'
import { View, Image, Text } from 'react-native'
import { StyleSheet } from 'react-native'

export interface AnimeCardProps {
    image: ReactNative.ImageSourcePropType
    name?: string
}

export default function AnimeCard(props: AnimeCardProps){
    const AnimeName = () => {
        if(props.name) return(
            <View style={animeCardStyle.animeNameContainer}>
                <Text style={animeCardStyle.animeNameText} ellipsizeMode='tail' numberOfLines={2}>{props.name}</Text>
            </View>
        )
        else return(<View></View>)
    }

    return(
        <View style={animeCardStyle.animeCard}>
            <Image style={animeCardStyle.animeImage} source={props.image}/>
            <AnimeName/>
        </View>
    )
}

const animeCardStyle = StyleSheet.create({
    animeCard: {
        backgroundColor: 'white',
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
