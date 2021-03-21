import React, { useState } from 'react';
import { 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import textStyle from '../../styles/text';
import colorStyle from '../../styles/color'; 

interface EpisodeProps {
    episodeNumber: number,
    setWatchListVisible: (episodeNumber: number) => void,
    setLinkManagerVisible: (episodeNumber: number) => void
}

export default function EpisodeCard(props: EpisodeProps){

    const [shouldShow, setShouldShow] = useState(false);

    function showWatchListModal(){
        props.setWatchListVisible(props.episodeNumber)
    }

    function showNewEpisodeModal(){
        props.setLinkManagerVisible(props.episodeNumber)
    }

    return (
        <View>
            <TouchableOpacity 
                style={ComponentStyle.titleBar}
                onPress={() => setShouldShow(!shouldShow)}>
                <Text style={textStyle.principal}>Episodio {props.episodeNumber}</Text>
                {shouldShow ? (
                    <Ionicons name="chevron-up" size={24} color="white" />
                ):  <Ionicons name="chevron-down" size={24} color="white" />}
            </TouchableOpacity>
            <View>
                {shouldShow ? (
                    <View style={ComponentStyle.innerStyle}>
                        <TouchableOpacity 
                            style={ComponentStyle.linkStyle}
                            onPress={showWatchListModal}>
                            <Ionicons name="play" size={24} color="white" style={ComponentStyle.iconStyle}/>
                            <Text  style={ComponentStyle.text}>ASSISTIR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={ComponentStyle.linkStyle}
                            onPress={showNewEpisodeModal}>
                            <Ionicons name="link" size={24} color="white" style={ComponentStyle.iconStyle}/>
                            <Text  style={ComponentStyle.text}>GERENCIAR LINK</Text>
                        </TouchableOpacity>
                    </View> 
                ) : null}
            </View>
        </View>
    )
}

const ComponentStyle = StyleSheet.create({
    titleBar: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#252121',
        height: 47
    },
    text:{
        color: "#ffffff"
    },
    textStyle: {
        ... textStyle.principal,
        paddingVertical: 5,
    },
    textStyleHighlight:{
        ... textStyle.principal,
        paddingVertical: 5,
        color: colorStyle.corPrincipal.color
    },
    innerStyle:{
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        height: 95, 
        alignItems: 'center', 
        backgroundColor:"#252121"
    }, 
    linkStyle:{
        flexDirection: 'row', 
        justifyContent: 'space-around'
    }, 
    iconStyle:{
        paddingRight: 10
    },
    modalStyle:{
        backgroundColor: colorStyle.corBackground.color, 
        justifyContent: 'space-around', 
        paddingVertical: 30,
        paddingHorizontal: 20
    }, 
    modalConfirmation:{
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        paddingEnd: 10
    }, 
    textInputStyle:{
        backgroundColor: "#ffffff", 
        color: 'black', 
        width: '85%'
    }, 
    elementStyle:{
        paddingVertical: 10
    }, 
    modalLink:{
        flex: 1
    }, 
    linkClose:{
        paddingTop: 20,
        height: 65, 
        alignItems: 'center', 
        justifyContent: 'center'
    }, 
    editLink:{
        flexDirection: 'row'
    }
})