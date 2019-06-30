import "./index.scss"
import React, { Component } from "react";
import { Button, Inputtext, List, ListItem, ListItemText, } from 'bee-mobile';

import { Toast } from "antd-mobile"

import axios from "../../../utils/axios";

export class MyComment extends Component {
    state = {
        comments: [

        ]
    };
    componentWillMount() {
        console.log(this.props)
        axios.get("/react/getComments",
            {
                params: {
                    sid: this.props.data
                }
            }).then(res => {
                this.setState({
                    comments: res.data.result,
                })
                Toast.info(res.data.msg, 1)
            })
    }
    addComment = (comments) => {
        this.setState({
            comments
        });
    };
    render() {
        return (
            <div style={{ backgroundColor: "#cdcdcd", color: "black" }}>
                <ShowMsgCom comments={this.state.comments}></ShowMsgCom>
                <PostMsgCom addComment={this.addComment} sid={this.props.data}></PostMsgCom>

            </div>
        )
    }
}


//留言板显示
class ShowMsgCom extends Component {

    render() {
        return (
            <div className="margin-bottom-10" style={{ color: "black" }}>
                <List>
                    {
                        this.props.comments.map((menu, index) => (
                            <ListItem id={'item' + index} key={index} className="donghua-in">
                                <ListItemText>
                                    {menu.title}:{menu.content}
                                </ListItemText>
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        )
    }
}

//提交留言
class PostMsgCom extends Component {
    change = () => {
        const { addComment, sid } = this.props;
        if (localStorage.mobile) {
            var title = localStorage.mobile;
            var content = this.refs.content.state.value;
            if (content == "") {//eslint-disable-line
                Toast.fail("请输入评论")
            } else {
                axios.get("/react/addComments", {
                    params: {
                        sid,
                        title,
                        content
                    }
                }).then(res => {
                    console.log(res);
                    this.refs.content.state.value = "";
                    addComment(res.data.result);
                    Toast.info(res.data.msg, 1)
                })
            }
        }else{
            Toast.offline("请您登陆后在评论",1)
        }



    }
    render() {
        return (
            <div style={{ overflow: "hidden" }} className="nanshou">
                <Inputtext style={{ float: "left" }} animated={true} label="评论内容:" ref="content" />
                <Button className="btn" style={{ float: "left" }} theme="primary" flat={true} size="sm" onClick={this.change}>提交留言</Button>
            </div>
        )
    }
}