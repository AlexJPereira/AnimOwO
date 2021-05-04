import React from 'react'
import { Text, GestureResponderEvent } from 'react-native'
import { StyleSheet, TouchableOpacity} from 'react-native'

import colorStyle from '../styles/color'; 

interface ButtonProps {
    title: string, 
    onPress: (event: GestureResponderEvent) => void,
    disable?: boolean
}

export default function CustomButton(props: ButtonProps){
    return (
        <TouchableOpacity 
            onPress={props.onPress} 
            style={props.disable ? buttonStyle.defaultButtonDisabled : buttonStyle.defaultButtonEnabled } 
            disabled={props.disable}>
            <Text style={props.disable ? buttonStyle.textButtonDisabled : buttonStyle.textButtonEnabled}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const defaultStyle = StyleSheet.create({
    defaultButton: {
        height: 45,
        width: 167,
        borderRadius: 7,
        borderStyle: 'solid',
        borderWidth: 5,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: colorStyle.corBackground.color
    },
    defaultText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: "600",
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 5, 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }

})

const buttonStyle = StyleSheet.create({
    defaultButtonEnabled: {
        ...defaultStyle.defaultButton,
        borderColor: '#AB3962'
    },
    defaultButtonDisabled: {
        ...defaultStyle.defaultButton,
        borderColor: '#706f6b'
    },
    textButtonEnabled: {
        ...defaultStyle.defaultText,
        color: '#AB3962',
    },
    textButtonDisabled: {
        ...defaultStyle.defaultText,
        color: '#706f6b',
    }
})
