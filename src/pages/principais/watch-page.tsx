import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    Image, 
    Text,
    Dimensions,
    Button } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { RootStackPagesProps } from '../rootStackNavigator';

import NavBar from '../../components/navBar'
import EpisodeCard from '../../components/episode-card';
import { ScrollView } from 'react-native-gesture-handler';

export type AnimePageProps = {
    route: RouteProp<RootStackPagesProps, 'link-page'>
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;

export default function AnimePage(props: AnimePageProps){

    const params = props.route.params

    return (
        <View style={PageStyle.mainStyle}>
            <NavBar/>
            <View style={PageStyle.cardStyle}> 
                <Image source={params.animeImage} style={PageStyle.imageStyle}></Image>
                <View style={PageStyle.titleCard}>
                    <Text style={PageStyle.titleStyle}>{params.animeName}</Text>
                    <Text style={PageStyle.titleStyle}> Temporada {params.animeSeason} </Text>
                </View>
            </View>
            <ScrollView>
                <EpisodeCard value={1}/>
                <EpisodeCard value={2}/>
                <EpisodeCard value={3}/>
                <EpisodeCard value={4}/>
                <EpisodeCard value={5}/>
                <EpisodeCard value={7}/>
                <EpisodeCard value={8}/>
                <EpisodeCard value={9}/>
                <EpisodeCard value={10}/>
                <EpisodeCard value={11}/>
                <EpisodeCard value={12}/>
                <EpisodeCard value={13}/>
                <EpisodeCard value={14}/>
                <EpisodeCard value={15}/>
                <EpisodeCard value={16}/>
                <EpisodeCard value={17}/>
                <EpisodeCard value={18}/>
                <EpisodeCard value={19}/>
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