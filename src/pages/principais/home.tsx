import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import NavBar from '../../components/navBar'
import AnimeHorizontalListTest from '../../components/anime-horizontal-list-test'
import LinkSetinha from '../../components/link-setinha'

export default function Home(){
    return (
        <View style={homeStyle.container}>
            <NavBar/>
            <ScrollView contentContainerStyle={homeStyle.scroll}>
                <LinkSetinha text="Continue Assistindo"/>
                <AnimeHorizontalListTest/>
                <LinkSetinha text="Lançamentos"/>
                <AnimeHorizontalListTest/>
                <LinkSetinha text="Recomendados"/>
                <AnimeHorizontalListTest/>
                <LinkSetinha text="Em Alta"/>
                <AnimeHorizontalListTest/>
                <LinkSetinha text="Temporadas"/>
                <AnimeHorizontalListTest/>
            </ScrollView>
        </View>
    )
}
const homeStyle = StyleSheet.create({
    container: {
        marginBottom: 55,
    },
    scroll: {
        paddingTop: 30,
    }
})
