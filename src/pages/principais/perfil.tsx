import React, { useEffect, useState } from 'react';
import { 
    View, 
    ScrollView, 
    Text, 
    StyleSheet} from 'react-native';

import NavBar from '../../components/navBar';
import Button from '../../components/button';
import ProfileCard from '../../components/profile-card';
import { malApi } from '../../services/global';
import { user } from '../../services/global'
import { RootStackNavigator } from '../rotas/rootNavigators/rootStackNavigator'
import AnimeHorizontalList from '../../components/anime-horizontal-list';
import AnimeCard from '../../components/anime-card';
import { RefreshControl } from 'react-native';

const defaultImage = 'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png';

export default function Perfil(){

    const defaultAnime = {
        name: '',
        pic: '',
        id: 0
    }

    const [state, setState] = useState({
        username: "Anonimo",
        profilePic: "https://i1.wp.com/www.camaragibe.pe.gov.br/wp-content/uploads/2019/04/default-user-male.png?fit=640%2C605&ssl=1",
        qtdCompletos: 0,
        qtdAssistindo: 0,
        qtdPlanoAssistir: 0
    })
    const [animeList, setAnimeList] = useState([defaultAnime, defaultAnime, defaultAnime, defaultAnime] as {name: string, pic: string, id: number}[])
    const [isLoading, setIsLoading] = useState(true)
    const [reloading, setReloading] = useState(false)
    
    async function logoff(){
        await malApi.logoff()
        RootStackNavigator.navigate('login')
    }

    async function getUser(){
        try{
            if(user){
                setState({...state,
                    username: user.name,
                    profilePic: user.picture == "" ? state.profilePic : user.picture,
                    qtdCompletos: user.anime_statistics.num_items_completed,
                    qtdAssistindo: user.anime_statistics.num_items_watching,
                    qtdPlanoAssistir: user.anime_statistics.num_items_plan_to_watch
                })
            }
        }catch(error){ }
    }

    async function getLastUpdatedAnimes(){
        const response = await malApi.getUserList('list_updated_at', undefined, undefined, undefined, 20)
        const newList = response?.data.map(anime => ({
            id: anime.node.id,
            name: anime.node.title,
            pic: anime.node.main_picture ? anime.node.main_picture.medium : defaultImage
        }))

        if(newList)
            setAnimeList(newList)
        setIsLoading(false)
    }

    function createAnimeList(){
        return animeList.map((anime, index) => (
            <AnimeCard key={index} id={ anime.id } image={{ uri: anime.pic }} name={ anime.name } isLoading={isLoading}/>
        ))
    }

    async function reloadPage(){
        setReloading(true)
        await getUser()
        await getLastUpdatedAnimes()
        setReloading(false)
    }

    useEffect(()=>{
        getUser()
        getLastUpdatedAnimes()
    }, [])

    return (
        <View> 
            <NavBar/>
            <ScrollView refreshControl={ 
                <RefreshControl refreshing={reloading} onRefresh={reloadPage}/>
            }>
                <View style={PerfilStyle.screenStyle}>
                    <Text style={PerfilStyle.textStyle}> Bem vindo, {state.username}</Text>
                    <ProfileCard 
                        profilePic={{uri: state.profilePic}}
                        qtdAssistindo={state.qtdAssistindo}
                        qtdCompletos={state.qtdCompletos}
                        qtdPlanoAssistir={state.qtdPlanoAssistir}
                        />
                    <Text style={PerfilStyle.textStyle}> Últimos Animes adicionados</Text>
                    <AnimeHorizontalList>
                        {createAnimeList()}
                    </AnimeHorizontalList>
                    <View style={PerfilStyle.buttonStyle}>
                        <Button onPress={logoff} title={"SAIR"}></Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const PerfilStyle = StyleSheet.create({
    screenStyle:{
        display:'flex',
        flex: 1,
        justifyContent: 'space-between'
    }, 
    textStyle:{ 
        textAlign: 'left',
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        lineHeight: 23,
        letterSpacing: 1,
        color: '#FFFFFF', 
        paddingBottom: 20,
        paddingTop: 20
    },
    buttonStyle:{
        alignSelf:'center'
    }
})