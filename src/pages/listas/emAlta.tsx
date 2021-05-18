import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import ListaPadrao from '../../components/lista-padrao'
import NavBar from '../../components/navBar'
import AnimeCardDetails from '../../components/anime-card-details'
import { malApi } from '../../services/global'

export default function EmAlta(){

    const defaultAnime = {
        id: 0,
        animeTitle: '', 
        animePic: 'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png', 
        episodesNumber: 0, 
    }
    
    const [state, setState] = useState({
        emAlta: [defaultAnime, defaultAnime, defaultAnime]
    })
    const [isLoading, setIsLoading] = useState(true)
    const [reloading, setReloading] = useState(false)

    async function getUserList(){
        const emAltaResponse = await malApi.getAnimeRankingList('airing', 20)

        if(emAltaResponse)
            setState({
                emAlta: emAltaResponse ? emAltaResponse.data.map((element) => ({
                    id: element.node.id,
                    animePic: element.node.main_picture.medium,
                    animeTitle: element.node.title,
                    episodesNumber: element.node.num_episodes
                })) : [] as {id: number, animePic: string, animeTitle: string, episodesNumber: number}[],
            })
        else
            setState({emAlta: [defaultAnime]})

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
                <ListaPadrao name="Em Alta" refreshState={reloading} refreshPageFunction={reloadPage}>
                    {
                        state.emAlta.map((element, index) => 
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


