import React, { useState } from 'react';
import { 
    View, 
    ScrollView, 
    Text, 
    StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import NavBar from '../../components/navBar';
import AnimeHorizontalListTest from '../../components/anime-horizontal-list-test';
import Button from '../../components/button';
import pagesNames from '../pagesNames';
import ProfileCard from '../../components/profile-card';
import { malApi } from '../../services/global';


export default function Perfil(){

    const navigation = useNavigation()
    const [state, setState] = useState({
        username: "Anonimo",
        profilePic: "https://i1.wp.com/www.camaragibe.pe.gov.br/wp-content/uploads/2019/04/default-user-male.png?fit=640%2C605&ssl=1",
        qtdCompletos: 0,
        qtdAssistindo: 0,
        qtdPlanoAssistir: 0
    })
    getUser()
    
    async function logoff(){
        await malApi.logoff()
        navigation.navigate(pagesNames.login)
    }

    async function getUser(){
        const user = await malApi.getUserProfileInfo()
        if(user){
            setState({...state,
                username: user.name,
                profilePic: user.picture == "" ? state.profilePic : user.picture,
                qtdCompletos: user.anime_statistics.num_items_completed,
                qtdAssistindo: user.anime_statistics.num_items_watching,
                qtdPlanoAssistir: user.anime_statistics.num_items_plan_to_watch
            })
        }
    }

    return (
        <View> 
            <NavBar/>
            <ScrollView>
                <View style={PerfilStyle.screenStyle}>
                    <Text style={PerfilStyle.textStyle}> Bem vindo, {state.username}</Text>
                    <ProfileCard 
                        profilePic={{uri: state.profilePic}}
                        qtdAssistindo={state.qtdAssistindo}
                        qtdCompletos={state.qtdCompletos}
                        qtdPlanoAssistir={state.qtdPlanoAssistir}
                        />
                    <Text style={PerfilStyle.textStyle}> Últimos Animes adicionados</Text>
                    <AnimeHorizontalListTest/>
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