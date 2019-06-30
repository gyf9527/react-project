import {observable,action,computed,autorn} from "mobx";
import axios from "../../utils/axios";

class Tuijian{
    @observable tuiJian=[];
    @observable geDan=[];
    @observable gedans=[];
    @observable singerName="";
    @observable zhuanjiName="";
    @observable picUrl="";
    @observable songName=""

    @action getXq=(id)=>{
        axios.get(`https://v1.itooi.cn/netease/song?id=${id}`,{

        }).then(res => {
            console.log(res.data.data.songs[0].ar[0].name)
               this.songName= res.data.data.songs[0].al.name;
               this.zhuanjiName=res.data.data.songs[0].name;
               this.picUrl=res.data.data.songs[0].al.picUrl;
               this.singerName=res.data.data.songs[0].ar[0].name
        });
    }
    

    @action getTuijian(){
        var id=Math.round(Math.random()*30)
        axios.get(`https://v1.itooi.cn/netease/songList/hot?cat=%E5%85%A8%E9%83%A8&pageSize=6&page=${id}`,{

        }).then(res=>{
            console.log(res.data.data);
            this.tuiJian=res.data.data
            // console.log(this.tuiJian)
        })
    };

    @action getGeDan=(uid)=>{
        axios.get(`https://v1.itooi.cn/netease/songList/user?uid=${uid}`,{

        }).then(res=>{
            console.log(res.data);
            this.geDan=res.data.data;
        })
    }

    @action getShouCang=(mobile)=>{
        axios.get("/react/getShouCang",{
            params:{
                mobile
            }
        }).then(res=>{
            console.log(res.data.result)
                this.gedans=res.data.result
        })
    }



    
}

export default new Tuijian();