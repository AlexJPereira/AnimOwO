import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView, RefreshControl } from 'react-native'

import textStyle from '../styles/text'

interface ListaPadraoProps{
    name: string,
    children?: React.ReactChild[] | React.ReactChild,
    refreshPageFunction?: () => any,
    refreshState?: boolean
}

export default function ListaPadrao(props: ListaPadraoProps){
    return(
        <View style={listaPadrao.container}>
            <Text style={listaPadrao.texto}>{props.name}</Text>
            <View style={listaPadrao.scrollContainer}>
                <ScrollView contentContainerStyle={listaPadrao.lista} refreshControl={
                    (props.refreshPageFunction && props.refreshState !== undefined) ? 
                        <RefreshControl refreshing={props.refreshState} onRefresh={props.refreshPageFunction}/>
                        : undefined}>
                    {props.children}
                </ScrollView>
            </View>
        </View>
    )
}

const listaPadrao = StyleSheet.create({
    container: {
        height: '100%',
    },
    scrollContainer: {
        flex: 1
    },
    texto: {
        ...textStyle.tituloPagina,
        marginTop: 40,
        marginBottom: 30,
    },
    lista: {
        paddingBottom: 40,
    },
})