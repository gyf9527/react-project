import axios from "../../utils/axios";


export const getSong=({url,params,cb})=>{
    return axios.get(url,{
        params
    }).then(res=>{
        console.log(res)
        cb();
        return{
            type:"getSong",
            data:res.data.result
        }
    })
}

export const getMusic=({url,params,cb})=>{
    return axios.get(url,{
        params
    }).then(res=>{
        console.log(res.data.data.songs[0])
        cb();
        return{
            type:"getMusic",
            xiangqing:res.data.data.songs[0]
        }
    })
}