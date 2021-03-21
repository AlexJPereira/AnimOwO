export interface getAnimeResponse{
    _id: number,
    animeId: number,
    userId: number,
    userName: string,
    date: string,
    upVote: number,
    downVote: number,
    numEpisode: number,
    link: string
}
export interface postAnimeResponse{
    _id: number,
    code: 0 | 1,
    message: string
}
export interface editAnimeResponse{
    code: 0 | 1,
    message: string
}
export interface deleteAnimeResponse{
    code: 0 | 1,
    message: string
}

// mandaremos como parametro query o id e numero de episodio "url/?id=x&episode=y"
export interface getAnimeParams{}
// na hora que o servidor for checar o token, pegar o nome do usuario para guardar no banco
export interface postAnimeParams{
    animeId: number,
    userId: number,
    numEpisode: number,
    link: string
}
// o servidor só editarar o link, o resto é para controle, mandaremos como parametro o id "url/id-banco"
export interface editAnimeParams{
    userId: number,
    link: string
}
// mandaremos como parametro o id "url/id-banco"
export interface deleteAnimeParams{}

