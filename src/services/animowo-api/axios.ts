import Axios from 'axios'

export const baseUrl = "http://ec2-18-191-15-76.us-east-2.compute.amazonaws.com:8080/api/v1/link"

const api = Axios.create({
    baseURL: baseUrl
})

export default api
