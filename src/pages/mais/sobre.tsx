import React, { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const logo = require('../../app-assets/logo/Logo-Icone.png')

export default function Sobre(){
    const _handlePressButtonAsync = async (address:string) => {
        let result = await WebBrowser.openBrowserAsync(address);
      };
    return (
        <View style={PageStyle.viewStyle}>
            <TouchableOpacity 
                onPress={() => _handlePressButtonAsync('https://github.com/wykke/tcc')}>
                <Image
                    style={PageStyle.logoPrincipal}
                    source={logo}
                />
            </TouchableOpacity>
            <Text style={PageStyle.textStyle}> 
                Autores:
            </Text>
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
                <Text style={PageStyle.textStyle}> Leonardo Melo </Text>
            </TouchableOpacity>
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
        height: 58,
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
    logoPrincipal: {
        transform: [{scaleX: 0.5}, {scaleY: 0.5}]
    }
})