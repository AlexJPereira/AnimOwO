import React, { useEffect, useState } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'

import NavBar from '../../components/navBar'
import AnimeHorizontalList from '../../components/anime-horizontal-list'
import LinkSetinha from '../../components/link-setinha'

import { malApi, user } from '../../services/global'
import { getRecommendations } from '../../services/animowo-api'
import { animeSeason } from '../../services/mal-api/interfaces'
import AnimeCard, { AnimeCardProps } from '../../components/anime-card'


export default function Home(){
    const [state, setState] = useState({
        continueAssitindo: [] as AnimeCardProps[],
        recomendados: [] as AnimeCardProps[],
        emAlta: [] as AnimeCardProps[],
        temporadas: [] as AnimeCardProps[]
    })
    
    function getSeason(){ 
        const actualDate = new Date()
        let season:animeSeason = 'fall'
        let month = actualDate.getMonth()
        let year = actualDate.getFullYear()
        
        if( month >= 7 && month <= 9){
            season = "summer"
        } else if (month >= 10 && month <= 12){
            season = "fall"
        } else if (month >= 1 && month <= 3){
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
        const watchingResponse = await malApi.getUserList('anime_title', 'watching')

        let recomendadosResponse
        try{
            recomendadosResponse = await getRecommendations(user.id)
        }catch(error){}

        const emAltaResponse = await malApi.getAnimeRankingList('airing', 20)
        const date = getSeason()
        const temporadasResponse = await malApi.getSeasonalAnime(date.year, date.season, 'anime_num_list_users', 20)

        let promises;
        if(recomendadosResponse)
            promises = recomendadosResponse.predict_list.map(async (recommendationId) => {
                const animeDetails = await malApi.getAnimeDetails(recommendationId)
                return ({
                    id: animeDetails ? animeDetails.id : 0,
                    image: { uri: animeDetails ? animeDetails.main_picture.medium : '' },
                    name: animeDetails ? animeDetails.title : ''
                })
            })

        const recomendados = await Promise.all(promises ? promises : [])

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

            recomendados: recomendados,
            
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

                <LinkSetinha text="Recomendados"/>
                <AnimeHorizontalList>
                    { state.recomendados.map((element, index) => (<AnimeCard key={index} id={element.id} image={element.image} name={element.name}/>)) }
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
