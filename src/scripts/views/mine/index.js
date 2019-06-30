

import "./index.scss";
import { Head } from "../../components/head";
import React, { Component } from "react";
// import axios from "../../../utils/axios";
import { Link } from "react-router-dom";
import { Toast, ImagePicker } from "antd-mobile";
import axios from "../../../utils/axios"
import { List, ListItem, ListItemText, Avatar, ListItemAction, Button } from 'bee-mobile';

const bForceGet = true;
class Mine extends Component {
    
    state = {
        newTab: ["私人FM", "最新电音", "私藏推荐", "古典专区", "跑步FM", "爵士电台", "幼儿频道", "因乐交友"],
        menus: [
            {
                text: '本地音乐',
                path: '/bdyy',
                icon: 'icon-ttpodicon',
            },
            {
                text: '最近播放',
                path: '/zjbf',
                icon: 'icon-zuijinbofang',
            },
            {
                text: '下载管理',
                path: '/xzgl',
                icon: 'icon-xiazaiguanli',
            },
            {
                text: '我的歌单',
                path: '/wddt',
                icon: 'icon-wodediantai',
            },
            {
                text: '我的收藏',
                path: '/wdsc',
                icon: 'icon-wodeshoucang',
            }
        ],
        caidan: [
            {
                text: '我喜欢的音乐',
                path: '/mylike',
                avatar: require("../../../assets/images/ppp.gif"),
                icon: 'icon-ttpodicon',
            },
            // {
            //     text: '最近播放',
            //     path: '/zjbf',
            //     avatar: require("../../../assets/images/img2.jpg"),
            //     icon: 'icon-zuijinbofang',
            // },
            // {
            //     text: '下载管理',
            //     path: '/xzgl',
            //     avatar: require("../../../assets/images/img3.jpg"),
            //     icon: 'icon-xiazaiguanli',
            // },
            // {
            //     text: '我的电台',
            //     path: '/wddt',
            //     avatar: require("../../../assets/images/img4.jpg"),
            //     icon: 'icon-wodediantai',
            // },
            // {
            //     text: '我的收藏',
            //     path: '/wdsc',
            //     avatar: require("../../../assets/images/ppp.gif"),
            //     icon: 'icon-wodeshoucang',
            // },
            // {
            //     text: '我的收藏',
            //     path: '/wdsc',
            //     avatar: require("../../../assets/images/Pikachu.jpg"),
            //     icon: 'icon-wodeshoucang',
            // },
            // {
            //     text: '我的收藏',
            //     path: '/wdsc',
            //     avatar: require("../../../assets/images/slide1.png"),
            //     icon: 'icon-wodeshoucang',
            // }
        ],
        xingkong: require("../../../assets/images/xingkong.gif"),
        txt: "",
        userImg: require("../../../assets/images/ppp.gif")
    };

    componentWillMount() {
        
        if (localStorage.mobile) {
            var mobile = localStorage.mobile;
            const instance = axios.create({
                withCredentials: true
            })
            instance.get('/react/get-avatar', {
                params: {
                    mobile
                }
            }).then(res => {
                console.log(res)
                this.setState({
                    // userImg: res.data.result.avatar.replace(/public/, 'http://47.102.104.100:5100'),
                    userImg: res.data.result.avatar.replace(/public/, 'http://localhost:5200'),
                    txt: `欢迎您${mobile}`
                })
                localStorage.userInfo = JSON.stringify({ avatar: res.data.result.avatar });
                console.log(localStorage.userInfo);
                // window.location.reload([bForceGet])
            })
        } else {
            this.setState({
                txt: "您还没有登录,点击登陆"
            })
        }
    }

    tuiChu = () => {
        console.log("退出");
        if (localStorage.mobile) {
            delete localStorage.mobile;
            delete sessionStorage.userInfo;
            delete localStorage.userInfo;
            Toast.fail("退出登录成功", 1)
            this.setState({
                txt: "您还没有登录,点击登陆",
                imgUrl: require("../../../assets/images/ppp.gif")
            })
            window.location.reload([bForceGet])
        } else {
            Toast.fail("请您先登录", 1)
        }

    };
    goLogin = () => {
        if (localStorage.mobile) {
            Toast.info("您已经登陆了,请不要重复登录", 1)
        } else {
            this.props.history.push("/login")
        }
    };

    //换头像
    onChange = (e) => {
        console.log("换头像")


        let $target = e.target || e.srcElement
        console.log(15115165)
        let file = $target.files[0];
        if (localStorage.mobile) {
            console.log(localStorage.mobile)
            let data = new FormData();    // 构建表单数据对象  
            data.append('avatar', file);  // 需要上传到 服务器 的数据
            data.append('mobile', localStorage.mobile);
            const instance = axios.create({
                withCredentials: true
            })
            instance.post('/react/upload-avatar', data).then(res => {
                console.log(res)
                this.setState({
                    userImg: res.data.imgUrl.replace(/public/, 'http://localhost:5200')
                    // userImg: res.data.imgUrl.replace(/public/, 'http://47.102.104.100:5100')
                })
                localStorage.userInfo = JSON.stringify({ avatar: res.data.imgUrl });
                console.log(localStorage.userInfo)
            })
        } else {
            Toast.fail("请您登录后再修改头像", 1)
        }

    };

    render() {
        const {
            menus,
            caidan,
            xingkong,
            txt,
        } = this.state;
        return (
            <div className="grzx" style={{ backgroundColor: "#6b6666" }}>
                <Head title="个人中心"></Head>
                <div style={{ borderTop: "5px solid red", marginTop: 45, width: "100%", height: 200, backgroundImage: `url(${xingkong})`, backgroundSize: "100% 100%", textAlign: "center" }}>
                    <div style={{ marginTop: 50, height: 100, lineHeight: "100px" }}>
                        <div className="upload-container">
                            <input type="file" name="image" className='headerInput' onChange={this.onChange} />
                            <h3 >
                                <img src={this.state.userImg} alt="" id='userHeader' className='headerImg' style={{ borderRadius: '50%' }} />
                            </h3>
                        </div>
                        <p onClick={this.goLogin} style={{ float: "left", marginLeft: 20, fontSize: 20,color:"white" }}>{txt}</p>
                    </div>
                </div>
                <List>
                    {
                        menus.map((menu, index) => (
                            <ListItem key={index.toString()}>
                                <Link to={menu.path}>
                                    <i
                                        className={"icon iconfont " + menu.icon}
                                        style={{ padding: "0 10px", display: 'block' }}
                                    />
                                    <ListItemText>
                                        {menu.text}
                                    </ListItemText>
                                </Link>
                            </ListItem>
                        ))
                    }
                </List>
                <List className="list" style={{ marginBottom: 30 }}>
                    {
                        caidan.map((menu, index) => (
                            <ListItem key={index.toString()}>
                                <Link to={menu.path}>
                                    <Avatar src={menu.avatar} round="true" style={{ width: 40 }} />
                                    <ListItemText>
                                        {menu.text}
                                    </ListItemText>
                                    <ListItemAction>
                                        <i className="icon iconfont icon-gengduo"></i>
                                    </ListItemAction>
                                </Link>
                            </ListItem>
                        ))
                    }
                    <Button onClick={this.tuiChu} className="btn" theme="danger" block={true}>退出</Button>
                </List>

            </div>
        )
    }
}

export default Mine;
