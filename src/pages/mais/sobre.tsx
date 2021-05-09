import React, { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions} from 'react-native';
import Modal from 'react-native-modal'
import * as WebBrowser from 'expo-web-browser';

import colors from '../../styles/color'
import { ScrollView } from 'react-native-gesture-handler';
import termosDeUso from '../../services/termosDeUso'

const logo = require('../../app-assets/logo/Logo-Icone.png')
const logoNome = require('../../app-assets/logo/Logo-Texto.png')


export interface IModalProps{
    visibleState: boolean
    setVisibleState: (newState: boolean) => void
}

export function TermosModal(props: IModalProps){
    return(
        <Modal 
            isVisible={props.visibleState}
            onBackButtonPress={()=>props.setVisibleState(false)}
            onBackdropPress={()=>props.setVisibleState(false)}
            onSwipeComplete={()=>props.setVisibleState(false)}>
            <View style={ModalStyle.mainContainer}>
                <View style={ModalStyle.textoContainer}>
                    <Text style={ModalStyle.termosTitulo}>Termos de Uso</Text>
                    <View style={ModalStyle.scrollContainer}>
                        <ScrollView>
                            <Text style={ModalStyle.termosTexto}>
                                {termosDeUso}   
                            </Text>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default function Sobre(){

    const [termosVisible, setTermosVisible] = useState(false)

    const _handlePressButtonAsync = async (address:string) => {
        let result = await WebBrowser.openBrowserAsync(address);
    };

    function showTermos(){
        setTermosVisible(true)
    }

    return (
        <View style={PageStyle.viewStyle}>
            <TermosModal setVisibleState={setTermosVisible} visibleState={termosVisible}/>

            <TouchableOpacity style={PageStyle.logoContainer}
                onPress={() => _handlePressButtonAsync('https://github.com/wykke/tcc')}>
                <Image
                    style={PageStyle.logoPrincipal}
                    source={logo}
                />
                <Image
                    style={PageStyle.logoTexto}
                    source={logoNome}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={showTermos}>
                <Text style={PageStyle.termosTexto}>Termos de Uso</Text>
            </TouchableOpacity>
            
            <View style={PageStyle.PicAndAutoresContainer}>
                <Text style={PageStyle.textStyle}>Autores:</Text>
                <View style={PageStyle.allPicContainer}>
                    <TouchableOpacity 
                        onPress={() => _handlePressButtonAsync('https://github.com/wykke')}
                        style={PageStyle.cardStyle}>
                        <Image 
                            style={PageStyle.logo}
                            source={{
                                uri: 'https://avatars.githubusercontent.com/u/38235118?s=460&v=4',
                            }}
                        />
                        <Text style={PageStyle.textStyle}> Alex Junior </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => _handlePressButtonAsync('https://github.com/Ceu152')}
                        style={PageStyle.cardStyle}>
                        <Image 
                            style={PageStyle.logo}
                            source={{
                                uri: 'https://avatars.githubusercontent.com/u/43916660?s=460&v=4',
                            }}
                        />
                        <Text style={PageStyle.textStyle}> Leonardo M. </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const PageStyle = StyleSheet.create({
    viewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        lineHeight: 40,
        letterSpacing: 1,
        color: '#FFFFFF'
    },
    logo: {
        width: 66,
        height: 66,
        borderRadius: 100
    },
    cardStyle: {
        paddingTop: 10,
        borderRadius: 7,
        borderColor: '#AB3962',
        borderStyle: 'solid',
        borderWidth: 5,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center'
    }, 
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    logoPrincipal: {
        width: 306*0.3,
        height: 306*0.3,
        marginBottom: 10
    },
    logoTexto: {
        width: 620*0.3,
        height: 134*0.3,
    },
    allPicContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width
    },
    PicAndAutoresContainer: {},
    termosTexto: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        lineHeight: 40,
        letterSpacing: 1,
        color: '#FFFFFF',
        textDecorationLine: 'underline'
    }
})

const ModalStyle = StyleSheet.create({
    mainContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer:{
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    textoContainer:{
        height: '73.5%',
        width: '90%',
        backgroundColor: colors.corBackground.color
    },
    termosTitulo:{
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        lineHeight: 40,
        letterSpacing: 1,
        color: '#FFFFFF',
        marginVertical: 20,
    },
    termosTexto:{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12,
        letterSpacing: 1,
        color: '#FFFFFF',
        textAlign: 'justify'
    }
})
