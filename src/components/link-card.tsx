import React, { useState } from 'react';
import { 
    Text, 
    GestureResponderEvent, 
    StyleSheet, 
    TouchableOpacity,
    View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';


import colorStyle from '../styles/color';

//interface LinkProps {
//    title: string, 
//    onPress: (event: GestureResponderEvent) => void
//}

//export default function LinkCard({title, onPress} : LinkProps){
export default function LinkCard(){
    const _handlePressButtonAsync = async (address:string) => {
        let result = await WebBrowser.openBrowserAsync(address);
    };

    return (
        <View style={componentStyle.elementStyle}>
            <View style={componentStyle.titleBar}>
                <TouchableOpacity>
                    <Text style={componentStyle.titleStyle}> Link de Wykke </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="chevron-up" size={24} color="white" />
                </TouchableOpacity>
                <Text style={componentStyle.titleStyle}> 10 </Text>
                <TouchableOpacity>
                    <Ionicons name="chevron-down" size={24} color="white" />
                </TouchableOpacity>
                <Text style={componentStyle.titleStyle}> 50 </Text>
            </View>
            <View>
                <View style={componentStyle.cardStyle}>  
                    <Text style={componentStyle.textStyle}> Link adicionado por Wykke </Text>
                    <TouchableOpacity>
                        <Text
                            ellipsizeMode='tail' 
                            numberOfLines={1}
                            style={componentStyle.linkStyle}
                            onPress={() => _handlePressButtonAsync('https://www.youtube.com/watch?v=Mdhd7qrQlQY')}> 
                            https://www.youtube.com/watch?v=Mdhd7qrQlQY
                        </Text>
                    </TouchableOpacity> 
                    <Text style={componentStyle.textStyle}> 06/03/2021 </Text>
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