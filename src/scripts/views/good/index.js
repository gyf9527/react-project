



import "./index.scss";
import { Head } from "../../components/head";
import axios from "../../../utils/axios";
import React, { Component } from "react";
// import { getSong } from "../../actions";
// import { connect } from "react-redux";
import { Button } from "bee-mobile";
import { Toast } from "antd-mobile"
// @connect(
//     state => {
//         return {
//             ...state.data
//         }
//     }
// )
class Good extends Component {
    state = {
        gequ: "",
        xiangqing: "",
        lyric: [],
        data: ""
    }
    //从上个页面带过来的歌曲id进行搜索
    componentWillMount() {
        console.log(this.props.match.params.sid)
        var sid = this.props.match.params.sid;
        axios.get("/react/getSong", {
            params: {
                sid
            }
        }).then(res => {
            this.setState({
                data: res.data.result
            })
        })
        var id = this.props.location.search.split("=")[1];
        this.setState({
            gequ:`https://music.163.com/song/media/outer/url?id=${id}`
        })
        // axios.get(`/cloudmusic/?type=song&id=${id}`).then(res => {
        //     console.log(res)
        //     this.setState({
        //         gequ: (res.data.data[0]).url
        //     })
        // });
        axios.get(`https://v1.itooi.cn/netease/song?id=${id}`).then(res => {
            console.log(res.data.data);
            this.setState({
                xiangqing: res.data.data.songs[0].al,
            })
        });
        axios.get(`/cloudmusic/?type=lyric&id=${id}`).then(res => {
            // console.log(res.data.lrc.lyric)
            if (res.data.lrc) {
                var lyric = res.data.lrc.lyric.split("]").map(item => {
                    item = item.split("[")[0];
                    // console.log(item);
                    return item;
                })
                // console.log(lyric);
                this.setState({
                    lyric: lyric
                })
            } else {
                this.setState({
                    lyric: ["歌曲暂无歌词"]
                })
            }

        })
    };

    //上一首
    prevSong = (sid) => {
        console.log(sid)
        axios.get("/react/getSong", {
            params: {
                sid
            }
        }).then(res => {
            this.setState({
                data: res.data.result
            })
            var id = res.data.result.urlid;
            console.log(id)
            this.setState({
                gequ:`https://music.163.com/song/media/outer/url?id=${id}`
            })
            // axios.get(`/cloudmusic/?type=song&id=${id}`).then(res => {
            //     this.setState({
            //         gequ: (res.data.data[0]).url
            //     })
            // });
            axios.get(`https://v1.itooi.cn/netease/song?id=${id}`).then(res => {
                console.log(res.data.data);
                this.setState({
                    xiangqing: res.data.data.songs[0].al,
                })
            });
            axios.get(`/cloudmusic/?type=lyric&id=${id}`).then(res => {
                console.log(res.data.lrc)
                if (res.data.lrc) {
                    var lyric = res.data.lrc.lyric.split("]").map(item => {
                        item = item.split("[")[0];
                        return item;
                    })
                    this.setState({
                        lyric: lyric
                    })
                } else {
                    this.setState({
                        lyric: ["歌曲暂无歌词"]
                    })
                }

            })
        })
    };

    //下一首
    nextSong = (sid) => {
        console.log(sid)
        axios.get("/react/getSong", {
            params: {
                sid
            }
        }).then(res => {
            this.setState({
                data: res.data.result
            })
            var id = res.data.result.urlid;
            console.log(id)
            this.setState({
                gequ:`https://music.163.com/song/media/outer/url?id=${id}`
            })
            // axios.get(`/cloudmusic/?type=song&id=${id}`).then(res => {
            //     this.setState({
            //         gequ: (res.data.data[0]).url
            //     })
            // });
            axios.get(`https://v1.itooi.cn/netease/song?id=${id}`).then(res => {
                console.log(res.data.data);
                this.setState({
                    xiangqing: res.data.data.songs[0].al,
                })
            });
            axios.get(`/cloudmusic/?type=lyric&id=${id}`).then(res => {
                // console.log(res.data.lrc)
                if (res.data.lrc) {
                    var lyric = res.data.lrc.lyric.split("]").map(item => {
                        item = item.split("[")[0];
                        // console.log(item);
                        return item;
                    })
                    this.setState({
                        lyric: lyric
                    })
                } else {
                    this.setState({
                        lyric: ["歌曲暂无歌词"]
                    })
                }

            })
        })
    }

