import axios from 'axios'

export const API=axios.create({
    // baseURL:"http://192.168.29.35:9191/",
    baseURL:"http://localhost:9191/"
});

export const API_SERVICE=axios.create({
    // baseURL:"http://192.168.29.35:9191/",
    baseURL:"http://localhost:9191/api/shoppingservice"
})