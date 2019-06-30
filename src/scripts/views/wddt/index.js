import "./index.scss";
// import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Head } from "../../components/head";
import { List, ListItem, Avatar, ListItemText, ListItemAction, Button } from "bee-mobile"
import { Toast } from "antd-mobile";
import tuijian from "../../modx/tuijian";
import { observer } from "mobx-react";
import axios from "../../../utils/axios";
@observer


class Wddt extends Component {


    componentWillMount() {
        if (localStorage.mobile) {
            var mobile = localStorage.mobile;
            tuijian.getShouCang(mobile);
        } else {
            Toast.offline('请您先登录', 1);
        }
    };
    delGeDan = (index, id) => {
        console.log(index)
        axios.get("/react/delGeDan", {
            params: {
                mobile:localStorage.mobile,
                id
            }
        }).then(res => {
            console.log(res.data)
            if (res.data.type == 1) {//eslint-disable-line
                tuijian.gedans.splice(index, 1)
            }
        })


    }

    render() {
        const {
            gedans
        } = tuijian
        return (
            <div className="wdgd" style={{backgroundColor:"#6b6666"}}>
                <Head title="我的歌单" show={true}></Head>
                <List style={{ marginTop: 45, }}>
                    {
                        gedans.map((item, index) => (
                            <ListItem key={index}>
                                <Avatar src={item.img} style={{ width: 40 }} />
                                <ListItemText>
                                    {item.name}
                                </ListItemText>
                                <ListItemAction>
                                    <Button size="sm" theme="danger" flat={true} onClick={() => this.delGeDan(index, item.id)}>删除</Button>
                                </ListItemAction>
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        )
    }
}

export default Wddt;