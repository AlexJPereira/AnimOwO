import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import ListaPadrao from '../../components/lista-padrao'
import NavBar from '../../components/navBar'
import AnimeCardDetails from '../../components/anime-card-details'
import { malApi } from '../../services/global'

export default function Assistindo(){

    const [state, setState] = useState({
        assitindo: [{
            animeTitle: '', 
            animePic: 'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png', 
            episodesNumber: 0, 
            episodesWatched: 0
        }]
    })

    async function getUserList(){
        const response = await malApi.getUserList('watching', 'anime_title')
        if(response)
            setState({
                assitindo: response.data.map((element) => ({
                    animeTitle: element.node.title,
                    animePic: element.node.main_picture.medium,
                    episodesNumber: element.node.num_episodes,
                    episodesWatched: element.node.my_list_status.num_episodes_watched
                }))
            })
    }

    useEffect(()=>{
        getUserList()
    }, [])
    
    return (
        <View>
            <NavBar/>
            <ListaPadrao name="Assistindo">
                {
                    state.assitindo.map((element, index) => 
                        <AnimeCardDetails key={index}
                            animeName={element.animeTitle} 
                            animeImage={{ uri: element.animePic }} 
                            details={`Episódio ${element.episodesWatched} de ${element.episodesNumber}`}/>
                    )
                }
            </ListaPadrao>
        </View>
    )
}



