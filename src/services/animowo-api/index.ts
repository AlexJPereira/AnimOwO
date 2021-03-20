import api from './axios'
import {
    anime, 
    animeLinksResponse, postAnimeResponse, animeResponse
} from './interfaces'
import * as Store from '../store'

async function getHeaderToken(){
    const token = await Store.getValue('acessToken')
    if(!token)
        return undefined

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export async function getAnimeLinks(id: number){
    const response = await api.get(`/${id}`)
    const links = response.data as animeLinksResponse[]
    return links
}

export async function postAnimeLink(anime: anime){
    const header = await getHeaderToken()
    if(!header)
        return
    
    const response = await api.post(`/`, anime, header)
    return response.data as postAnimeResponse
}

export async function editAnimeLink(anime: animeLinksResponse){
    const header = await getHeaderToken()
    if(!header)
        return

    const response = await api.put(`/`, anime, header)
    return response.data as animeResponse
}

export async function deleteAnimeLink(id: string){
    const header = await getHeaderToken()
    if(!header)
        return

    const response = await api.delete(`/${id}`, header)
    return response.data as animeResponse
}


