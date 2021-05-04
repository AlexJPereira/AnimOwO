import React, { useState } from 'react'
import { 
    View,
    StyleSheet, 
    FlatList} from 'react-native';

import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { malApi } from '../../services/global';
import AnimeCard, { AnimeCardProps } from '../../components/anime-card'

import colorStyle from '../../styles/color'; 
const defaultImage = 'https://idealservis.com.br/portal/wp-content/uploads/2014/07/default-placeholder.png'; 

export default function Search(){

    const [state, setState] = useState('');

    const [response, setResponse] = useState({
        resultado: [] as AnimeCardProps[]
    });

    async function getSearch(term:string){
        setState(term);
        if(term && term.length > 2){
            const searchResponse = await malApi.searchAnime(term, 100);
            setResponse({
                resultado: searchResponse ? searchResponse.data.map((element) => ({
                    id: element.node.id,
                    image: { uri: element.node.main_picture != undefined ? element.node.main_picture.medium : defaultImage},
                    name: element.node.title
                })) : [] as AnimeCardProps[]
            })
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

            <FlatList
                contentContainerStyle={PageStyle.listStyle}
                numColumns={3}
                data={response.resultado}
                renderItem={
                    (obj) => {
                        return(
                            <View style={{width:'33%', alignItems: 'center', paddingVertical: 20}}> 
                                <AnimeCard key={obj.item.id} id={obj.item.id} image={obj.item.image} name={obj.item.name}/>
                            </View>
                        )
                    }
                }
            >

            </FlatList>
            
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
        justifyContent: 'space-around',
        paddingBottom: 100
    }

})