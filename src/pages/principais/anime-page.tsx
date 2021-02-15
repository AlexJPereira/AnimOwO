import React from 'react'
import { 
    View, 
    ScrollView,
    Image,
    Text,
    StyleSheet,
    Dimensions, 
    FlatList,
    StatusBar } from 'react-native'

import { RouteProp } from '@react-navigation/native'
import { RootStackPagesProps } from '../rootStackNavigator'

import Button from '../../components/button'
import NavBar from '../../components/navBar'

const animeImage = require('../../app-assets/animes-tests/fma.jpg'); 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height

export type AnimePageProps = {
    route: RouteProp<RootStackPagesProps, 'anime-page'>
}

export default function AnimePage(props: AnimePageProps){
    return (
        <View style={PageStyle.test}>
            <NavBar></NavBar>
            <View style={PageStyle.cardStyle}>
                <Image source={animeImage} style={PageStyle.imageStyle}></Image>
                <View style={PageStyle.viewStyle}>
                    <View style={PageStyle.nameField}>
                        <Text style={PageStyle.titleStyle} ellipsizeMode='tail' numberOfLines={2}>{props.route.params.animeName}</Text>
                    </View>
                    <Text style={PageStyle.episodesStyle}>{screenHeight-windowHeight} Episódios</Text>
                    <View style={PageStyle.buttonField}>
                        <Button title={"ASSISTIR"} onPress={()=>{}}/>
                        <Button title={"DOWNLOAD"} onPress={()=>{}}/>
                    </View>
                </View>
                <Text style={PageStyle.noteStyle}>9.12</Text>
            </View>
            <View>
                <Text style={PageStyle.sinopsysTitle}>Sinópse:</Text>
            </View>
            <ScrollView contentContainerStyle={PageStyle.sinopsysView}>
                <View style={PageStyle.sinopsysCard}>
                    <Text> 
                        Alchemy is bound by this Law of Equivalent Exchange—something the young brothers Edward and Alphonse Elric only realize after attempting human transmutation: the one forbidden act of alchemy. They pay a terrible price for their transgression—Edward loses his left leg, Alphonse his physical body. It is only by the desperate sacrifice of Edward's right arm that he is able to affix Alphonse's soul to a suit of armor. Devastated and alone, it is the hope that they would both eventually return to their original bodies that gives Edward the inspiration to obtain metal limbs called "automail" and become a state alchemist, the Fullmetal Alchemist.
                        Three years of searching later, the brothers seek the Philosopher's Stone, a mythical relic that allows an alchemist to overcome the Law of Equivalent Exchange. Even with military allies Colonel Roy Mustang, Lieutenant Riza Hawkeye, and Lieutenant Colonel Maes Hughes on their side, the brothers find themselves caught up in a nationwide conspiracy that leads them not only to the true nature of the elusive Philosopher's Stone, but their country's murky history as well. In between finding a serial killer and racing against time, Edward and Alphonse must ask themselves if what they are doing will make them human again... or take away their humanity.
                        Alchemy is bound by this Law of Equivalent Exchange—something the young brothers Edward and Alphonse Elric only realize after attempting human transmutation: the one forbidden act of alchemy. They pay a terrible price for their transgression—Edward loses his left leg, Alphonse his physical body. It is only by the desperate sacrifice of Edward's right arm that he is able to affix Alphonse's soul to a suit of armor. Devastated and alone, it is the hope that they would both eventually return to their original bodies that gives Edward the inspiration to obtain metal limbs called "automail" and become a state alchemist, the Fullmetal Alchemist.
                        Three years of searching later, the brothers seek the Philosopher's Stone, a mythical relic that allows an alchemist to overcome the Law of Equivalent Exchange. Even with military allies Colonel Roy Mustang, Lieutenant Riza Hawkeye, and Lieutenant Colonel Maes Hughes on their side, the brothers find themselves caught up in a nationwide conspiracy that leads them not only to the true nature of the elusive Philosopher's Stone, but their country's murky history as well. In between finding a serial killer and racing against time, Edward and Alphonse must ask themselves if what they are doing will make them human again... or take away their humanity.
                        Alchemy is bound by this Law of Equivalent Exchange—something the young brothers Edward and Alphonse Elric only realize after attempting human transmutation: the one forbidden act of alchemy. They pay a terrible price for their transgression—Edward loses his left leg, Alphonse his physical body. It is only by the desperate sacrifice of Edward's right arm that he is able to affix Alphonse's soul to a suit of armor. Devastated and alone, it is the hope that they would both eventually return to their original bodies that gives Edward the inspiration to obtain metal limbs called "automail" and become a state alchemist, the Fullmetal Alchemist.
                        Three years of searching later, the brothers seek the Philosopher's Stone, a mythical relic that allows an alchemist to overcome the Law of Equivalent Exchange. Even with military allies Colonel Roy Mustang, Lieutenant Riza Hawkeye, and Lieutenant Colonel Maes Hughes on their side, the brothers find themselves caught up in a nationwide conspiracy that leads them not only to the true nature of the elusive Philosopher's Stone, but their country's murky history as well. In between finding a serial killer and racing against time, Edward and Alphonse must ask themselves if what they are doing will make them human again... or take away their humanity.
                        Alchemy is bound by this Law of Equivalent Exchange—something the young brothers Edward and Alphonse Elric only realize after attempting human transmutation: the one forbidden act of alchemy. They pay a terrible price for their transgression—Edward loses his left leg, Alphonse his physical body. It is only by the desperate sacrifice of Edward's right arm that he is able to affix Alphonse's soul to a suit of armor. Devastated and alone, it is the hope that they would both eventually return to their original bodies that gives Edward the inspiration to obtain metal limbs called "automail" and become a state alchemist, the Fullmetal Alchemist.
                        Three years of searching later, the brothers seek the Philosopher's Stone, a mythical relic that allows an alchemist to overcome the Law of Equivalent Exchange. Even with military allies Colonel Roy Mustang, Lieutenant Riza Hawkeye, and Lieutenant Colonel Maes Hughes on their side, the brothers find themselves caught up in a nationwide conspiracy that leads them not only to the true nature of the elusive Philosopher's Stone, but their country's murky history as well. In between finding a serial killer and racing against time, Edward and Alphonse must ask themselves if what they are doing will make them human again... or take away their humanity.
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

const PageStyle = StyleSheet.create({
    test: {
        paddingBottom: screenHeight-windowHeight+30,
        maxHeight: screenHeight
    },
    viewStyle:{
        maxWidth: windowWidth/2
    },
    cardStyle:{
        justifyContent: 'space-around',
        flexDirection: 'row'
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
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 1,
        color: '#FFFFFF'
    },
    noteStyle:{
        textAlign: 'right',
        textAlignVertical: 'top',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        lineHeight: 23,
        letterSpacing: 1,
        color: '#FFFFFF'
    },
    episodesStyle:{
        textAlign: 'left',
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 1,
        color: '#AB3962'
    },
    sinopsysTitle:{
        textAlign: 'left',
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 1,
        color: '#FFFFFF'
    }, 
    sinopsysView:{
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    sinopsysCard:{
        backgroundColor: '#C4C4C4',
        paddingBottom: 30
    }
})