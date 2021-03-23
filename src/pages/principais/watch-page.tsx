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
import * as AnimowoApi from '../../services/animowo-api'
import { malApi, user } from '../../services/global';

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
    const [newEpisodeModal, setNewEpisodeModal] = useState({
        isLoading: true,
        possuiEpisodio: false,
        link: '',
        databaseId: ''
    })
    
    const episodeList = []
    for(let episode=1; episode<=anime.num_episodes; episode++){
        episodeList.push(
            <EpisodeCard episodeNumber={episode} key={episode} setWatchListVisible={showEpisodeList} setLinkManagerVisible={showLinkManager}/>
        )
    }

    async function showLinkManager(episodeNumber: number){
        setCurrentModalEpisode(episodeNumber)
        setNewEpisodeModal({isLoading: true, possuiEpisodio: false, link: '', databaseId: ''})
        setLinkManagerVisible(true)
        const link = await jaPossuiEpisodioCadastrado(episodeNumber)
        setNewEpisodeModal({
            isLoading: false, 
            possuiEpisodio: link ? true: false,
            link: link ? link.link : '', 
            databaseId: link ? link._id : ''
        })
    }

    async function showEpisodeList(episodeNumber: number){
        setCurrentModalEpisode(episodeNumber)
        const episodeList = await getEpisodeLinks(episodeNumber)
        setCurrentModalEpisodeList(episodeList)
        setWatchListVisible(true)
    }

    async function getEpisodeLinks(episodeNumber: number){
        const episodes = await AnimowoApi.getAnimeLinks(anime.id, episodeNumber)
        return episodes.map((episode, index) => {
            return <LinkCard episode={episode} key={index}/>
        })
    }

    async function jaPossuiEpisodioCadastrado(episodeNumber: number){
        const links = await AnimowoApi.getAnimeLinks(anime.id, episodeNumber)
        const user = await malApi.getUserProfileInfo()
        const episode = links.find(link => link.userId === user?.id)
        return episode ? episode : undefined
    }

    async function salvarEpisodio(episodeNumber: number, link: string){
        if(newEpisodeModal.possuiEpisodio && link !== newEpisodeModal.link){
            const response = await AnimowoApi.editAnimeLink(newEpisodeModal.databaseId, {
                link: link,
                userId: user.id
            })
            alert('anime editado com sucesso')
        }else{
            const response = await AnimowoApi.postAnimeLink({
                animeId: anime.id,
                link: link,
                numEpisode: episodeNumber,
                userId: user.id
            })
            alert('anime adicionado com sucesso')
        }
    }

    async function apagarEpisodio(episodeNumber: number){
        const response = await AnimowoApi.deleteAnimeLink(newEpisodeModal.databaseId, user.id)
        alert('anime apagado com sucesso')
    }
    
    return (
        <View style={PageStyle.mainStyle}>
            <ModalNewEpisode
                isVisible={isLinkManagerVisible} 
                setVisible={setLinkManagerVisible}
                isLoading={newEpisodeModal.isLoading}
                possuiEpisodio={newEpisodeModal.possuiEpisodio}
                episodeNumber={currentModalEpisode}
                animeId={anime.id}
                link={newEpisodeModal.link}
                apagarEpisodio={apagarEpisodio}
                salvarEpisodio={salvarEpisodio}/>
            <ModalEpisodeList
                setVisible={setWatchListVisible}
                watchVisible={isWatchListVisible}>
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