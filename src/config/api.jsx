import axios from "axios"

export const instance = axios.create({
    baseURL: `https://postit-west-api.onrender.com/api`,
})
