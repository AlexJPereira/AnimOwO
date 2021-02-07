import React from 'react'
import { View, ScrollView } from 'react-native'

interface AnimeVerticalListProps{
    children?: React.ReactChild[] | React.ReactChild
}

export default function AnimeVerticalList(props: AnimeVerticalListProps){
    return (
        <ScrollView>
            {props.children}
        </ScrollView>
    )
}