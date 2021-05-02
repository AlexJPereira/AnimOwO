import React, { useState, useEffect } from 'react'
import { View } from 'react-native'

import ListaPadrao from '../../components/lista-padrao'
import NavBar from '../../components/navBar'
import AnimeCardDetails from '../../components/anime-card-details'

export default function Favorito(){

    const [state, setState] = useState({
        assitindo: [{
            id: 0,
            animeTitle: '', 
            animePic: 'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png', 
            episodesNumber: 0
        }]
    })

    async function getUserList(){
        
    }

    useEffect(()=>{
        getUserList()
    }, [])

    return (
        <View>
            <NavBar/>
            <ListaPadrao name="Favoritos">
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



