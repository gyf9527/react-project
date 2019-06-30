

import "./index.scss";
import React, { Component } from "react";
import { Head } from "../../components/head"
import { WingBlank, WhiteSpace, List, InputItem, Button } from "antd-mobile";
import axios from "../../../utils/axios"

export const mobileReg = /^1(3|5|7|8|9)\d{9}$/
export const codeReg = /^\d{6}$/
let timer = null;
const bForceGet = true;
export class Login extends Component {
    state = {
        toggle: true,
        mobileDis: true,
        flag: true,
        countNum: 120,
        txt: "获取验证码"
    }
    checkMobile = (mobile) => {
        console.log(mobile);
        if (this.state.flag) {
            this.setState({
                mobileDis: !mobileReg.test(mobile)
            })
        }
    }

    startTime = () => {
        console.log('uuu')
        timer = setInterval(() => {
            if (this.state.countNum > 0) {
                this.setState({
                    countNum: --this.state.countNum,
                    txt: this.state.countNum + ' s 后继续'
                })

            } else {
                clearInterval(timer);
                timer = null;
                this.setState({
                    txt: "获取验证码",
                    mobileDis: false,
                    flag: true,
                    countNum: 120
                })
            }
        }, 1000)
    }

    getCode = () => {
        console.log("发送验证码");
        axios.post("/react/sendCode", {
            mobile: this.refs.mobile.state.value
        }).then(res => {
            console.log(res);
        })
        this.setState({
            mobileDis: true,
            flag: false
        })
        // ajax 
        this.startTime();


    }
    checkCode = (val) => {
        var mobile = this.refs.mobile.state.value;
        this.setState({
            toggle: !(codeReg.test(val) && mobileReg.test(mobile))
        })
    }

    autoLogin = () => {
        var mobile = this.refs.mobile.state.value;
        var code = this.refs.code.state.value;

        axios.post("/react/testCode", {
            mobile,
            code
        }).then(res => {
            console.log(res);
            if (!!res.data.type) {
                this.props.history.push("/gudao/mine");
                window.location.reload([bForceGet])
                localStorage.mobile = mobile;
                var userInfo = {
                    token: res.data.token
                }
                sessionStorage.userInfo = JSON.stringify(userInfo)
            } else {
                delete sessionStorage['userInfo']
            }
        })
    }


    render() {
        const {
            toggle,
            mobileDis,
            txt
        } = this.state
        return (
            <div style={{ backgroundColor: "white" }}>
                <Head title="登录"></Head>
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem
                            type="tel"
                            placeholder="请输入手机号"
                            clear
                            ref="mobile"
                            onChange={this.checkMobile}
                        >手机号</InputItem>
                        <WhiteSpace />
                        <InputItem
                            type="tel"
                            placeholder="请输入验证码"
                            clear
                            ref="code"
                            onChange={this.checkCode}
                        >验证码</InputItem>
                        <WhiteSpace />
                        <Button className="l-btn" ref="btn" type="warning" onClick={this.getCode} disabled={mobileDis} > {txt}</Button>
                        <WhiteSpace />
                        <Button type="primary" disabled={toggle} onClick={this.autoLogin}>马上登录</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}