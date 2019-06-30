import "./index.scss";
// import ReactDOM from "react-dom";
import React,{Component}  from "react";
import  {Head} from "../../components/head";
import {List,ListItem,ListItemText,ListItemAction,Avatar} from "bee-mobile"
import tuijian from "../../modx/tuijian";
import {observer} from "mobx-react";
@observer

class Tjgd extends Component{

    componentWillMount(){
        // console.log(this.props);
        var uid=this.props.match.params.uid;
        console.log(uid);
        tuijian.getGeDan(uid);
    };
    tjGeDan=(id)=>{
        console.log(id)
        this.props.history.push(`/gedan/${id}`)
    }

    render(){
        const{
            geDan
        }=tuijian
        return (
            <div>
                <Head title="推荐歌单" show={true}></Head>
                <List style={{marginTop:45}}>
                    {
                        geDan.map((item, index) => (
                            <ListItem onClick={()=>this.tjGeDan(item.id)} key={index.toString()}>
                                <Avatar src={item.coverImgUrl} style={{width: 40}}/>
                                <ListItemText>
                                    {item.name}
                                </ListItemText>
                                <ListItemAction>
                                    <i style={{width:20,helght:20}} className="icon iconfont icon-you"></i>
                                </ListItemAction>
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        )
    }
}

export default Tjgd;