import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import * as React from 'react';
import { 
    View, 
    StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';


export default function SearchBar() {
    var state = {
        firstQuery: '',
    };

    function setState( value:any ){
        state = value
    }

    const { firstQuery } = state;

    return (
        <View style={ComponentStyle.viewStyle}>
            <Searchbar
                placeholder="Naruto"
                onChangeText={query => { setState({ firstQuery: query }); }}
                value={firstQuery}
                style={ComponentStyle.barStyle}
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
        backgroundColor: 'white'
    }
})