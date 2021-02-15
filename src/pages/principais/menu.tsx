import * as React from 'react';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'; 
import { Text } from 'react-native';
import { 
    useWindowDimensions,
    TouchableOpacity,
    View, 
    StyleSheet,
    Dimensions
} from 'react-native';

import { RootStackNavigator } from '../rootStackNavigator';
import { Button } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';

import Configuracoes from '../mais/configuracoes';
import Downloads from '../mais/downloads';
import Perfil from '../principais/perfil'; 
import ListaCompleta from '../mais/lista-completa';
import Sobre from '../mais/sobre';

import NavBar from '../../components/navBar';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const iconSize = 30

export default function MyDrawer() {
    return (
        <View style={PageStyle.viewStyle}>
            <NavBar></NavBar>
            <TouchableOpacity 
                onPress={()=>RootStackNavigator.navigate('lista-completa')}
                style={PageStyle.buttonStyle}>
                <FontAwesome5 name="th-list" size={iconSize} color="white" style={PageStyle.iconStyle}/>
                <Text style={PageStyle.textStyle}>
                    Lista Completa
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={()=>RootStackNavigator.navigate('downloads')}
                style={PageStyle.buttonStyle}>
                <FontAwesome5 name="download" size={iconSize} color="white" style={PageStyle.iconStyle}/>
                <Text style={PageStyle.textStyle}>
                    Downloads
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={()=>RootStackNavigator.navigate('sobre')}
                style={PageStyle.buttonStyle}>
                <FontAwesome5 name="info-circle" size={iconSize} color="white" style={PageStyle.iconStyle}/>
                <Text style={PageStyle.textStyle}>
                    Sobre
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={()=>RootStackNavigator.navigate('configuracoes')}
                style={PageStyle.buttonStyle}> 
                <Ionicons name="ios-settings-sharp" size={iconSize} color="white" style={PageStyle.iconStyle}/>
                <Text style={PageStyle.textStyle}>
                    Configurações
                </Text>
            </TouchableOpacity>

            <Text style={PageStyle.textStyle}> Versão 0.0.0 </Text>
        </View>
        
    );
}

const PageStyle = StyleSheet.create({
    viewStyle: {
        justifyContent: 'space-around', 
        flex: 1
    }, 
    textStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        lineHeight: 40,
        letterSpacing: 1,
        color: '#FFFFFF'
    }, 
    buttonStyle:{
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#FFFFFF',
        width: windowWidth,
    }, 
    iconStyle: {
        marginLeft:50,
        marginRight: 30
    }
})