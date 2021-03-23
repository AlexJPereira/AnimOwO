import React from 'react';
import { 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

import { getAnimeResponse } from '../services/animowo-api/interfaces'

import colorStyle from '../styles/color';

export interface LinkCardProps{
    episode: getAnimeResponse
}

export default function LinkCard(props: LinkCardProps){
    const _handlePressButtonAsync = async (address:string) => {
        let result = await WebBrowser.openBrowserAsync(address);
    };
    
    function getDate(){
        const date = new Date(props.episode.date)
        const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth().toString()
        return `${date.getDate()}/${month}/${date.getFullYear()}`
    }

    return (
        <View style={componentStyle.elementStyle}>
            <View style={componentStyle.titleBar}>
                <TouchableOpacity>
                    <Ionicons name="chevron-up" size={24} color="white" />
                </TouchableOpacity>
                <Text style={componentStyle.titleStyle}>{props.episode.upVote}</Text>
                <TouchableOpacity>
                    <Ionicons name="chevron-down" size={24} color="white" />
                </TouchableOpacity>
                <Text style={componentStyle.titleStyle}>{props.episode.downVote}</Text>
            </View>
            <View>
                <View style={componentStyle.cardStyle}>  
                    <Text style={componentStyle.textStyle}>Link adicionado por {props.episode.userName}</Text>
                    <TouchableOpacity>
                        <Text
                            ellipsizeMode='tail' 
                            numberOfLines={1}
                            style={componentStyle.linkStyle}
                            onPress={() => _handlePressButtonAsync(props.episode.link)}> 
                            {props.episode.link}
                        </Text>
                    </TouchableOpacity>
                    <Text style={componentStyle.textStyle}>Adicionado: {getDate()}</Text>
                </View> 
            </View>
        </View>
    )
}

const componentStyle = StyleSheet.create({
    elementStyle:{ 
        paddingVertical: 10,
    },
    titleBar: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        backgroundColor: '#000000',
        height: 30,
        borderColor: colorStyle.corPrincipalClara.color, 
        borderWidth: 1,
        borderRadius: 7
    },
    titleStyle:{
        color: '#ffffff', 
        fontSize: 18
    }, 
    textStyle: {
        paddingVertical: 10,
        color: '#ffffff'
    }, 
    cardStyle: {
        backgroundColor: colorStyle.corBackground.color, 
        justifyContent: 'space-around',
        borderColor: colorStyle.corPrincipalClara.color, 
        borderWidth: 1,
        borderRadius: 7, 
        paddingHorizontal: 10
    }, 
    linkStyle: {
        fontSize: 17,
        color: colorStyle.corPrincipal.color
    }
})