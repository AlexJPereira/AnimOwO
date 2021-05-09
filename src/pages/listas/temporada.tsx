import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import ListaPadrao from '../../components/lista-padrao'
import NavBar from '../../components/navBar'
import AnimeCardDetails from '../../components/anime-card-details'
import { malApi } from '../../services/global'
import { animeSeason } from '../../services/mal-api/interfaces'

export default function Temporada(){

    const defaultAnime = {
        id: 0,
        animeTitle: '', 
        animePic: 'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png', 
        episodesNumber: 0, 
        episodesWatched: 0
    }
    
    const [state, setState] = useState({
        assistindo: [defaultAnime, defaultAnime, defaultAnime]
    })
    const [isLoading, setIsLoading] = useState(true)
    const [reloading, setReloading] = useState(false)

    function getSeason(){ 
        const actualDate = new Date()
        let season: animeSeason = 'fall'
        let brSeason = "Outono"
        let month = actualDate.getMonth()
        let year = actualDate.getFullYear()
        
        if( month >= 7 && month <= 9){
            season = "summer"
            brSeason = "Verão"
        } else if (month >= 10 && month <= 12){
            season = "fall"
            brSeason = "Outono"
        } else if (month >= 1 && month <= 3){
            season = "winter"
            brSeason = "Inverno"
        } else {
            season = "spring"
            brSeason = "Primavera"
        }

        return {
            season,
            year,
            brSeason
        }
    }

    async function getUserList(){
        const date = getSeason()
        const temporadasResponse = await malApi.getSeasonalAnime(date.year, date.season, 'anime_num_list_users', 20)

        if(temporadasResponse)
            setState({
                assistindo: temporadasResponse.data.map((element) => ({
                    id: element.node.id,
                    animeTitle: element.node.title,
                    animePic: element.node.main_picture.medium,
                    episodesNumber: element.node.num_episodes,
                    episodesWatched: element.node.my_list_status?.num_episodes_watched || 0
                }))
            })
        else
            setState({assistindo: [defaultAnime]})

        setIsLoading(false)
    }

    async function reloadPage(){
        setReloading(true)
        await getUserList()
        setReloading(false)
    }

    useEffect(()=>{
        getUserList()
    }, [])
    
    return (
        <View style={style.page}>
            <NavBar/>
            <View style={style.listContainer}>
                <ListaPadrao name={`Temporada de ${getSeason().brSeason} ${getSeason().year}`} refreshState={reloading} refreshPageFunction={reloadPage}>
                    {
                        state.assistindo.map((element, index) => 
                            <AnimeCardDetails key={index}
                                id = {element.id}
                                animeName={element.animeTitle} 
                                animeImage={{ uri: element.animePic }} 
                                details={`${element.episodesNumber} episódios`}
                                isLoading={isLoading}/>
                        )
                    }
                </ListaPadrao>
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    page: {
        height: '100%'
    },
    listContainer: {
        flex: 1
    }
})


