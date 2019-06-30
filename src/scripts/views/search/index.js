

import "./index.scss";
import React,{Component}  from "react";
import  {Head} from "../../components/head";
import {List} from "../../components/list";
import axios from "../../../utils/axios";
import {WingBlank,WhiteSpace,SearchBar} from  "antd-mobile";
export class Search extends Component{
    state = {
        songs:[]
    };

    getSearch=(val)=>{
        console.log(this.refs.one.state.value);
        axios.get("/react/searchSongs",{
            params:{
                keyword:this.refs.one.state.value
            }
        }).then(res=>{
            this.setState({
                songs:res.data.result
            })
        })
    };

    changeSongs=()=>{
        this.state.songs.reverse();
        this.setState({
            songs:this.state.songs
        })
    }

    render(){
        const {songs} = this.state;
        return (
            <div>
                <Head title="搜索" show={true} ></Head>
                <WingBlank>
                    <WhiteSpace />
                    <SearchBar ref="one" placeholder="Search" maxLength={8} onBlur={this.getSearch} />
                    <List
                    songs={songs}  
                    changeAllSongs={this.changeSongs}
                    ></List>
                </WingBlank>
                
            </div>
        )
    }
}