import React from 'react'
import Modal from 'react-native-modal';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import textStyle from '../../styles/text';
import colorStyle from '../../styles/color'; 

export interface EpisodeListProps{
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isVisible: boolean,
    episodeNumber: number
}

export default function NewEpisode(props: EpisodeListProps){
    return(
        <Modal
            onBackdropPress={()=>{props.setVisible(false)}}
            swipeDirection={['down', 'up']}
            onSwipeComplete={()=>{props.setVisible(false)}}
            isVisible={props.isVisible}>
            <View style={ComponentStyle.modalStyle}>
                <Text style={ComponentStyle.textStyle}>Editar Link - Episódio {props.episodeNumber}</Text>
                <View style={ComponentStyle.editLink}> 
                    <TextInput style={ComponentStyle.textInputStyle}/>
                    <TouchableOpacity>
                        <Ionicons name="pencil" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="trash" size={24} color="white" />
                    </TouchableOpacity>
                 </View>
                 <Text style={ComponentStyle.textStyle}>
                    Você já possui um link cadastrado para esse episódio.
                </Text>
                <View style={ComponentStyle.modalConfirmation}> 
                    <TouchableOpacity onPress={async ()=>{
                        // confirmation function
                        props.setVisible(false)
                    }}>
                        <Text style={ComponentStyle.textStyle}> Cancelar </Text>  
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async ()=>{
                        // cancel function
                        props.setVisible(false)
                    }}>  
                        <Text style={ComponentStyle.textStyleHighlight}> Salvar </Text>
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





