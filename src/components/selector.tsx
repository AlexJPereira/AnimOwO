import React from 'react'
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native'

import colorStyle from '../styles/color'; 

interface SelectorProps {
    options: {text: string, value: any}[],
    setStateVariable: (value: any) => void,
    stateVariable: any
    defaultValue?: number
}

export default function Selector(props: SelectorProps){
    const itens = props.options.map((item, index) => 
        <Picker.Item key={ index } value={ item.value } label={ item.text }/>
    )

    return (
        <View style={selectorStyle.container}>
            <Picker 
                style={selectorStyle.picker }
                dropdownIconColor={'white'}
                mode={"dropdown"}
                selectedValue={props.stateVariable}
                onValueChange={value =>{
                    if(value != props.stateVariable) props.setStateVariable(value)
            }}>
                { itens }
            </Picker>
        </View>
        
    )
}

const selectorStyle = StyleSheet.create({
    container: {
        borderColor: colorStyle.corPrincipal.color,
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 15,
        flex: 1,
        marginHorizontal: 5
    },
    picker: {
        color: 'white'
    }
})
