import React from 'react'
import { Text, GestureResponderEvent } from 'react-native'
import { StyleSheet, TouchableOpacity} from 'react-native'

import textStyle from '../styles/text'

interface LinkProps {
    title: string, 
    onPress: (event: GestureResponderEvent) => void
}

export default function Link({title, onPress} : LinkProps){
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={textStyle.link}>{title}</Text>
        </TouchableOpacity>
    )
}