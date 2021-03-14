import React, { useState } from 'react';
import { 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    View,
    TextInput,
    ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import textStyle from '../styles/text';
import colorStyle from '../styles/color'; 
import LinkCard from './link-card';
import Button from './button'; 


interface EpisodeProps {
    value: number,
    cancelFunction: () => Promise<any>,
    saveFunction: () => Promise<any>
    watchFunction: () => Promise<any>
}


export default function EpisodeCard(props: EpisodeProps){

    const [shouldShow, setShouldShow] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [watchVisible, setWatchVisible] = useState(false); 

    const linkList = []
    for(let link=1; link<=10; link++){
        linkList.push(<LinkCard key={link}/>)
    }

    return (
        <View>
            <Modal
                backdropOpacity={0.75}
                onBackdropPress={()=>{setVisible(false)}}
                isVisible={watchVisible}
                style={ComponentStyle.modalLink}> 
                <ScrollView>
                    { linkList }
                </ScrollView>
                <View style={ComponentStyle.linkClose}>
                    <Button 
                        title="CANCELAR"
                        onPress={async ()=>{
                            await props.cancelFunction()
                            setWatchVisible(false)
                        }}/>
                </View>
            </Modal>
            <Modal
                onBackdropPress={()=>{setVisible(false)}}
                swipeDirection={['down', 'up']}
                onSwipeComplete={()=>{setVisible(false)}}
                isVisible={isVisible}>
                <View style={ComponentStyle.modalStyle}>
                    <Text style={ComponentStyle.textStyle}> Editar Link </Text>
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
                            await props.cancelFunction()
                            setVisible(false)
                        }}>
                            <Text style={ComponentStyle.textStyle}> Cancelar </Text>  
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async ()=>{
                            await props.saveFunction()
                            setVisible(false)
                        }}>  
                            <Text style={ComponentStyle.textStyleHighlight}> Salvar </Text>
                        </TouchableOpacity>
                    </View>
                </View> 
            </Modal>
            <Modal
                onBackdropPress={()=>{setVisible(false)}}
                swipeDirection={['down', 'up']}
                onSwipeComplete={()=>{setVisible(false)}}
                isVisible={false}>
                <View style={ComponentStyle.modalStyle}>
                    <Text style={ComponentStyle.textStyle}> Cadastrar Link </Text>
                    <TextInput style={ComponentStyle.textInputStyle}/>
                    <View style={ComponentStyle.elementStyle}> 
                        <Text style={ComponentStyle.textStyle}> 
                            Ao cadastrar o link, você concorda com os {' '}
                            <Text style={ComponentStyle.textStyleHighlight}>
                                Termos de USO 
                            </Text>
                            {' '}estabelecidos pelo ANIM
                            <Text style={ComponentStyle.textStyleHighlight}>
                                OWO
                            </Text>
                        </Text>
                    </View>
                    <View style={ComponentStyle.modalConfirmation}> 
                        <TouchableOpacity onPress={async ()=>{
                            await props.cancelFunction()
                            setVisible(false)
                        }}>
                            <Text style={ComponentStyle.textStyle}> Cancelar </Text>  
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async ()=>{
                            await props.saveFunction()
                            setVisible(false)
                        }}>  
                            <Text style={ComponentStyle.textStyleHighlight}> Salvar </Text>
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
                        <TouchableOpacity 
                            style={ComponentStyle.linkStyle}
                            onPress={() => {setWatchVisible(true)}}>
                            <Ionicons name="play" size={24} color="white" style={ComponentStyle.iconStyle}/>
                            <Text  style={ComponentStyle.text}> ASSISTIR </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={ComponentStyle.linkStyle}
                            onPress={() => {setVisible(true)}}>
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