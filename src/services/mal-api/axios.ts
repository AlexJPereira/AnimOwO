import Axios from 'axios'

export const baseUrlOAuth = "https://api.myanimelist.net/v2"

const api = Axios.create({
    baseURL: baseUrlOAuth
})

export default api
