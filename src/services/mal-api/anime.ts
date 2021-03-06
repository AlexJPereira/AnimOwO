import { printError } from '../error'
import api from './axios'
import MalApi from './'
import { 
    genericListResponse, animeDetailsResponse, rankingListResponse, seasonalListResponse,
    animeSeason, seasonalSort, rankingType, animeFields 
} from './interfaces'

/** 
 * Procura por um anime na lista de animes 
 * @param limit Valor padrão e máximo é 100
*/
export async function searchAnime(this: MalApi, searchText: string, limit?: number, offset?: number){
    try{
        const response = await api.get(`/anime`,{
            params: {
                q: searchText,
                limit,
                offset
            }
        })
        const list = response.data as genericListResponse
        return list
    }catch(error){
        printError("searchAnime()", error)
        return undefined
    }
}

/** Retorna varios detalhes de um anime ja possuindo seu ID */
export async function getAnimeDetails(this: MalApi, animeId: number){
    try{
        const response = await api.get(`/anime/${animeId}`,{
            params: {
                fields: animeFields.toString()
            }
        })
        const details = response.data as animeDetailsResponse
        return details
    }catch(error){
        printError("getAnimeDetails()", error)
        return undefined
    }
}

/** 
 * Retorna uma lista de animes representando o ranking da comunidade 
 * @param limit Valor padrão é 100 e valor máximo é 500
*/
export async function getAnimeRankingList(this: MalApi, rankingType: rankingType, limit?:number, offset?: number){
    try{
        const response = await api.get(`/anime/ranking`,{
            params: {
                "ranking_type": rankingType,
                limit,
                offset
            }
        })
        const list = response.data as rankingListResponse
        return list
    }catch(error){
        printError("getAnimeRankingList()", error)
        return undefined
    }
}

/** 
 * Retorna a lista de animes de uma temporada 
 * @param limit Valor padrão é 100 e valor máximo é 500
*/
export async function getSeasonalAnime(this: MalApi, year: number, season: animeSeason, sort?: seasonalSort, limit?: number, offset?: number){
    try{
        const response = await api.get(`/anime/season/${year}/${season}`,{
            params: {
                sort,
                limit,
                offset
            }
        })
        const list = response.data as seasonalListResponse
        return list
    }catch(error){
        printError("getSeasonalAnime()", error)
        return undefined
    }
}

/** 
 * Retorna a lista de sugestoes de animes para o usuario logado 
 * @param limit Valor padrão e máximo é 100
*/
export async function getSuggestedAnime(this: MalApi, limit?: number, offset?: number){
    try{
        const response = await api.get(`/anime/suggestions`,{
            params: {
                limit,
                offset
            }
        })
        const list = response.data as genericListResponse
        return list
    }catch(error){
        printError("getSuggestedAnime()", error)
        return undefined
    }
}

