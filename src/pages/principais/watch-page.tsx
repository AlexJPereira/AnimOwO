import React, { ReactElement, useState, createRef } from 'react';
import { 
    View, 
    StyleSheet, 
    Image, 
    Text,
    Dimensions,
    NativeScrollEvent,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { RouteProp } from '@react-navigation/native';
import { RootStackPagesProps } from '../rotas/rootNavigators/rootStackNavigator';
import * as AnimowoApi from '../../services/animowo-api'
import { VoteType } from '../../services/animowo-api/interfaces'
import { malApi, user } from '../../services/global';

import NavBar from '../../components/navBar'
import EpisodeCard from '../../components/episodes/episode-card';
import ModalEpisodeList from '../../components/episodes/modal-episode-list'
import ModalNewEpisode from '../../components/episodes/modal-new-episode'
import LinkCard from '../../components/link-card';

export type AnimePageProps = {
    route: RouteProp<RootStackPagesProps, 'watch-page'>
}

class ReactPersistentScrollViewRef{
    public scrollViewRef
    constructor(){
        this.scrollViewRef = createRef<ScrollView>()
    }
}
const References = new ReactPersistentScrollViewRef()

export default function AnimePage(props: AnimePageProps){

    const anime = props.route.params.anime
    const maxEpisodes = 80
    const [scrollNumOfEpisodes, setScrollNumOfEpisodes] = useState({
        offset: 0,
        numOfEpisodes: anime.num_episodes > maxEpisodes ? maxEpisodes : anime.num_episodes
    })
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

    let episodeList = [] as React.ReactElement[]
    for(let episodeNumber = 1; episodeNumber<=anime.num_episodes; episodeNumber++){
        episodeList.push(
            <EpisodeCard episodeNumber={episodeNumber} key={episodeNumber} setWatchListVisible={showEpisodeList} setLinkManagerVisible={showLinkManager}/>
        )
    }

    function getEpisodeListElements(currentEpisodeOffset: number, currentNumOfEpisodes: number){
        return episodeList.slice(currentEpisodeOffset, currentNumOfEpisodes)
    }

    function isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent){
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
    }

    function isCloseToTop({ contentOffset }: NativeScrollEvent){
        return contentOffset.y <= 1
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
        const episodes = await AnimowoApi.getAnimeLinks(anime.id, episodeNumber, user.id)
        return episodes.map((episode, index) => {
            return <LinkCard key={index} episode={episode} vote={vote}/>
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

    async function vote(voteType: VoteType, dataBaseId: string){
        const response = await AnimowoApi.vote(voteType, user.id, dataBaseId)
    }

    function scrollManager(nativeEvent: NativeScrollEvent){
        if(isCloseToBottom(nativeEvent) && scrollNumOfEpisodes.numOfEpisodes < anime.num_episodes){
            const newNumOfEpisodes = 
                ((scrollNumOfEpisodes.numOfEpisodes+maxEpisodes/2) > anime.num_episodes ?
                    anime.num_episodes 
                    : (scrollNumOfEpisodes.numOfEpisodes+maxEpisodes/2))
            setScrollNumOfEpisodes({offset: newNumOfEpisodes-maxEpisodes, numOfEpisodes: newNumOfEpisodes});
            References.scrollViewRef.current?.scrollTo({ y: nativeEvent.contentSize.height/2-nativeEvent.layoutMeasurement.height, animated: false })
            return
        }

        if(isCloseToTop(nativeEvent) && scrollNumOfEpisodes.offset > 0){
            const newOffset = ((scrollNumOfEpisodes.offset-maxEpisodes/2) < 0 ? 0 : (scrollNumOfEpisodes.offset-maxEpisodes/2))
            setScrollNumOfEpisodes({offset: newOffset, numOfEpisodes: newOffset+maxEpisodes})
            References.scrollViewRef.current?.scrollTo({ y: nativeEvent.contentSize.height/2, animated: false })
        }
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
            <ScrollView ref={References.scrollViewRef}
                onScroll={({nativeEvent}) =>scrollManager(nativeEvent)}
                snapToStart={false}>
                { getEpisodeListElements(scrollNumOfEpisodes.offset, scrollNumOfEpisodes.numOfEpisodes) }
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