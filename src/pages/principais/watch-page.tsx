import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    Image, 
    Text,
    Dimensions,
} from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { RootStackPagesProps } from '../rootStackNavigator';

import NavBar from '../../components/navBar'
import EpisodeCard from '../../components/episode-card';
import { ScrollView } from 'react-native-gesture-handler';

export type AnimePageProps = {
    route: RouteProp<RootStackPagesProps, 'watch-page'>
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;

export default function AnimePage(props: AnimePageProps){

    const anime = props.route.params.anime

    async function cancelFunction(episode: number){
        alert(episode)
    }
    
    const episodeList = []
    for(let episode=1; episode<=anime.num_episodes; episode++){
        episodeList.push(<EpisodeCard watchFunction={async ()=>{}} cancelFunction={()=>cancelFunction(episode)} saveFunction={async ()=>{}} value={episode} key={episode}/>)
    }
    
    return (
        <View style={PageStyle.mainStyle}>
            <NavBar/>
            <View style={PageStyle.cardStyle}> 
                <Image source={{uri: anime.main_picture.large}} style={PageStyle.imageStyle}></Image>
                <View style={PageStyle.titleCard}>
                    <Text style={PageStyle.titleStyle}>{anime.title}</Text>
                </View>
            </View>
            <ScrollView>
                { episodeList }
            </ScrollView>
        </View>
    )
}

const PageStyle = StyleSheet.create({
    mainStyle: {
        paddingBottom: screenHeight-windowHeight+30,
        maxHeight: screenHeight
    },
    cardStyle:{
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingTop: 30, 
        paddingBottom: 30
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
        fontSize: 25,
        lineHeight: 25,
        letterSpacing: 1,
        color: '#FFFFFF'
    },
    titleCard:{
        flex:1, 
        alignItems:'center', 
        justifyContent:'center'}
})