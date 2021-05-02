import React, { useState, useEffect } from 'react'
import { View } from 'react-native'

import ListaPadrao from '../../components/lista-padrao'
import NavBar from '../../components/navBar'
import AnimeCardDetails from '../../components/anime-card-details'
import { malApi } from '../../services/global'


export default function PlanoAssistir(){

    const [state, setState] = useState({
        assitindo: [{
            id: 0,
            animeTitle: '', 
            animePic: 'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png', 
            episodesNumber: 0
        }]
    })

    async function getUserList(){
        const response = await malApi.getUserList('anime_title', 'plan_to_watch')
        if(response)
            setState({
                assitindo: response.data.map((element) => ({
                    id: element.node.id,
                    animeTitle: element.node.title,
                    animePic: element.node.main_picture.medium,
                    episodesNumber: element.node.num_episodes,
                }))
            })
    }

    useEffect(()=>{
        getUserList()
    }, [])

    return (
        <View>
            <NavBar/>
            <ListaPadrao name="Plano de assistir">
                {
                    state.assitindo.map((element, index) => 
                        <AnimeCardDetails key={index}
                            id={element.id}
                            animeName={element.animeTitle} 
                            animeImage={{ uri: element.animePic }} 
                            details={`${element.episodesNumber} Episódios`}/>
                    )
                }
            </ListaPadrao>
        </View>
    )
}



