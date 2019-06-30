import "./index.scss"
import React, { Component } from "react";
import { Head } from "../../components/head"
// import {WingBlank,WhiteSpace } from "antd-mobile";
// import axios from "../../../utils/axios";
// import { connect } from "react-redux";
import axios from "../../../utils/axios";
import { MyComment } from "../mycomment";
// @connect(
//     state => {
//         return {
//             ...state.data
//         }
//     }
// )
class PingLun extends Component {

    state = {
        comments: [],
        hotComments: [],
        data: ""
    }

    componentWillMount() {
        console.log(this.props)
        var sid = this.props.match.params.sid
        axios.get("/react/getSong", {
            params: {
                sid
            }
        }).then(res => {
            console.log(res.data.result)
            this.setState({
                data: res.data.result
            });
            var id = this.state.data.urlid;
            axios.get(`https://v1.itooi.cn/netease/comment/song?id=${id}&page=0&pageSize=30`).then(res => {
                console.log(res)
                this.setState({
                    comments: res.data.data.comments,
                    hotComments: res.data.data.hotComments
                })
            })
        })
    }
    render() {
        const {
            comments,
            hotComments,
            data
        } = this.state
        return (
            <div>
                <Head title={data?data.name:""} show="true"></Head>
                <div style={{ marginTop: 45, marginBottom: 20, padding: "0 10px", backgroundColor: "black", color: "white" }}>
                    <MyComment data={this.props.match.params.sid}></MyComment>
                    <ul style={{ paddingBottom: 20, marginBottom: 20, borderBottom: "3px solid red" }}>
                        <h2 style={{ fontSize: "30px", padding: "20px 0" }}>热评:</h2>
                        {
                            hotComments.map((comment, index) => {
                                return (
                                    <li key={index} style={{ overflow: "hidden", paddingBottom: 30 }}>
                                        <h2 style={{ lineHeight: "24px", fontSize: 20, color: "red", float: "left" }}>{comment.user.nickname}:</h2>
                                        <h2 style={{ fontSize: 18, paddingLeft: 10, lineHeight: "20px", float: "left" }}>{comment.content}</h2>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul>
                        {
                            comments.map((comment, index) => {
                                return (
                                    <li key={index} style={{ overflow: "hidden", paddingBottom: 30 }}>
                                        <h2 style={{ lineHeight: "22px", fontSize: 18, float: "left", color: "rgb(241, 79, 79)" }}>{comment.user.nickname}:</h2>
                                        <h2 style={{ fontSize: 16, paddingLeft: 10, lineHeight: "18px", float: "left" }}>{comment.content}</h2>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
export default PingLun