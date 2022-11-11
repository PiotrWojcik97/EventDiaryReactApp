import axios from "axios";
import globals from "../utils/globals";

class Api {
    constructor() {
        this.backend = axios.create({
            baseURL: `http://localhost:3000`,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*'
            }
        })
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
            return retVal
        }
        catch(e) {
            console.log(e)
            return undefined
        }
    }

    getEvents = async() => {
        try {
            let retVal
            await this.backend.get('/api/v1/event/read.php').then( res => {
                retVal = res.data.data
            })
            globals.events = retVal
            return retVal
        }
        catch(e) {
            console.log(e)
            return undefined
        }
    }


    
}

const api = new Api()

export default api