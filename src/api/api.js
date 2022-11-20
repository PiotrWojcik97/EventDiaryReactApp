import axios from "axios";
import globals from "../utils/globals";
import { localStorageGetJWT, localStorageWriteJWT } from "../utils/localStorage";
class Api {
    constructor() {
        this.IS_LOGGING_ACTIVE = false
        this.backend = axios.create({
            // baseURL: `http://localhost:3000`,
            baseURL: `https://eventdiarybackend.azurewebsites.net`,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*'
            }
        })
        let token = localStorageGetJWT()
        if(token) {
            this.backend.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }

    getUsers = async() => {
        globals.users = []
        try {
            let retVal
            await this.backend.get('/api/v1/user/read.php').then( res => {
                retVal = res.data.data
            })
            globals.users = retVal
            return retVal
        }
        catch(e) {
            if(this.IS_LOGGING_ACTIVE)
                console.log(e)
            return undefined
        }
    }

    getTypes = async() => {
        try {
            let retVal
            await this.backend.get('/api/v1/type/read.php').then( res => {
                retVal = res.data.data
            })
            globals.event_types = retVal
            if(globals.event_types == undefined)
                globals.event_types = []
            return retVal
        }
        catch(e) {
            if(this.IS_LOGGING_ACTIVE)
                console.log(e)
            return undefined
        }
    }

    createType = async(data) => {
        try {
            let response = await this.backend.post('/api/v1/type/create_single.php', data)
            if(this.IS_LOGGING_ACTIVE)
                console.log(response)
        }
        catch(e) {
            if(this.IS_LOGGING_ACTIVE)
                console.log(e)
            return undefined
        }
    }

    deleteType = async(id) => {
        try {
            let response = await this.backend.delete(`/api/v1/type/delete.php?id=${id}`)
            if(this.IS_LOGGING_ACTIVE)
                console.log(response)
        }
        catch(e) {
            if(this.IS_LOGGING_ACTIVE)
                console.log(e)
            return undefined
        }
    }

    updateType = async(data) => {
        try {
            let response = await this.backend.post(`/api/v1/type/update.php`, data)
            if(this.IS_LOGGING_ACTIVE)
                console.log(response)
        }
        catch(e) {
            if(this.IS_LOGGING_ACTIVE)
                console.log(e)
            return undefined
        }
    }

    getEvents = async(data) => {
        try {
            let retVal
            await this.backend.post('/api/v1/event/read_month.php', data).then( res => {
                retVal = res.data.data
            })
            globals.events = retVal
            if(globals.events == undefined)
                globals.events = []
            return retVal
        }
        catch(e) {
            if(this.IS_LOGGING_ACTIVE)
                console.log(e)
            return undefined
        }
    }

    createEvent = async(data) => {
        try {
            if(this.IS_LOGGING_ACTIVE)
                console.log(data)
            let response = await this.backend.post('/api/v1/event/create_single.php', data)
            if(this.IS_LOGGING_ACTIVE)
                console.log(response)
        }
        catch(e) {
            if(this.IS_LOGGING_ACTIVE)
                console.log(e)
            return undefined
        }
    }

    deleteEvent = async(id) => {
        try {
            let response = await this.backend.delete(`/api/v1/event/delete.php?id=${id}`)
            if(this.IS_LOGGING_ACTIVE)
                console.log(response)
        }
        catch(e) {
            if(this.IS_LOGGING_ACTIVE)
                console.log(e)
            return undefined
        }
    }

    deleteEventByTypeId = async(type_id) => {
        try {
            let response = await this.backend.delete(`/api/v1/event/delete_type_id.php?type_id=${type_id}`)
            if(this.IS_LOGGING_ACTIVE)
                console.log(response)
        }
        catch(e) {
            if(this.IS_LOGGING_ACTIVE)
                console.log(e)
            return undefined
        }
    }

    updateEvent = async(data) => {
        try {
            let response = await this.backend.post(`/api/v1/event/update.php`, data)
            if(this.IS_LOGGING_ACTIVE)
                console.log(response)
        }
        catch(e) {
            if(this.IS_LOGGING_ACTIVE)
                console.log(e)
            return undefined
        }
    }

    login = async(data) => {
        try {
            let response = await this.backend.post(`/api/v1/user/login.php`, data)
            if(this.IS_LOGGING_ACTIVE)
                console.log(response)
            if(response.data.res == "OK") {
                this.backend.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
                localStorageWriteJWT(response.data.token)
            }
            return response.data.res
        }
        catch(e) {
            if(this.IS_LOGGING_ACTIVE)
                console.log(e)
            return undefined
        }
    }

    changePassword = async(data) => {
        try {
            let response = await this.backend.post(`/api/v1/user/change_password.php`, data)
            if(this.IS_LOGGING_ACTIVE)
                console.log(response)
            return response.data.res
        }
        catch(e) {
            if(this.IS_LOGGING_ACTIVE)
                console.log(e)
            return undefined
        }
    }
}

const api = new Api()

export default api