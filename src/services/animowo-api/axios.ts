import Axios from 'axios'

export const baseUrl = "http://ec2-18-190-25-205.us-east-2.compute.amazonaws.com:8080/api/v1/"

const api = Axios.create({
    baseURL: baseUrl
})

export default api
