import React from 'react'
import { 
    View, 
    Image, 
    Text,
    StyleSheet } from 'react-native'


const ProfilePicture = require('../../assets/wykke.png')

export default function AnimeCard(){
    return (
        <View style={ProfileCard.profile}> 
            <Image source={ProfilePicture}>
            </Image>
            <View>
                <Text style={ProfileCard.innerText}>Completos: 532</Text>
                <Text style={ProfileCard.innerText}>Assistindo: 2</Text>
                <Text style={ProfileCard.innerText}>Plano de Assistir: 7</Text>
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