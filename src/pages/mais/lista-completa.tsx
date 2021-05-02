import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import ListaPadrao from '../../components/lista-padrao'
import NavBar from '../../components/navBar'
import AnimeCardDetails from '../../components/anime-card-details'
import Selector from '../../components/selector'

import { listStatus } from '../../services/mal-api/interfaces'
import { malApi } from '../../services/global'

export default function ListaCompleta(){

    const [selectorState, selectorSetState] = useState(undefined as (listStatus | undefined))
    const [currentList, setCurrentList] = useState([] as React.ReactElement[])

    const selectorOptions = [
        {text: 'Todos os Animes', value: undefined},
        {text: 'Assistindo', value: 'watching'},
        {text: 'Completos', value: 'completed'},
        {text: 'Em Espera', value: 'on_hold'},
        {text: 'Rejeitados', value: 'dropped'},
        {text: 'Plano de Assistir', value: 'plan_to_watch'}
    ] as {text: string, value: listStatus | undefined}[]

    function getSelectorText(value: listStatus | undefined){
        const brText = selectorOptions.find((elem) => (
            elem.value === value
        ))
        return brText?.text || 'Todos os Animes'
    }

    async function getList(listType: listStatus | undefined){
        const response = await malApi.getUserList('anime_title', listType)
        return response ? response.data.map((anime, index) => {
            return <AnimeCardDetails 
                key={index}
                animeImage={{ uri: anime.node.main_picture.medium }}
                animeName={anime.node.title}
                details={`Episódio ${anime.node.my_list_status?.num_episodes_watched} de ${anime.node.num_episodes}`}
                id={anime.node.id}
            />
        }) : [] as React.ReactElement[]
    }

    async function changeList(listType: listStatus | undefined){
        setCurrentList(await getList(listType))
        selectorSetState(listType)
    }

    useEffect(()=>{
        changeList(undefined)
    }, [])

    return (
        <View>
            <NavBar/>

            <View style={style.selectorContainer}>
                <Selector
                    options={selectorOptions} 
                    setStateVariable={changeList} 
                    stateVariable={selectorState}/>
            </View>

            <ListaPadrao name={getSelectorText(selectorState)}>
                {
                    currentList
                }
            </ListaPadrao>
        </View>
    )
}

const style = StyleSheet.create({
    selectorContainer: {
        marginTop: 30,
        flexDirection: 'row',
        paddingHorizontal: '5%'
    }
})


