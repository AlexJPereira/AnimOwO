import React from 'react'
import { 
    View, 
    ScrollView, 
    Text, 
    StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import NavBar from '../../components/navBar'
import AnimeHorizontalListTest from '../../components/anime-horizontal-list-test'
import Button from '../../components/button'
import pagesNames from '../pagesNames'
import ProfileCard from '../../components/profile-card'
import TextStyle from '../../styles/text'


export default function Perfil(){

    const navigation = useNavigation()

    function navigateToLogin(){
        navigation.navigate(pagesNames.login)
    }

    return (
        <View> 
            <NavBar/>
            <ScrollView>
                <View style={PerfilStyle.screenStyle}>
                    <Text style={PerfilStyle.textStyle}> Bem vindo, Wykke</Text>
                    <ProfileCard/>
                    <Text style={PerfilStyle.textStyle}> Últimos Animes adicionados</Text>
                    <AnimeHorizontalListTest/>
                    <View style={PerfilStyle.buttonStyle}>
                        <Button onPress={navigateToLogin} title={"SAIR"}></Button>
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