import React, { ReactElement, useState } from 'react';
import { 
    View, 
    StyleSheet, 
    Image, 
    Text,
    Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { RouteProp } from '@react-navigation/native';
import { RootStackPagesProps } from '../rootStackNavigator';

import NavBar from '../../components/navBar'
import EpisodeCard from '../../components/episodes/episode-card';
import ModalEpisodeList from '../../components/episodes/modal-episode-list'
import ModalNewEpisode from '../../components/episodes/modal-new-episode'
import LinkCard from '../../components/link-card';


export type AnimePageProps = {
    route: RouteProp<RootStackPagesProps, 'watch-page'>
}

export default function AnimePage(props: AnimePageProps){

    const anime = props.route.params.anime
    const [isWatchListVisible, setWatchListVisible] = useState(false);
    const [isLinkManagerVisible, setLinkManagerVisible] = useState(false);
    const [currentModalEpisode, setCurrentModalEpisode] = useState(1)
    const [currentModalEpisodeList, setCurrentModalEpisodeList] = useState([] as ReactElement[])
    
    const episodeList = []
    for(let episode=1; episode<=anime.num_episodes; episode++){
        episodeList.push(
            <EpisodeCard episodeNumber={episode} key={episode} setWatchListVisible={showEpisodeList} setLinkManagerVisible={showLinkManager}/>
        )
    }

    async function showLinkManager(episodeNumber: number){
        setCurrentModalEpisode(episodeNumber)
        setLinkManagerVisible(true)
    }

    async function showEpisodeList(episodeNumber: number){
        setCurrentModalEpisode(episodeNumber)
        const episodeList = await getEpisodeLinks(episodeNumber)
        setCurrentModalEpisodeList(episodeList)
        setWatchListVisible(true)
    }

    async function getEpisodeLinks(episodeNumber: number){
        const testList = [] as ReactElement[]
        testList.push(<LinkCard key={1}/>)
        testList.push(<LinkCard key={2}/>)
        return testList
    }
    
    return (
        <View style={PageStyle.mainStyle}>
            <ModalNewEpisode
                isVisible={isLinkManagerVisible} 
                setVisible={setLinkManagerVisible} 
                episodeNumber={currentModalEpisode}/>
            <ModalEpisodeList setVisible={setWatchListVisible} watchVisible={isWatchListVisible}>
                { currentModalEpisodeList }
            </ModalEpisodeList>
            <NavBar/>
            <View style={PageStyle.cardStyle}> 
                <Image source={{uri: anime.main_picture.large}} style={PageStyle.imageStyle}></Image>
                <View style={PageStyle.titleCard}>
                    <Text style={PageStyle.titleStyle} ellipsizeMode='tail' numberOfLines={5}>{anime.title}</Text>
                </View>
            </View>
            <ScrollView>
                { episodeList }
            </ScrollView>
        </View>
    )
}

const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;

const PageStyle = StyleSheet.create({
    mainStyle: {
        paddingBottom: screenHeight-windowHeight+30,
        maxHeight: screenHeight
    },
    cardStyle:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 30, 
        paddingBottom: 30,
        paddingHorizontal: 20 
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
        paddingLeft: 30,
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