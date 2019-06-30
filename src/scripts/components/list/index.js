

import "./index.scss"
import  Item  from "../item";
import React,{Component}  from "react";
import {PullToRefresh} from "antd-mobile";
export class List extends Component{
    state = {
        refreshing:false,
        down:true,  // 下拉 
        data:[],
        count:1901
    };

    componentDidMount(){
        const {type,allSongs} =this.props;
        if(allSongs){
            var data =  allSongs.filter(g=>g.type.value==type.value);//eslint-disable-line
            console.log(data);
            this.setState({
                data
            })
        }
        
    };

    // listen=(url)=>{
    //     var urlid=url.split("=");
    //     var id=urlid[1];
    //     console.log(id);
    //     axios.get(`/cloudmusic/?type=song&id=${id}`).then(res=>{
    //         console.log((res.data.data[0]).url);

    //     })
    // };

    render(){
        const {
            songs,
            changeAllSongs
        } = this.props;
        return (
            <div>
                <ul>
                    <PullToRefresh
                        damping={50}
                        ref={() =>"loadmore"}
                        indicator={  { deactivate: '下拉刷新' }}
                        direction={  'down' }
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true }); // 正在刷新
                            setTimeout(() => {
                                changeAllSongs()

                            this.setState({ refreshing: false });  // 刷新结束 
                            }, 1000);
                          }}
                    >
                        {
                            songs.map((song,i)=>{
                                return (
                                    <li key={i}>
                                        <Item song={song}/>
                                        {/* <h2 onClick={()=>this.listen(song.urlid)}>{song.name}</h2> */}
                                    </li>
                                )
                            })
                        }
                    </PullToRefresh>
                </ul>
            </div>
        )
    }
}