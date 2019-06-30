import "./index.scss";
// import ReactDOM from "react-dom";
import React,{Component}  from "react";
import {Head} from "../../components/head"

export class Bdyy extends Component{
    render(){
        return (
            <div>
                <Head title="本地音乐" show={true}></Head>
                <h2>本地音乐</h2>
            </div>
        )
    }
}