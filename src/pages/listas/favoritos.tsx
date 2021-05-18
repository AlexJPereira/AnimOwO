import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import ListaPadrao from '../../components/lista-padrao'
import NavBar from '../../components/navBar'
import AnimeCardDetails from '../../components/anime-card-details'

import { getFavorites } from '../../services/animowo-api'
import { malApi, user } from '../../services/global'

export default function Favorito(){

    const defaultAnime = {
        id: 0,
        animeTitle: '', 
        animePic: 'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png', 
        episodesNumber: 0
    }

    const [state, setState] = useState({
        favoritos: [defaultAnime, defaultAnime, defaultAnime]
    })
    const [isLoading, setIsLoading] = useState(true)
    const [reloading, setReloading] = useState(false)

    async function getUserList(){
        const response = await getFavorites(user.id)
        
        if(!response?.anime_list)
            setState({ favoritos: [defaultAnime] })
        else
            setState({ favoritos: await createFavoriteList(response.anime_list) })
        setIsLoading(false)
    }

    async function createFavoriteList(favoriteList: number[]){
        const promises = favoriteList.map(async (animeId) => {
            const anime = await malApi.getAnimeDetails(animeId)
            return {
                id: anime?.id || 0,
                animeTitle: anime?.title || '',
                animePic: anime?.main_picture.medium || 'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png',
                episodesNumber: anime?.num_episodes || 0
            }
        })
        return Promise.all(promises)
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
                <ListaPadrao name="Favoritos" refreshState={reloading} refreshPageFunction={reloadPage}>
                    {
                        state.favoritos.map((element, index) => 
                            <AnimeCardDetails key={index}
                                id={element.id}
                                animeName={element.animeTitle} 
                                animeImage={{ uri: element.animePic }} 
                                details={`${element.episodesNumber} Episódios`}
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
