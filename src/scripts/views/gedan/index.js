import "./index.scss";
// import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Head } from "../../components/head";
import {Button} from "bee-mobile";
import {Toast} from "antd-mobile"
import axios from "../../../utils/axios";
import tuijian from "../../modx/tuijian";
import { observer } from "mobx-react";
@observer

class Gedan extends Component {

    state = {
        neirongs: ""
    }

    componentWillMount() {
        console.log(this.props)
        var sid = this.props.match.params.id;
        var neirong = tuijian.geDan.filter(item => item.id == sid);//eslint-disable-line
        console.log(neirong)
        this.setState({
            neirongs: neirong
        })
    };
    shouCang=(id,img,name)=>{
        console.log(id+"+"+id);
        if(localStorage.mobile){
            axios.get("/react/scGeDan",{
                params:{
                    mobile:localStorage.mobile,
                    id,
                    img,
                    name
                }
            }).then(res=>{
                console.log(res)
            })
        }else{
            Toast.offline('请您登陆后再收藏', 1);
        }
    }

    render() {
        // console.log(this.state.neirongs)
        const {
            neirongs
        } = this.state
        // console.log(tuijian.geDan)
        return (
            <div className="hanpi" style={{backgroundColor:"black"}}>
                <Head title="歌单" show={true}></Head>
                <ul className="baba" style={{ marginTop: 45, borderTop: "5px red solid", backgroundColor: "black", color: "white" }}>
                    {
                        neirongs.map((item, index) => {
                            return (
                                <li key={index}>
                                    <img style={{ width: "100%", height: "5rem" }} src={item.coverImgUrl} alt="" />
                                    <div style={{ fontSize: "24px", lineHeight: "32px", textAlign: "center" }}>类型:
                                        {
                                            item.tags.map((tag, i) => {
                                                return (
                                                    <span style={{ fontSize: "20px", color: "red" }} key={i}>{tag}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    <div style={{ overflow: "hidden", lineHeight: "1.5rem" }}>
                                        <img style={{ float: "left", marginTop: "0.25rem", marginLeft: "0.2rem", width: "1rem", height: "1rem", borderRadius: "50%" }} src={item.creator.backgroundUrl} alt="" />
                                        <span style={{ float: "left", marginLeft: "0.5rem" }}>{item.creator.nickname}</span>
                                    </div>
                                    <h2>{item.name}</h2>
                                    <h2>{item.creator.signature}</h2>
                                    <h2>{item.description}</h2>
                                    <Button className="erzi"  onClick={()=>this.shouCang(item.id,item.coverImgUrl,item.name)} flat={true} theme="danger">收藏</Button>
                                </li>
                            )
                        })
                    }
                </ul>
                
            </div>
        )
    }
}

export default Gedan