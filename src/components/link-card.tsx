import React from 'react';
import { 
    Text, 
    GestureResponderEvent, 
    StyleSheet, 
    TouchableOpacity,
    View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

interface LinkProps {
    title: string, 
    onPress: (event: GestureResponderEvent) => void
}

export default function LinkCard({title, onPress} : LinkProps){
    return (
        <View>
            <View style={componentStyle.titleBar}> 
                <Text style={componentStyle.textStyle}> Link criado por Wykke </Text>
                <Ionicons name="ios-chevron-up" size={24} color="white" />
                <Text style={componentStyle.textStyle}> 10 </Text>
                <Ionicons name="ios-chevron-down" size={24} color="black" />
                <Text style={componentStyle.textStyle}> 50 </Text>
            </View>
        </View>
    )
}

const componentStyle = StyleSheet.create({
    titleBar: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        backgroundColor: '#000000'
    },
    textStyle: {
        color: '#ffffff'
    }
})