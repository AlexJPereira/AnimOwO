import React from 'react'
import { View, Button, Text, GestureResponderEvent } from 'react-native'
import { StyleSheet, TouchableOpacity} from 'react-native'

interface ButtonProps {
    title: string, 
    onPress: (event: GestureResponderEvent) => void
}

export default function CustomButton({title, onPress} : ButtonProps){
    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle.defaultButton}>
            <Text style={buttonStyle.textButton}>{title}</Text>
        </TouchableOpacity>
    )
}
const buttonStyle = StyleSheet.create({
    defaultButton: {
        height: 45,
        width: 167,
        borderRadius: 7,
        borderColor: '#AB3962',
        borderStyle: 'solid',
        borderWidth: 5,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    textButton: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: "600",
        fontSize: 20,
        lineHeight: 23,
        letterSpacing: 5,
        color: '#AB3962', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
})
