import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import ListaPadrao from '../../components/lista-padrao'
import NavBar from '../../components/navBar'
import AnimeCardDetails from '../../components/anime-card-details'
import { malApi, user } from '../../services/global'
import { getRecommendations } from '../../services/animowo-api'

export default function Recomendados(){

    const defaultAnime = {
        id: 0,
        animeTitle: '', 
        animePic: 'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png', 
        episodesNumber: 0,
    }
    
    const [state, setState] = useState({
        assistindo: [defaultAnime, defaultAnime, defaultAnime]
    })
    const [isLoading, setIsLoading] = useState(true)
    const [reloading, setReloading] = useState(false)

    async function getUserList(){
        let recomendadosResponse
        try{
            recomendadosResponse = await getRecommendations(user.id)
        }catch(error){}

        let promises
        if(recomendadosResponse)
            promises = recomendadosResponse.predict_list.map(async (recommendationId) => {
                const animeDetails = await malApi.getAnimeDetails(recommendationId)
                return ({
                    id: animeDetails ? animeDetails.id : 0,
                    animePic: animeDetails ? animeDetails.main_picture.medium : '',
                    animeTitle: animeDetails ? animeDetails.title : '',
                    episodesNumber: animeDetails ? animeDetails.num_episodes : 0
                })
            })
        const recomendados = await Promise.all(promises ? promises : [])

        if(recomendados)
            setState({
                assistindo: recomendados
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
                <ListaPadrao name="Recomendados" refreshState={reloading} refreshPageFunction={reloadPage}>
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


