import React, { useState } from 'react';
import { 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    View,
    Button, 
    TextInput,
    GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import textStyle from '../styles/text';
import colorStyle from '../styles/color'; 
import text from '../styles/text';


interface EpisodeProps {
    value: number,
    cancelFunction: () => Promise<any>,
    saveFunction: () => Promise<any>
    watchFunction: () => Promise<any>
}


export default function EpisodeCard(props: EpisodeProps){

    const [shouldShow, setShouldShow] = useState(false);
    const [isVisible, setVisible] = useState(false);

    return (
        <View>
            <Modal
                onBackdropPress={()=>{setVisible(false)}}
                swipeDirection={['down', 'up']}
                onSwipeComplete={()=>{setVisible(false)}}
                isVisible={isVisible}>
                <View style={ComponentStyle.modalStyle}>
                    <Text style={textStyle.principal}> Cadastrar Link </Text>
                    <TextInput style={ComponentStyle.textInputStyle}/>
                    <View style={ComponentStyle.elementStyle}> 
                        <Text style={textStyle.principal}> 
                            Ao cadastrar o link, você concorda com os Termos de Uso estabelecidos pelo ANIMOWO
                        </Text>
                    </View>
                    <View style={ComponentStyle.modalConfirmation}> 
                        <TouchableOpacity onPress={async ()=>{
                            await props.cancelFunction()
                            setVisible(false)
                        }}>
                            <Text style={textStyle.principal}> Cancelar </Text>  
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async ()=>{
                            await props.saveFunction()
                            setVisible(false)
                        }}>  
                            <Text style={textStyle.principal}> Salvar </Text>
                        </TouchableOpacity>
                    </View>
                </View> 
            </Modal>  
            <TouchableOpacity 
                style={ComponentStyle.titleBar}
                onPress={() => setShouldShow(!shouldShow)}>
                <Text style={textStyle.principal}> Episodio {props.value} </Text>
                {shouldShow ? (
                    <Ionicons name="chevron-up" size={24} color="white" />
                ):  <Ionicons name="chevron-down" size={24} color="white" />}
            </TouchableOpacity>
            <View>
                {shouldShow ? (
                    <View style={ComponentStyle.innerStyle}>
                        <TouchableOpacity style={ComponentStyle.linkStyle}>
                            <Ionicons name="play" size={24} color="white" style={ComponentStyle.iconStyle}/>
                            <Text  style={ComponentStyle.textStyle}> ASSISTIR </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={ComponentStyle.linkStyle}
                            onPress={() => {setVisible(true)}}>
                            <Ionicons name="link" size={24} color="white" style={ComponentStyle.iconStyle}/>
                            <Text  style={ComponentStyle.textStyle}>GERENCIAR LINK</Text>
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
    textStyle: {
        color: '#ffffff'
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
        paddingVertical: 30
    }, 
    modalConfirmation:{
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        paddingEnd: 10
    }, 
    textInputStyle:{
        backgroundColor: "#ffffff", 
        color: 'black'
    }, 
    elementStyle:{
        paddingVertical: 10
    }
})