import React, { useState } from 'react';
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

//export default function LinkCard({title, onPress} : LinkProps){
export default function LinkCard(){

    const [shouldShow, setShouldShow] = useState(false);

    return (
        <View>
            <View style={componentStyle.titleBar}>
                <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
                    <Text style={componentStyle.textStyle}> Link criado por Wykke </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="chevron-up" size={24} color="white" />
                </TouchableOpacity>
                <Text style={componentStyle.textStyle}> 10 </Text>
                <TouchableOpacity>
                    <Ionicons name="chevron-down" size={24} color="white" />
                </TouchableOpacity>
                <Text style={componentStyle.textStyle}> 50 </Text>
            </View>
            <View>
                {}
                {shouldShow ? (
                    <View> 
                        <Text style={componentStyle.textStyle}> Link adicionado por Wykke</Text>
                        <TouchableOpacity>
                            <Text style={componentStyle.textStyle}> https://urllink.com </Text>
                        </TouchableOpacity> 
                        <Text style={componentStyle.textStyle}> 06/03/2021 </Text>
                    </View> 
                ) : null}
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