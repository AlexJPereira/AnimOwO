import React from 'react'
import { 
    View, 
    Image, 
    Text,
    StyleSheet,
    ImageSourcePropType } from 'react-native'


export interface AnimeCardProps{
    profilePic: ImageSourcePropType,
    qtdCompletos: number,
    qtdAssistindo: number,
    qtdPlanoAssistir: number
}

export default function AnimeCard(props: AnimeCardProps){

    return (
        <View style={ProfileCard.profile}> 
            <Image style={ProfileCard.image} source={props.profilePic}>
            </Image>
            <View>
                <Text style={ProfileCard.innerText}>Completos: {props.qtdCompletos}</Text>
                <Text style={ProfileCard.innerText}>Assistindo: {props.qtdAssistindo}</Text>
                <Text style={ProfileCard.innerText}>Plano de Assistir: {props.qtdPlanoAssistir}</Text>
            </View>
        </View>
    )
}

const ProfileCard = StyleSheet.create({
    profile:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 150,
        marginTop: 7,
        backgroundColor: '#252121'
    },
    image: {
        height: 90,
        width: 90
    },
    innerText:{
        textAlign: 'left',
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 23,
        letterSpacing: 1,
        color: '#FFFFFF'
    }
})