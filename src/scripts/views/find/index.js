

import "./index.scss";
import React, { Component } from "react";
import { Head } from "../../components/head";
// import axios from "../../../utils/axios";
import { Swiper, Card, Button, CardFooter, CardContent } from 'bee-mobile';
import tuijian from "../../modx/tuijian";
import { observer } from "mobx-react";
@observer

class Find extends Component {
    state = {
        types: [],
        allGoods: [],
        imgs: [
            require("../../../assets/images/singer1.png"),
            require("../../../assets/images/singer2.png"),
            require("../../../assets/images/singer3.png"),
            require("../../../assets/images/singer4.png"),
            require("../../../assets/images/singer5.png"),
        ],
        lists: [
            {
                icon: "icon-meirituijian",
                text: "每日推荐"
            },
            {
                icon: "icon-gedan",
                text: "歌单"
            },
            {
                icon: "icon-paihangbang",
                text: "排行榜"
            },
            {
                icon: "icon-diantai",
                text: "电台"
            },
            {
                icon: "icon-zhibo",
                text: "直播"
            }
        ],
        tuijian: [
            {
                img: require("../../../assets/images/photo.png"),
                text: "玩你妈呢"
            },
            {
                img: require("../../../assets/images/photo.png"),
                text: "玩你妈呢"
            },
            {
                img: require("../../../assets/images/photo.png"),
                text: "玩你妈呢"
            },
            {
                img: require("../../../assets/images/photo.png"),
                text: "玩你妈呢"
            },
            {
                img: require("../../../assets/images/photo.png"),
                text: "玩你妈呢"
            },
            {
                img: require("../../../assets/images/photo.png"),
                text: "玩你妈呢"
            }
        ],
        yuncun: [
            {
                text: "有一天我吃完泡面发现洗洁精用光了，我随手用剃须泡洗碗时，会觉得可能要是有一个女朋友就好了。并不是因为有了女朋友就不会吃泡面，也不是因为有了女朋友就会有人帮你洗碗，是我想在洗完碗转身回去时会有个人在那里，等着我一脸神秘地说： '嘿！你猜我刚刚用什么洗的碗？'",
                singer: "柳爽",
                song: "莫妮卡"
            },
            {
                text: "《骆驼祥子》里有一段话:'这世间的真话本就不多，一个女子的脸红，胜过一大段对白'。可后来有了胭脂，便分不清是真情还是假意。",
                singer: "陈雪凝",
                song: "假装"
            },
            {
                text: "你看车窗外的风里,眼里透着彩色的光影,我在一旁看着你,那便是我眼中最美的风景",
                singer: "房东的猫",
                song: "云烟成雨"
            },
            {
                text: "2019年,雪见已经和刘恺威离婚,徐长卿和紫薇喜结连理,茂茂还在拿着屠龙宝刀招摇撞骗,紫萱也找到了命中的另一半,唯有景天还是那个景天,岁月并没有改变他什么,他还是他,那个让人心醉的古装王子",
                singer: "青鸟飞鱼",
                song: "此生不换"
            },
            {
                text: "'我于昨晚去世,走时心如止水,我于今早重生,来时心怀暖阳'",
                singer: "ICE Paper",
                song: "心如止水"
            },
            {
                text: "我一直以为痛仰,意为痛苦的信仰.忽然发现还可以是这样:即便是痛苦,也不能阻止我们仰起的头颅",
                singer: "痛仰乐队",
                song: "为你唱首歌"
            }

        ]
    };

    componentWillMount() {
        tuijian.getTuijian();

    };
    tjGeDAN = (uid) => {
        console.log(uid);
        const { history } = this.props;
        history.push({ pathname: `/tjgd/${uid}` })
    };
    render() {
        const {
            tuiJian
        } = tuijian
        return (
            <div style={{ backgroundColor: "#6b6666" }}>
                <Head title="发现音乐"></Head>
                <section>
                    <Swiper loop={true} autoplay={true} style={{ width: '100%', height: 180, marginTop: 45 }}>
                        {
                            this.state.imgs.map((item, id) => {
                                return (
                                    <img key={id} src={item} alt="" className="f-img" onClick={() => this.gotoApp(id)} />
                                )
                            })
                        }
                    </Swiper>
                </section>
                <ul style={{ overflow: "hidden" }}>
                    {
                        this.state.lists.map((list, index) => {
                            return (
                                <li key={index} style={{ width: "20%", float: "left", textAlign: "center" }}>
                                    <i style={{
                                        width: '22px',
                                        height: '22px',
                                    }}
                                        className={"icon iconfont " + list.icon}>
                                    </i>
                                    <p style={{ marginTop: "5px" }}>{list.text}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <h2 style={{ fontSize: 20, fontWeight: 900, padding: "10px 10px 10px 5px" }}>推荐歌单</h2>
                <ul style={{ overflow: "hidden" }}>
                    {
                        tuiJian.map((list, index) => {
                            return (
                                <li onClick={() => this.tjGeDAN(list.userId)} key={index} style={{ width: "33.33%", float: "left", textAlign: "center", height: "3.8rem", backgroundColor: "black", color: "white" }}>
                                    <img src={list.coverImgUrl} style={{ width: "80%", margin: "5px auto" }} alt="" />
                                    <p style={{ marginTop: "5px" }}>{list.name}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <div style={{ marginBottom: 35 }}>
                    {
                        this.state.yuncun.map((item, index) => {
                            return (

                                <Card key={index} style={{ backgroundColor: "black", color: "white", marginTop: 5 }}>
                                    <CardContent>
                                        <div style={{ padding: 10, fontSize: 16 }}>
                                            {item.text}
                                            <h2 style={{ textAlign: "right", fontSize: 18, lineHeight: "30px" }}>{item.song}--{item.singer}</h2>
                                        </div>
                                    </CardContent>
                                    <CardFooter style={{ padding: "0 5px 5px 5px" }}>
                                    <Button theme="primary" >分享</Button>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Find;