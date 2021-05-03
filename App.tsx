import React, { useEffect, useState } from 'react';
import { StackNavigator, DrawerNavigator } from './src/pages/rotas'
import { View } from 'react-native'

import MalApi from './src/services/mal-api'
import { setMalApi, malApi } from './src/services/global'

export default function App() {
    setMalApi(new MalApi())
    
    const [state, setState] = useState({
        logando: true,
        logado: false
    })

    async function checkLogin() {
        if(await malApi.isLoggedIn()){
            setState({ logando: false, logado: true })
        }else{
            setState({ logando: false, logado: false })
        }
    }

    useEffect(()=>{
        checkLogin()
    }, [])

    return (
        state.logando ? null : <DrawerNavigator initialRouteName={state.logado ? "home" : "login"}/>
    )
}