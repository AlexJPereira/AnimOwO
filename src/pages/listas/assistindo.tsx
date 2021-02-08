import React from 'react'
import { View, Text } from 'react-native'

import ListaPadrao from '../../components/lista-padrao'
import NavBar from '../../components/navBar'
import AnimeCardDetails from '../../components/anime-card-details'

const FMA = require('../../app-assets/animes-tests/fma.jpg')
const Gintama = require('../../app-assets/animes-tests/gintama.jpg')
const HunterXHunter = require('../../app-assets/animes-tests/hunterxhunter.jpg')
const SteinsGate = require('../../app-assets/animes-tests/steinsgate.jpg')

export default function Assistindo(){
    return (
        <View>
            <NavBar/>
            <ListaPadrao name="Assistindo">
                <AnimeCardDetails animeImage={FMA} animeName="Fullmetal Alchemist" details="Episódio 2 de 20"/>
                <AnimeCardDetails animeImage={Gintama} animeName="Gintama" details="Episódio 5 de 24"/>
                <AnimeCardDetails animeImage={HunterXHunter} animeName="Hunter X Hunter" details="Episódio 7 de 12"/>
                <AnimeCardDetails animeImage={SteinsGate} animeName="Steins Gate" details="Episódio 0 de 6"/>
            </ListaPadrao>
        </View>
    )
}



