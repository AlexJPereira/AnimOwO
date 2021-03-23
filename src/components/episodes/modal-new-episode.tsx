import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'

import textStyle from '../../styles/text';
import colorStyle from '../../styles/color'; 

export interface EpisodeListProps{
    isVisible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isLoading: boolean,
    possuiEpisodio: boolean,
    link: string,
    episodeNumber: number,
    animeId: number,
    apagarEpisodio: (episodeNumber: number) => Promise<void>,
    salvarEpisodio: (episodeNumber: number, link: string) => Promise<void>
}

export default function NewEpisode(props: EpisodeListProps){

    const textoEpisodioJaAdicionado = 'Você já possui um link cadastrado para esse episódio.'
    const textoNovoEpisodio = 'Adicione um link para cadastrar um novo episódio.'

    const [inputText, setInputText] = useState(props.link)

    async function saveButton(){
        await props.salvarEpisodio(props.episodeNumber, inputText)
        props.setVisible(false)
    }
    
    async function cancelButton(){
        props.setVisible(false)
    }

    async function deleteButton(){
        await props.apagarEpisodio(props.episodeNumber)
        props.setVisible(false)
    }

    return(
        <Modal
            onBackdropPress={()=>{props.setVisible(false)}}
            swipeDirection={['down', 'up']}
            onSwipeComplete={()=>{props.setVisible(false)}}
            isVisible={props.isVisible}>
            <View style={ComponentStyle.modalStyle}>

                <Text style={ComponentStyle.textStyle}>Editar Link - Episódio {props.episodeNumber}</Text>

                {props.isLoading ? null : <TextInput style={ComponentStyle.textInputStyle} onChangeText={text => setInputText(text)}>{props.link}</TextInput>}

                <Text style={ComponentStyle.textStyle}>
                    {props.isLoading ? 'Carregando...' : (props.possuiEpisodio ? textoEpisodioJaAdicionado : textoNovoEpisodio)}
                </Text>

                <View style={ComponentStyle.modalConfirmation}> 

                    {props.possuiEpisodio ? 
                        <TouchableOpacity onPress={deleteButton}>
                            <Text style={ComponentStyle.textStyle}>Apagar</Text>  
                        </TouchableOpacity>
                        : null}

                    <TouchableOpacity onPress={cancelButton}>
                        <Text style={ComponentStyle.textStyle}>Cancelar</Text>  
                    </TouchableOpacity>

                    {props.isLoading ? null : 
                        <TouchableOpacity onPress={saveButton}>  
                            <Text style={ComponentStyle.textStyleHighlight}>Salvar</Text>
                        </TouchableOpacity>
                    }

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
        justifyContent: 'space-around', 
        paddingEnd: 10
    }, 
    textInputStyle:{
        backgroundColor: "#ffffff", 
        color: 'black', 
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





