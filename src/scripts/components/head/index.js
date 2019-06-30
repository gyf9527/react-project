

import "./index.scss"
import React, { Component } from "react";
import { NavBar, Icon} from "antd-mobile";
import PropTypes from "prop-types";
export class Head extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            initData: '',
            show1: false,
        };
    }
    goback = (show) => {
        const { history } = this.context.props;
        if (show) {
            history.go(-1);
        }
    };
    goSearch = () => {
        const { history } = this.context.props;
        history.push("/search");
    };
    mySelf = (e) => {
        console.log("222")
    };
    render() {
        const {
            title,
            show
        } = this.props;
        return (
            <div className="header">
                <NavBar
                    mode="dark"
                    style={{ backgroundColor: 'black' }}
                    icon={show && <Icon type="left" />}
                    onLeftClick={() => this.goback(show)}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={this.goSearch} />,
                        // <Icon key="1" type="ellipsis" onClick={this.mySelf} />,
                    ]}
                > {title}</NavBar>
            </div>
        )
    }
}


Head.contextTypes = {
    props: PropTypes.object
}
