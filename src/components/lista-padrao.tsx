import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import AnimeVerticalList from '../components/anime-vertical-list'

interface ListaPadraoProps{
    name: string,
    children?: React.ReactChild[] | React.ReactChild
}

export default function ListaPadrao(props: ListaPadraoProps){
    return(
        <View>
            <Text style={listaPadrao.texto}>{props.name}</Text>
            <AnimeVerticalList>
                {props.children}
            </AnimeVerticalList>
        </View>
    )
}

const listaPadrao = StyleSheet.create({
    texto: {
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        lineHeight: 23,
        letterSpacing: 1,
        color: 'white',
        paddingHorizontal: 15,
        marginTop: 40
    }
})