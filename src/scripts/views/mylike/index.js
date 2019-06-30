import "./index.scss";
// import ReactDOM from "react-dom";
import React, { Component } from "react";
import {Toast} from "antd-mobile"
import { Head } from "../../components/head";
import axios from "../../../utils/axios";
import {Link} from "react-router-dom";

export class Mylike extends Component {
    state = {
        mySongs: []
    }

    componentWillMount() {
        if(localStorage.mobile){
            axios.get("/react/getlkSongs", {
                params: {
                    mobile: localStorage.mobile
                }
            }).then(res => {
                console.log(res.data.result)
                this.setState({
                    mySongs: res.data.result
                })
            })
        }else{
            Toast.offline('您还没有登录哦', 1);
        }
        
    }
    render() {
        const {
            mySongs
        } = this.state;
        return (
            <div className="mylike" style={{backgroundColor: "#6b6666"}}>
                <Head title="我喜欢的音乐" show={true}></Head>
                <ul style={{marginTop:45}}>
                    {
                        mySongs.map((mysong, index) => {
                            return (
                                <Link key={index} to={"/good/detail/" + mysong.sid + "?uid=" + mysong.urlid} >
                                    <li>
                                        <h2 style={{ paddingLeft: 20, backgroundColor: "rgb(68, 67, 67)", color: "white", fontSize: ".4rem", lineHeight: ".8rem" }}>
                                            {mysong.name}--{mysong.singer}
                                        </h2>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}