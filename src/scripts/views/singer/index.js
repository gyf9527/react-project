

import "./index.scss";
// import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Head } from "../../components/head";
// import { Link } from "react-router-dom";

export class Singer extends Component {
    state = {
        singer: [
            {
                img: require("../../../assets/images/xusong.jpeg"),
                name: "许嵩"
            },
            {
                img: require("../../../assets/images/linyoujia.jpg"),
                name: "林宥嘉"
            },
            {
                img: require("../../../assets/images/zhangguorong.jpg"),
                name: "张国荣"
            },
            {
                img: require("../../../assets/images/lizongsheng.jpg"),
                name: "李宗盛"
            },
            {
                img: require("../../../assets/images/huazhou.png"),
                name: "花粥"
            },
            {
                img: require("../../../assets/images/liushuang.jpeg"),
                name: "柳爽"
            },
            {
                img: require("../../../assets/images/xiechunhua.jpg"),
                name: "谢春花"
            },
            {
                img: require("../../../assets/images/tanyonglin.jpg"),
                name: "谭咏麟"
            },
        ]
    };
    getSinger = (name) => {
        console.log(name);
        const { history } = this.props
        history.push({ pathname: `/slist/${name}` })
    }
    render() {
        return (
            <div>
                <Head title="歌手"></Head>
                <div style={{ marginTop: 45 ,marginBottom:31,overflow:"hidden"}}>
                    <ul>
                        {
                            this.state.singer.map((sing, index) => {
                                return (
                                    <li onClick={() => this.getSinger(sing.name)} key={index} style={{ width: "49%", float: "left",border:"1px solid #666", textAlign: "center" ,backgroundColor:"skyblue"}}>
                                        <img style={{ width: "70%", margin: "5px auto", height: "2.6rem", borderRadius: "50%" }} src={sing.img} alt="" />
                                        <p style={{ color: "black",lineHeight:"20px",fontWeight:900 }}>{sing.name}</p>
                                    </li>
                                )
                            })

                        }

                    </ul>
                </div>
            </div >
        )
    }
}
