import React, { useEffect, useState } from 'react'
import { ScrollView, View, StyleSheet, RefreshControl } from 'react-native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

import NavBar from '../../components/navBar'
import AnimeHorizontalList from '../../components/anime-horizontal-list'
import LinkSetinha from '../../components/link-setinha'

import { malApi, user } from '../../services/global'
import { getRecommendations } from '../../services/animowo-api'
import { animeSeason } from '../../services/mal-api/interfaces'
import AnimeCard, { AnimeCardProps } from '../../components/anime-card'
import { RootStackNavigator } from '../rotas/rootNavigators/rootStackNavigator'
import { setRootTabNavigator, RootTabNavigator, RootTabPagesProps } from '../rotas/rootNavigators/rootTabNavigator'


export interface HomeProps{
    navigation: BottomTabNavigationProp<RootTabPagesProps, 'home'>
}

export default function Home(props: HomeProps){

    setRootTabNavigator(props.navigation)
    const defaultAnime: AnimeCardProps = {
        id: 0,
        image: { uri: '' }
    }

    const [state, setState] = useState({
        continueAssitindo: [defaultAnime, defaultAnime, defaultAnime, defaultAnime] as AnimeCardProps[],
        recomendados: [defaultAnime, defaultAnime, defaultAnime, defaultAnime] as AnimeCardProps[],
        emAlta: [defaultAnime, defaultAnime, defaultAnime, defaultAnime] as AnimeCardProps[],
        temporadas: [defaultAnime, defaultAnime, defaultAnime, defaultAnime] as AnimeCardProps[]
    })
    const [isLoading, setIsLoading] = useState(true)
    const [reloading, setReloading] = useState(false)
    
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

        setIsLoading(false)
    }

    async function reloadPage(){
        setReloading(true)
        await getLists()
        setReloading(false)
    }

    useEffect(()=>{
        getLists()
    }, [])
    
    return (
        <View style={homeStyle.container}>
            <NavBar/>
            <ScrollView contentContainerStyle={homeStyle.scroll} refreshControl={ 
                <RefreshControl refreshing={reloading} onRefresh={reloadPage}/>
            }>
                <LinkSetinha text="Continue Assistindo" onClick={()=>RootTabNavigator.navigate("assistindo")}/>
                <AnimeHorizontalList>
                    { state.continueAssitindo.map((element, index) => 
                        (<AnimeCard key={index} id={element.id} image={element.image} name={element.name} isLoading={isLoading}/>)) }
                </AnimeHorizontalList>

                <LinkSetinha text="Recomendados" onClick={()=>RootStackNavigator.navigate("recomendados")}/>
                <AnimeHorizontalList>
                    { state.recomendados.map((element, index) => 
                        (<AnimeCard key={index} id={element.id} image={element.image} name={element.name} isLoading={isLoading}/>)) }
                </AnimeHorizontalList>

                <LinkSetinha text="Em Alta" onClick={()=>RootStackNavigator.navigate("em-alta")}/>
                <AnimeHorizontalList>
                    { state.emAlta.map((element, index) => 
                        (<AnimeCard key={index} id={element.id} image={element.image} name={element.name} isLoading={isLoading}/>)) }
                </AnimeHorizontalList>
                
                <LinkSetinha text="Temporada" onClick={()=>RootStackNavigator.navigate("temporada")}/>
                <AnimeHorizontalList>
                    { state.temporadas.map((element, index) => 
                        (<AnimeCard key={index} id={element.id} image={element.image} name={element.name} isLoading={isLoading}/>)) }
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
