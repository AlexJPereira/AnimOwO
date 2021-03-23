import React, { useState } from 'react';
import { 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

import { getAnimeResponse } from '../services/animowo-api/interfaces'
import { VoteType } from '../services/animowo-api/interfaces';

import colorStyle from '../styles/color';

export interface LinkCardProps{
    episode: getAnimeResponse,
    vote: (voteType: VoteType, dataBaseId: string) => Promise<void>
}

export default function LinkCard(props: LinkCardProps){

    const [userVote, setUserVote] = useState({
        voteType: props.episode.vote,
        voteUpCount: props.episode.upVote,
        voteDownCount: props.episode.downVote
    })

    const _handlePressButtonAsync = async (address:string) => {
        let result = await WebBrowser.openBrowserAsync(address);
    };
    
    function getDate(){
        const date = new Date(props.episode.date)
        const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth().toString()
        return `${date.getDate()}/${month}/${date.getFullYear()}`
    }

    async function vote(voteType: VoteType){
        let newUpVote = userVote.voteUpCount
        let newDownVote = userVote.voteDownCount
        let newVoteType = userVote.voteType

        // caso esteja removendo votos
        if(voteType === userVote.voteType){
            newVoteType = ''
            if(voteType === 'up')
                newUpVote -= 1
            else
                newDownVote -= 1
        }else{
            if(voteType === 'up'){
                if(userVote.voteType === 'down')
                    newDownVote -= 1
                newUpVote += 1
                newVoteType = 'up'
            }
            else{
                if(userVote.voteType === 'up')
                    newUpVote -= 1
                newDownVote += 1
                newVoteType = 'down'
            }
        }

        setUserVote({
            voteDownCount: newDownVote,
            voteType: newVoteType,
            voteUpCount: newUpVote
        })

        props.vote(voteType, props.episode._id)
    }

    return (
        <View style={componentStyle.elementStyle}>
            <View style={componentStyle.titleBar}>

                <TouchableOpacity onPress={() => vote('up')}>
                    <Ionicons name="chevron-up" size={24} color={userVote.voteType === 'up' ? colorStyle.corPrincipal.color : "white"} />
                </TouchableOpacity>
                <Text style={componentStyle.titleStyle}>{userVote.voteUpCount}</Text>

                <TouchableOpacity onPress={() => vote('down')}>
                    <Ionicons name="chevron-down" size={24} color={userVote.voteType === 'down' ? colorStyle.corPrincipal.color : "white"} />
                </TouchableOpacity>
                <Text style={componentStyle.titleStyle}>{userVote.voteDownCount}</Text>

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