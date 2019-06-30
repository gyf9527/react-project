import "./index.scss";
// import ReactDOM from "react-dom";
import React,{Component}  from "react";
import  {Head} from "../../components/head";

export class Zjbf extends Component{
    render(){
        return (
            <div>
                <Head title="最近播放" show={true}></Head>
            </div>
        )
    }
}