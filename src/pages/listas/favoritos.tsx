import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import ListaPadrao from '../../components/lista-padrao'
import NavBar from '../../components/navBar'
import AnimeCardDetails from '../../components/anime-card-details'

import { getFavorites } from '../../services/animowo-api'
import { user } from '../../services/global'

export default function Favorito(){

    const [state, setState] = useState({
        favoritos: [{
            id: 0,
            animeTitle: '', 
            animePic: 'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png', 
            episodesNumber: 0
        }]
    })

    async function getUserList(){
        const response = getFavorites(user.id)
        

    }

    useEffect(()=>{
        getUserList()
    }, [])

    return (
        <View style={style.page}>
            <NavBar/>
            <View style={style.listContainer}>
                <ListaPadrao name="Favoritos">
                    {
                        state.favoritos.map((element, index) => 
                            <AnimeCardDetails key={index}
                                id={element.id}
                                animeName={element.animeTitle} 
                                animeImage={{ uri: element.animePic }} 
                                details={`${element.episodesNumber} Episódios`}/>
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
