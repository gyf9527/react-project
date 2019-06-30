

import "./index.scss";
import React, { Component } from "react";
import { Head } from "../../components/head"
import axios from "../../../utils/axios"
import { TabsGroup, Tabs, Tab } from "bee-mobile";

export class Video extends Component {
    state = {
        newTab: ["民谣", "电音", "流行", "古典", "跑步", "爵士", "幼儿", "Rap", "游戏"],
        songs: []
    }

    componentWillMount() {
        axios.get(`https://v1.itooi.cn/netease/search?keyword=民谣&type=song&pageSize=20&page=0`).then(res => {
            console.log(res.data.data.songs)
            this.setState({
                songs: res.data.data.songs
            })
        })
    }

    goLogin = () => {
        const { history } = this.props;
        history.push("/login");
    };
    search = (index) => {
        console.log(index);
        var text = this.state.newTab.filter((item, i) => {
            if (index == i) {
                return item
            }
        });
        console.log(text)
        axios.get(`https://v1.itooi.cn/netease/search?keyword=${text}&type=song&pageSize=20&page=0`).then(res => {
            console.log(res.data.data.songs)
            this.setState({
                songs: res.data.data.songs
            })
        })
    };
    goMusic=(id)=>{
        console.log(id);
        this.props.history.push(`/bofang/${id}`)
    }


    render() {
        const {
            newTab,
            songs
        } = this.state;
        return (
            <div>
                <Head title="音乐专区"></Head>
                <TabsGroup id="nav" scrollable={true} centerMode={true} onChange={this.search}>
                    <Tabs>
                        {
                            newTab.map((item, index) => {
                                return (
                                    <Tab key={index}>{item}</Tab>
                                )
                            })
                        }
                    </Tabs>
                </TabsGroup>
                <ul style={{overflow:"hidden",marginTop:93}}>
                    {
                        songs.map((item, index) => {
                            return (
                                <li onClick={()=>this.goMusic(item.id)} style={{width:"50%",height:220,float:"left",textAlign:"center"}} key={index}>
                                    <img style={{width:"90%",margin:"0 auto",height:150}} src={item.al.picUrl} alt="" />
                                    <p>歌曲:{item.al.name}</p>
                                    <p>专辑:{item.name}</p>
                                    <p>歌手:{item.ar[0]?item.ar[0].name:""}</p>
                                </li>
                            )
                        })
                    }
                </ul>

            </div>
        )
    }
}