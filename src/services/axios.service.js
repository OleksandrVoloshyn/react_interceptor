import axios from "axios";

import {baseURL} from "../constants";
import {authService} from "./auth.service";
import {createBrowserHistory} from 'history'

const history = createBrowserHistory();
const axiosService = axios.create({baseURL});
let isRefreshing = false

axiosService.interceptors.request.use((config) => {
    const access = localStorage.getItem('access');
    if(access){
        config.headers.Authorization = `Bearer ${access}`
    }
    return config
})

axiosService.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        if (error.response?.status === 401 && error.config && !isRefreshing) {
            isRefreshing = true
            const refreshToken = localStorage.getItem('refresh');
            try {
                const {data} = await authService.refresh(refreshToken);
                const {access,refresh} = data;
                localStorage.setItem('access', access)
                localStorage.setItem('refresh', refresh)
            } catch (e) {
                localStorage.clear()
                history.replace('/login?expSession=true')
            }
            return axiosService.request(error.config)
        }
    })

export {axiosService}