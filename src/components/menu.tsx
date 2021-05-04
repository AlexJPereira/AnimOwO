import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { RootDrawerNavigator } from '../pages/rotas/rootNavigators/rootDrawerNavigator';
import { RootStackNavigator } from '../pages/rotas/rootNavigators/rootStackNavigator';

export default function Menu(){
    return (
        <TouchableOpacity style={{
            height: 50,
            backgroundColor: 'white',
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center'
        }} onPress={()=>{
                RootStackNavigator.navigate('perfil')
                RootDrawerNavigator.closeDrawer()
            }}>
            <Text>test</Text>
        </TouchableOpacity>
    )
}