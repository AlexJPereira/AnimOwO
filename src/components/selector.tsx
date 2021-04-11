import React from 'react'
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native'

import colorStyle from '../styles/color'; 
import { listStatus } from '../services/mal-api/interfaces'

interface SelectorProps {
    options: {text: string, value: listStatus | ""}[],
    setStateVariable: (value: any) => void,
    stateVariable: string
    defaultValue?: number
}

export default function Selector<T>(props: SelectorProps){
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
        borderRadius: 15
    },
    picker: {
        color: 'white'
    }
})
