import * as React from 'react';
import { 
    View, 
    StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import defaultColors from '../styles/color';


export default function SearchBar() {
    var state = {
        firstQuery: '',
    };

    function setState( value:any ){
        state = value
    }

    const { firstQuery } = state;

    return (
        <View>
            <Searchbar
                icon={() => <Ionicons name="search" size={24} style={ComponentStyle.iconStyle}/>}
                placeholder="Pesquisar"
                placeholderTextColor='#C4C4C4'
                selectionColor='#fff'
                onChangeText={ ()=> {}}
                value={firstQuery}
                style={ComponentStyle.barStyle}
                inputStyle={{color:'#fff'}}
            />
        </View>
    );
}

const ComponentStyle = StyleSheet.create({
    viewStyle: {
        flex: 1, 
        paddingTop: 30
    }, 
    barStyle: {
        backgroundColor: defaultColors.corBackground.color, 
        width: 500,
        paddingLeft: 30
    }, 
    iconStyle: { 
        color: 'white'
    }
})