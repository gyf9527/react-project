import "./index.scss"
import React,{Component}  from "react";
import {Link} from "react-router-dom";

class Item extends Component{

    componentWillMount(){
        
    }
    render(){
        const {
            song
        } = this.props;
        return (
            <div>
                <Link to={"/good/detail/"+song.sid+"?uid="+song.urlid} >
                        <h2 style={{paddingLeft:20,backgroundColor:"black",color:"white",fontSize:".4rem",lineHeight:".8rem"}}>
                            {song.name}--{song.singer}
                        </h2>
                </Link>
            </div>
        )
    }
}
export default Item
