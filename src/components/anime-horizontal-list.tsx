import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

interface AnimeHorizontalListProps{
    children?: React.ReactChild[] | React.ReactChild
}

export default function AnimeHorizontalList(props: AnimeHorizontalListProps){
    return (
        <ScrollView horizontal={true} style={listStyle.listContainer}>
            {props.children}
        </ScrollView>
    )
}

const listStyle = StyleSheet.create({
    listContainer:{
        marginHorizontal: 10,
        marginBottom: 50
    }
})