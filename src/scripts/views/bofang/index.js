import "./index.scss";
// import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Head } from "../../components/head";
import axios from "../../../utils/axios";
import tuijian from "../../modx/tuijian";

class Bofang extends Component {

    state = {
        gequ: "",
        lyric: [],
        data: "",
    }

    componentWillMount() {
        console.log(this.props.match.params.id)
        var id=this.props.match.params.id
        // this.setState({
        //     lyric:`https://music.163.com/lyric/media/outer/url?id=${id}`
        // })
        // axios.get(`/cloudmusic/?type=song&id=${id}`).then(res => {
        //     console.log(res)
        //     this.setState({
        //         gequ: (res.data.data[0]).url
        //     })
        // });

        this.setState({
            gequ:`https://music.163.com/song/media/outer/url?id=${id}`
        })

        tuijian.getXq(id)

        


        

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
    }
    render() {
        console.log(this.state.lyric)
        const {
            gequ, lyric, data
        } = this.state
        const{
            singerName,
            zhuanjiName,
            picUrl,
            songName
        }=tuijian
        return (
            <div>
                <Head title={songName} show={true}> </Head>
                <div id="wnmb" style={{ backgroundColor: "black", borderTop: "5px solid red" }}>
                    <div style={{ width: "100%", height: "8rem", backgroundImage: `url(${picUrl})`, backgroundSize: "100% 100%" }}>
                        <div style={{ color: "green", fontSize: 22 }}>
                            <h2 style={{ lineHeight: "32px", fontWeight: 900 }}>歌曲名:{songName}</h2>
                            <h2 style={{ lineHeight: "32px", fontWeight: 900 }}>歌手:{singerName}</h2>
                            <h2 style={{ lineHeight: "32px", fontWeight: 900 }}>专辑:{zhuanjiName}</h2>
                        </div>
                        <div className="pic_img">
                            <img className="Rotation img" src={picUrl} alt="" />
                        </div>
                    </div>
                    <div style={{ marginTop: 20, color: "white", marginBottom: "70px", backgroundColor: "black", width: "100%", height: "2.8rem", overflowY: "scroll" }}>
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

export default Bofang