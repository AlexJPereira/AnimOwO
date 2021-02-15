import React from 'react'
import { View } from 'react-native'

import ListaPadrao from '../../components/lista-padrao'
import NavBar from '../../components/navBar'
import AnimeCardDetails from '../../components/anime-card-details'

const FMA = require('../../app-assets/animes-tests/fma.jpg')
const Gintama = require('../../app-assets/animes-tests/gintama.jpg')
const HunterXHunter = require('../../app-assets/animes-tests/hunterxhunter.jpg')
const SteinsGate = require('../../app-assets/animes-tests/steinsgate.jpg')

export default function Favorito(){
    return (
        <View>
            <NavBar/>
            <ListaPadrao name="Favoritos">
                <AnimeCardDetails animeImage={HunterXHunter} animeName="Hunter X Hunter" details="Reassistido 3 vezes"/>
                <AnimeCardDetails animeImage={Gintama} animeName="Gintama" details="Reassistido 2 vezes"/>
                <AnimeCardDetails animeImage={FMA} animeName="Fullmetal Alchemist" details="Reassistido 0 vezes"/>
                <AnimeCardDetails animeImage={SteinsGate} animeName="Steins Gate" details="Reassistido 1 vez"/>
            </ListaPadrao>
        </View>
    )
}



