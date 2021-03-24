import React, { useEffect, useState } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'

import NavBar from '../../components/navBar'
import AnimeHorizontalList from '../../components/anime-horizontal-list'
import LinkSetinha from '../../components/link-setinha'

import { malApi } from '../../services/global'
import { animeSeason } from '../../services/mal-api/interfaces'
import AnimeCard, { AnimeCardProps } from '../../components/anime-card'


export default function Home(){
    const [state, setState] = useState({
        continueAssitindo: [] as AnimeCardProps[],
        lancamentos: [] as AnimeCardProps[],
        recomendados: [] as AnimeCardProps[],
        emAlta: [] as AnimeCardProps[],
        temporadas: [] as AnimeCardProps[]
    })
    
    function getSeason(){ 
        const actualDate = new Date()
        let season:animeSeason = 'fall'
        let month = actualDate.getMonth()
        let year = actualDate.getFullYear()
        
        if( month >= 5 && month < 8){
            season = "summer"
        } else if (month >= 8 && month < 11){
            season = "fall"
        } else if (month == 11 || month < 2){
            season = "winter"
        } else {
            season = "spring"
        }

        return {
            season,
            year
        }
    }
    
    async function getLists(){

        const watchingResponse = await malApi.getUserList('watching', 'anime_title')
        const recomendadosResponse = await malApi.getSuggestedAnime(20)
        const emAltaResponse = await malApi.getAnimeRankingList('airing', 20)
        const date = getSeason()
        const temporadasResponse = await malApi.getSeasonalAnime(date.year, date.season, 'anime_num_list_users', 20)

        setState({
            continueAssitindo: watchingResponse ? watchingResponse.data.map((element) => ({
                id: element.node.id,
                image: { uri: element.node.main_picture.medium },
                name: element.node.title
            })) : [] as AnimeCardProps[],

            emAlta: emAltaResponse ? emAltaResponse.data.map((element) => ({
                id: element.node.id,
                image: { uri: element.node.main_picture.medium },
                name: element.node.title
            })) : [] as AnimeCardProps[],
            
            lancamentos: [],

            recomendados: recomendadosResponse ? recomendadosResponse.data.map((element) => ({
                id: element.node.id,
                image: { uri: element.node.main_picture.medium },
                name: element.node.title
            })) : [] as AnimeCardProps[],
            
            temporadas: temporadasResponse ? temporadasResponse.data.map((element) => ({
                id: element.node.id,
                image: { uri: element.node.main_picture.medium },
                name: element.node.title
            })) : [] as AnimeCardProps[]
        })
    }

    useEffect(()=>{
        getLists()
    }, [])
    
    return (
        <View style={homeStyle.container}>
            <NavBar/>
            <ScrollView contentContainerStyle={homeStyle.scroll}>
                <LinkSetinha text="Continue Assistindo"/>
                <AnimeHorizontalList>
                    { state.continueAssitindo.map((element, index) => (<AnimeCard key={index} id={element.id} image={element.image} name={element.name}/>)) }
                </AnimeHorizontalList>
                    
                <LinkSetinha text="Lançamentos"/>
                <AnimeHorizontalList>
                    { state.lancamentos.map((element, index) => (<AnimeCard key={index} id={element.id} image={element.image} name={element.name}/>)) }
                </AnimeHorizontalList>

                <LinkSetinha text="Recomendados"/>
                <AnimeHorizontalList>
                    { /*state.recomendados.map((element, index) => (<AnimeCard key={index} id={element.id} image={element.image} name={element.name}/>))*/ }
                </AnimeHorizontalList>

                <LinkSetinha text="Em Alta"/>
                <AnimeHorizontalList>
                    { state.emAlta.map((element, index) => (<AnimeCard key={index} id={element.id} image={element.image} name={element.name}/>)) }
                </AnimeHorizontalList>
                
                <LinkSetinha text="Temporada"/>
                <AnimeHorizontalList>
                    { state.temporadas.map((element, index) => (<AnimeCard key={index} id={element.id} image={element.image} name={element.name}/>)) }
                </AnimeHorizontalList>
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
