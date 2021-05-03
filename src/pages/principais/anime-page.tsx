import React, {useEffect, useState} from 'react';
import { 
    View, 
    ScrollView,
    Image,
    Text,
    StyleSheet,
    Dimensions } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { RootStackPagesProps } from '../rootStackNavigator';
import { RootStackNavigator } from '../rootStackNavigator';
import Button from '../../components/button';
import NavBar from '../../components/navBar';
import Selector from '../../components/selector'

import { malApi } from '../../services/global'
import { animeDetailsInitialValues, animeDetailsResponse, listStatus } from "../../services/mal-api/interfaces";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;


export type AnimePageProps = {
    route: RouteProp<RootStackPagesProps, 'anime-page'>
}
type possibleScores = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

const defaultImage = 'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png'; 

export default function AnimePage(props: AnimePageProps){

    const starEmoji = "⭐"
    const params = props.route.params
    const initialValues: animeDetailsResponse = {
        ...animeDetailsInitialValues,
        title: "Anime",
        main_picture: {
            medium: defaultImage,
            large: defaultImage
        }, 
        synopsis: "Anime Description"
    }
    const [state, setState] = useState(initialValues)
    const [selectedList, setSelectedList] = useState("" as (listStatus | ""))
    const [userScore, setUserScore] = useState(0 as possibleScores)
    
    async function getAnimeDetails(){
        const anime = await malApi.getAnimeDetails(params.id)
        
        if(anime && anime?.main_picture === undefined)
            anime.main_picture = {
                medium: defaultImage,
                large: defaultImage
            }
        
        if(anime){
            setState(anime)
            setSelectedList(anime.my_list_status?.status || "")
            const score = anime.my_list_status?.score as possibleScores
            setUserScore(score ? score : 0)
        }
    }

    async function setAnimeList(value: listStatus | ""){
        const newValue = value ? value as listStatus : undefined

        setSelectedList(value)
        const response = await malApi.updateAnimeInfo(params.id, {
            status: newValue
        })
        console.log(response ? `alterando lista para ${response.status}` : "erro, nao foi alterado")
    }

    async function setAnimeUserScore(value: possibleScores){
        setUserScore(value)
        const response = await malApi.updateAnimeInfo(params.id, {
            score: value ? value : undefined
        })
        console.log(response ? `alterado nota para ${value}` : `erro, nao foi alterado`)
    }

    function getScoreObject(){
        const scores = [0,1,2,3,4,5,6,7,8,9,10] as possibleScores[]
        return scores.map((score) => {
            return {
                text: score !== 0 ?  (score + " " + starEmoji) : "Sem Nota",
                value: score
            }
        })
    }

    function convertSeason(season: string){
        const ptbrSeason: {[seasonName: string]: string} = {}
        ptbrSeason["summer"] = "Verão"
        ptbrSeason["fall"] = "Outono"
        ptbrSeason["winter"] = "Inverno"
        ptbrSeason["spring"] = "Primavera"

        return ptbrSeason[season]
    }

    function numberWithCommas(x: number) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    useEffect(()=>{
        getAnimeDetails()
    },[])

    return (
        <View style={PageStyle.mainStyle}>
            <NavBar/>
            <ScrollView contentContainerStyle={PageStyle.sinopsysView}>
                <View style={PageStyle.cardStyle}>
                    <Image source={{uri: state.main_picture.medium}} style={PageStyle.imageStyle}></Image>
                    <View style={PageStyle.viewStyle}>
                        <View style={PageStyle.nameField}>
                            <Text style={PageStyle.titleStyle} ellipsizeMode='tail' numberOfLines={2}>{state.title}</Text>
                        </View>
                        <Text style={PageStyle.noteStyle}>{state.mean} {starEmoji}</Text>
                        <Text style={PageStyle.episodesStyle}>{state.num_episodes} Episódios</Text>
                        <View style={PageStyle.buttonField}>
                            <Button 
                                title={"ASSISTIR"} 
                                onPress={()=>{RootStackNavigator.navigate('watch-page', { anime: state })}}/>
                        </View>
                        <Text style={PageStyle.titleStyle}>{numberWithCommas(state.num_list_users)} usuários</Text>
                        <Text style={PageStyle.titleStyle}>Rank {state.rank}</Text>
                        <Text style={PageStyle.titleStyle}>{convertSeason(state.start_season.season)} de {state.start_season.year}</Text>
                    </View>
                    
                </View>

                <View style={PageStyle.editAnimeContainer}>
                    <View style={PageStyle.editAnimeSelectorContainer}>
                        <Selector options={[
                            {text: "Sem Lista", value: ""},
                            {text: "Completado", value: "completed"},
                            {text: "Assistindo", value: "watching"},
                            {text: "Desistido", value: "dropped"},
                            {text: "Esperando", value: "on_hold"},
                            {text: "Plano de assistir", value: "plan_to_watch"}
                        ]} stateVariable={selectedList} setStateVariable={setAnimeList}/>
                        {selectedList !== "" ? 
                        <Selector options={getScoreObject()} stateVariable={userScore} setStateVariable={setAnimeUserScore}/>
                        : null}
                    </View>
                </View>

                <View>
                    <Text style={PageStyle.sinopsysTitle}>Sinópse:</Text>
                </View>
                    
                
                <View style={PageStyle.sinopsysCard}>
                        <Text>{state.synopsis}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const PageStyle = StyleSheet.create({
    mainStyle: {
        paddingBottom: screenHeight-windowHeight+30,
    },
    viewStyle:{
        maxWidth: windowWidth/2-10,
        paddingLeft: 10
    },
    cardStyle:{
        flexDirection: 'row'
    },
    imageStyle:{
        width: 104*1.25, 
        height: 159.69*1.25
    },
    nameField:{
        justifyContent: 'space-between',
        flexDirection: 'row'
    }, 
    buttonField:{
        flex: 1,
        paddingTop: 10,
        justifyContent:'flex-start'
    },
    titleStyle:{
        textAlign: 'left',
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 1,
        color: '#FFFFFF',
    },
    noteStyle:{
        textAlignVertical: 'bottom',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        lineHeight: 23,
        letterSpacing: 1,
        color: '#FFFFFF'
    },
    episodesStyle:{
        textAlign: 'left',
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 1,
        color: '#AB3962'
    },
    sinopsysTitle:{
        textAlign: 'left',
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 1,
        color: '#FFFFFF'
    }, 
    sinopsysView:{
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    sinopsysCard:{
        backgroundColor: '#C4C4C4',
        paddingBottom: 30
    },
    seasonCard: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around',
        paddingTop: 20, 
        paddingBottom: 20
    },
    editAnimeContainer: {
        paddingVertical: 20,
    },
    editAnimeSelectorContainer: {
        flexDirection: 'row',
    }
})
