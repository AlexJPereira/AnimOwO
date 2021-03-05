import React from 'react';
import { 
    View, 
    StyleSheet } from 'react-native'; 

import { RouteProp } from '@react-navigation/native';
import { RootStackPagesProps } from '../rootStackNavigator';

export type AnimePageProps = {
    route: RouteProp<RootStackPagesProps, 'link-page'>
}

export default function AnimePage(props: AnimePageProps){
    return (
        <View />
    )
}

const PageStyle = StyleSheet.create({
    
})