import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import ListaPadrao from '../../components/lista-padrao'
import NavBar from '../../components/navBar'
import AnimeCardDetails from '../../components/anime-card-details'
import { malApi } from '../../services/global'


export default function PlanoAssistir(){

    const defaultAnime = {
        id: 0,
        animeTitle: '', 
        animePic: 'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png', 
        episodesNumber: 0
    }

    const [state, setState] = useState({
        assistindo: [defaultAnime, defaultAnime, defaultAnime]
    })
    const [isLoading, setIsLoading] = useState(true)
    const [reloading, setReloading] = useState(false)

    async function getUserList(){
        const response = await malApi.getUserList('anime_title', 'plan_to_watch')
        
        setState({assistindo: [defaultAnime]})
        setIsLoading(false)
        
        if(response)
            setState({
                assistindo: response.data.map((element) => ({
                    id: element.node.id,
                    animeTitle: element.node.title,
                    animePic: element.node.main_picture.medium,
                    episodesNumber: element.node.num_episodes,
                }))
            })
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
                <ListaPadrao name="Plano de assistir" refreshState={reloading} refreshPageFunction={reloadPage}>
                    {
                        state.assistindo.map((element, index) => 
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


