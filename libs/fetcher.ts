import axios from 'axios'

export const fecther = (url:string)=>axios.get(url).then((res)=>res.data)