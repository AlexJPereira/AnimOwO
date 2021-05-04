import Axios from 'axios'

export const baseUrl = "http://animowo.ddns.net:8080/api/v1/"

const api = Axios.create({
    baseURL: baseUrl
})

export default api
