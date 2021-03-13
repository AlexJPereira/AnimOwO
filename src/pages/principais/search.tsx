import React, { useState } from 'react'
import { 
    View,
    StyleSheet, 
    ScrollView, FlatList} from 'react-native';

import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { malApi } from '../../services/global';
import AnimeCard, { AnimeCardProps } from '../../components/anime-card'

import colorStyle from '../../styles/color'; 

export default function Search(){

    const [state, setState] = useState('');

    const [response, setResponse] = useState({
        resultado: [] as AnimeCardProps[]
    });

    async function getSearch(term:string){
        setState(term);
        if(term){
            const searchResponse = await malApi.searchAnime(term);
            setResponse({
                resultado: searchResponse ? searchResponse.data.map((element) => ({
                    id: element.node.id,
                    image: { uri: element.node.main_picture.medium },
                    name: element.node.title
                })) : [] as AnimeCardProps[]
            }
            )
        }else{
            setResponse({
                resultado: [] as AnimeCardProps[]
            })
        }
    }

    return (
        <View>
            <Searchbar
                icon={() => <Ionicons name="search" size={24} style={PageStyle.iconStyle}/>}
                placeholder="Pesquisar"
                placeholderTextColor='#C4C4C4'
                selectionColor='#fff'
                onChangeText={query => getSearch(query)}
                value={state}
                style={PageStyle.barStyle}
                inputStyle={{color:'#fff'}}
            />
            <ScrollView >
                {response.resultado.map((element, index) => (<AnimeCard key={index} id={element.id} image={element.image} name={element.name}/>))}
            </ScrollView>
        </View>
    )
}

const PageStyle = StyleSheet.create({
    viewStyle: {
        flex: 1, 
        paddingTop: 30
    }, 
    barStyle: {
        backgroundColor: colorStyle.corBackground.color, 
        width: 500,
        paddingLeft: 30
    }, 
    iconStyle: { 
        color: 'white'
    }, 
    listStyle:{ 
        flexDirection: 'row'
    }
})