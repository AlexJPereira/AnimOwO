import React from 'react'
import { View } from 'react-native'

import ListaPadrao from '../../components/lista-padrao'
import NavBar from '../../components/navBar'
import AnimeCardDetails from '../../components/anime-card-details'

const FMA = require('../../app-assets/animes-tests/fma.jpg')
const Gintama = require('../../app-assets/animes-tests/gintama.jpg')
const HunterXHunter = require('../../app-assets/animes-tests/hunterxhunter.jpg')
const SteinsGate = require('../../app-assets/animes-tests/steinsgate.jpg')

export default function PlanoAssistir(){
    return (
        <View>
            <NavBar/>
            <ListaPadrao name="Plano de assistir">
                <AnimeCardDetails animeImage={Gintama} animeName="Gintama" details="24 Episódios"/>
                <AnimeCardDetails animeImage={HunterXHunter} animeName="Hunter X Hunter" details="12 Episódios"/>
                <AnimeCardDetails animeImage={SteinsGate} animeName="Steins Gate" details="6 Episódios"/>
                <AnimeCardDetails animeImage={FMA} animeName="Fullmetal Alchemist" details="20 Episódios"/>
            </ListaPadrao>
        </View>
    )
}



