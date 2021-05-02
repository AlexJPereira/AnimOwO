import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'

import textStyle from '../styles/text'

interface ListaPadraoProps{
    name: string,
    children?: React.ReactChild[] | React.ReactChild
}

export default function ListaPadrao(props: ListaPadraoProps){
    return(
        <View style={listaPadrao.container}>
            <Text style={listaPadrao.texto}>{props.name}</Text>
            <ScrollView contentContainerStyle={listaPadrao.lista}>
                {props.children}
            </ScrollView>
        </View>
    )
}

const listaPadrao = StyleSheet.create({
    container: {
        height: '100%',
        paddingBottom: 100,
    },
    texto: {
        ...textStyle.tituloPagina,
        marginTop: 40,
        marginBottom: 30,
    },
    lista: {
        paddingBottom: 40,
        //flex: 1
    },
})