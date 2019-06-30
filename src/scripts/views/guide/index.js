

import "./index.scss";
import { Swiper } from 'bee-mobile';
import {WingBlank,Carousel} from "antd-mobile"
import React, { Component } from "react";
// const Item = Swiper.item;


export class Guide extends Component {
    state = {
        imgs: [
            require("../../../assets/images/yyj.jpg"),
            require("../../../assets/images/xs1.jpg"),
            require("../../../assets/images/yy.jpg"),
            require("../../../assets/images/ls.png"),
        ],
        imgHeight:"100%"
    }
    gotoGuDao(id) {
        console.log(id);
        const { history } = this.props;
        if (id == this.state.imgs.length - 1) {//eslint-disable-line
            history.push("/login");
        }
    }
    componentWillMount() {
        console.log("xxx")
        if (localStorage.pcount) {
            localStorage.pcount++;
            if (localStorage.pcount > 3) {
                const { history } = this.props;
                history.push("/login");
            }
        } else {
            localStorage.pcount = 1;
        }
    }
    render() {
        return (
                <Carousel
                    autoplay={false}
                    infinite
                    autoplay="ture"
                    id="guide"
                    href=""
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                >
                    {this.state.imgs.map((item,id) => (
                        <a
                            key={id}
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={item}
                                alt=""
                                className="g-img"
                                onClick={()=>this.gotoGuDao(id)}
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
            // <div  className="CasePanel">
            //     <section className="CasePanel">
            //         <Swiper loop={true} effect="fade" loop={true} id="guide">
            //         {
            //                 this.state.imgs.map((item, id) => {
            //                     return (
            //                         <div className="shabi" key={id}>
            //                             <img key={id} src={item} alt="" className="g-img" onClick={() => this.gotoApp(id)} />
            //                         </div>
            //                     )
            //                 })
            //             }
            //         </Swiper>
            //     </section>
            // </div>

        )
    }
}