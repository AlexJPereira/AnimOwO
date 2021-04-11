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


export default function AnimePage(props: AnimePageProps){

    const params = props.route.params
    const initialValues: animeDetailsResponse = {
        ...animeDetailsInitialValues,
        title: "Anime",
        main_picture: {
            medium: "https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png",
            large: "https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png"
        }, 
        synopsis: "Anime Description"
    }
    const [state, setState] = useState(initialValues)
    const [selectedList, setSelectedList] = useState("" as (listStatus | ""))
    
    async function getAnimeDetails(){
        const anime = await malApi.getAnimeDetails(params.id)
        if(anime){
            setState(anime)
            setSelectedList(anime.my_list_status?.status || "")
        }
    }

    async function setAnimeList(value: listStatus | ""){
        const newValue = value ? value as listStatus : undefined

        setSelectedList(value)
        const response = await malApi.updateAnimeInfo(params.id, {
            status: newValue
        })
        console.log(response ? `alterando com sucesso para ${response.status}` : "erro, nao foi alterado")
    }

    useEffect(()=>{
        getAnimeDetails()
    },[])

    return (
        <View style={PageStyle.mainStyle}>
            <NavBar></NavBar>
            <View style={PageStyle.cardStyle}>
                <Image source={{uri: state.main_picture.medium}} style={PageStyle.imageStyle}></Image>
                <View style={PageStyle.viewStyle}>
                    <View style={PageStyle.nameField}>
                        <Text style={PageStyle.titleStyle} ellipsizeMode='tail' numberOfLines={2}>{state.title}</Text>
                    </View>
                    <Text style={PageStyle.episodesStyle}>{state.num_episodes} Episódios</Text>
                    <View style={PageStyle.buttonField}>
                        <Button 
                            title={"ASSISTIR"} 
                            onPress={()=>{RootStackNavigator.navigate('watch-page', { anime: state })}}/>
                        <Button title={"DOWNLOAD"} onPress={()=>{}}/>
                    </View>
                </View>
                <Text style={PageStyle.noteStyle}>{state.mean}</Text>
            </View>

            <Selector options={[
                {text: "Sem Lista", value: ""},
                {text: "Completado", value: "completed"},
                {text: "Assistindo", value: "watching"},
                {text: "Desistido", value: "dropped"},
                {text: "Esperando", value: "on_hold"},
                {text: "Plano de assistir", value: "plan_to_watch"}
            ]} stateVariable={selectedList} setStateVariable={setAnimeList}/>

            <View>
                <Text style={PageStyle.sinopsysTitle}>Sinópse:</Text>
            </View>
            <ScrollView contentContainerStyle={PageStyle.sinopsysView}>
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
        maxHeight: screenHeight
    },
    viewStyle:{
        maxWidth: windowWidth/2
    },
    cardStyle:{
        justifyContent: 'space-around',
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
        justifyContent:'space-around'
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
        color: '#FFFFFF'
    },
    noteStyle:{
        textAlign: 'right',
        textAlignVertical: 'top',
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
        paddingHorizontal: 20,
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
    }
})