    //添加收藏
    shouCang = (sid, name, urlid, singer, zhuanji) => {
        if (localStorage.mobile) {
            console.log(localStorage.mobile)
            axios.get("/react/getMy", {
                params: {
                    sid,
                    name,
                    urlid,
                    singer,
                    zhuanji,
                    mobile: localStorage.mobile
                }
            }).then(res => {
                console.log(res)
            })
        } else {
            Toast.offline('您还没有登录哦', 1);
        }

    };

    //添加喜欢
    xiHuan = (sid, name, urlid, singer, zhuanji) => {
        if (localStorage.mobile) {
            console.log(localStorage.mobile)
            axios.get("/react/getLike", {
                params: {
                    sid,
                    name,
                    urlid,
                    singer,
                    zhuanji,
                    mobile: localStorage.mobile
                }
            }).then(res => {
                console.log(res)
            })
        }else{
            Toast.offline('您还没有登录哦', 1);
        }

    };

    //进入歌曲评论页面
    pingLun = (sid) => {
        const { history } = this.props
        history.push(`/pinglun/${sid}`)
    }

    render() {
        const {
            gequ, xiangqing, lyric, data
        } = this.state
        return (
            <div className="">
                <Head title={data.name} show={true}> </Head>
                <div id="wnmb" style={{ backgroundColor: "black", borderTop: "5px solid red" }}>
                    <div style={{ width: "100%", height: "8rem", backgroundImage: `url(${xiangqing.picUrl})`, backgroundSize: "100% 100%" }}>
                        <div style={{ color: "green", fontSize: 22 }}>
                            <h2 style={{ lineHeight: "32px", fontWeight: 900 }}>歌曲名:{data.name}</h2>
                            <h2 style={{ lineHeight: "32px", fontWeight: 900 }}>歌手:{data.singer}</h2>
                            <h2 style={{ lineHeight: "32px", fontWeight: 900 }}>专辑:{data.zhuanji}</h2>
                        </div>
                        <div className="pic_img">
                            <img className="Rotation img" src={xiangqing.picUrl} alt="" />
                        </div>
                    </div>
                    <div style={{ marginTop: 20, color: "white", marginBottom: "70px", backgroundColor: "black", width: "100%", height: "3.1rem", overflowY: "scroll" }}>
                        {
                            lyric.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <h2 style={{ fontSize: 18, lineHeight: "24px", fontWeight: 900 }}>{item}</h2>
                                    </div>

                                )
                            })
                        }
                    </div>
                    <div id="audio">
                        <div className="CasePanel">
                            <Button size="sm" onClick={() => this.prevSong((data.sid) * 1 - 1)} theme="primary" flat={true}>上一首</Button>
                            <Button size="sm" onClick={() => this.shouCang(data.sid, data.name, data.urlid, data.singer, data.zhuanji)} shape="circle" theme="success" flat={true}>收藏</Button>
                            <Button size="sm" onClick={() => this.pingLun(data.sid)} shape="circle" theme="warning" flat={true}>评论</Button>
                            <Button size="sm" onClick={() => this.xiHuan(data.sid, data.name, data.urlid, data.singer, data.zhuanji)} shape="circle" theme="danger" flat={true}><i className="icon iconfont icon-xihuan"></i></Button>
                            <Button size="sm" onClick={() => this.nextSong((data.sid) * 1 + 1)} theme="info" flat={true}>下一首</Button>
                        </div>
                        <audio style={{ width: "100%" }} src={gequ} ref="player" controls
                            type="audio/mpeg"
                            preload="auto"
                        ></audio>
                    </div>

                </div>

            </div>
        )
    }
}

export default Good