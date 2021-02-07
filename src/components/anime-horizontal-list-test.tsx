import React from 'react'

import AnimeHorizontalList from './anime-horizontal-list'
import AnimeCard from './anime-card'

const FMA = require('../app-assets/animes-tests/fma.jpg')
const Gintama = require('../app-assets/animes-tests/gintama.jpg')
const HunterXHunter = require('../app-assets/animes-tests/hunterxhunter.jpg')
const SteinsGate = require('../app-assets/animes-tests/steinsgate.jpg')

export default function AnimeHorizontalListTest(){
    return (
        <AnimeHorizontalList>
            <AnimeCard image={SteinsGate} name="Steins Gate"/>
            <AnimeCard image={FMA} name="Fullmetal Alchemist"/>
            <AnimeCard image={Gintama} name="Gintama"/>
            <AnimeCard image={HunterXHunter} name="Hunter X Hunter"/>
            <AnimeCard image={SteinsGate} name="Steins Gate"/>
            <AnimeCard image={FMA} name="Fullmetal Alchemist"/>
            <AnimeCard image={Gintama} name="Gintama"/>
            <AnimeCard image={HunterXHunter} name="Hunter X Hunter"/>
        </AnimeHorizontalList>
    )
}