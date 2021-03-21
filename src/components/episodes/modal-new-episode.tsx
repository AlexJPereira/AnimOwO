import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import * as AnimowoApi from '../../services/animowo-api'

import textStyle from '../../styles/text';
import colorStyle from '../../styles/color'; 
import { malApi } from '../../services/global';

export interface EpisodeListProps{
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isVisible: boolean,
    episodeNumber: number,
    animeId: number
}

export default function NewEpisode(props: EpisodeListProps){

    const textoEpisodioJaAdicionado = 'Você já possui um link cadastrado para esse episódio.'
    const textoNovoEpisodio = 'Adicione um link para cadastrar um novo episódio.'

    const [isLoading, setLoading] = useState(true)
    const [possuiEpisodio, setPossuiEpisodio] = useState(false)

    async function confirmButton(){
        setPossuiEpisodio(false)
        setLoading(true)
        props.setVisible(false)
    }
    
    async function cancelButton(){
        setPossuiEpisodio(false)
        setLoading(true)
        props.setVisible(false)
    }

    async function JaPossuiEpisodioCadastrado(){
        const links = await AnimowoApi.getAnimeLinks(props.animeId, props.episodeNumber)
        const user = await malApi.getUserProfileInfo()
        const episode = links.find(link => link.userId === user?.id)
        if(episode)
            setPossuiEpisodio(true)
        setLoading(false)
    }

    function getReactInput(){
        return (
            <View style={ComponentStyle.editLink}>
                <TextInput style={ComponentStyle.textInputStyle}/>
                {possuiEpisodio ?
                    <TouchableOpacity>
                        <Ionicons name="pencil" size={24} color="white" />
                    </TouchableOpacity>
                    : null
                }{possuiEpisodio ?
                    <TouchableOpacity>
                        <Ionicons name="trash" size={24} color="white" />
                    </TouchableOpacity>
                    : null
                }
            </View>
        )
    }

    useEffect(()=>{
        JaPossuiEpisodioCadastrado()
    })

    return(
        <Modal
            onBackdropPress={()=>{props.setVisible(false)}}
            swipeDirection={['down', 'up']}
            onSwipeComplete={()=>{props.setVisible(false)}}
            isVisible={props.isVisible}>
            <View style={ComponentStyle.modalStyle}>
                <Text style={ComponentStyle.textStyle}>Editar Link - Episódio {props.episodeNumber}</Text>
                {getReactInput()}
                <Text style={ComponentStyle.textStyle}>
                    {isLoading ? 'Carregando...' : (possuiEpisodio ? textoEpisodioJaAdicionado : textoNovoEpisodio)}
                </Text>
                <View style={ComponentStyle.modalConfirmation}> 
                    <TouchableOpacity onPress={confirmButton}>
                        <Text style={ComponentStyle.textStyle}>Cancelar</Text>  
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancelButton}>  
                        <Text style={ComponentStyle.textStyleHighlight}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View> 
        </Modal>
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





