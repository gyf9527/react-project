import "./index.scss";
import React,{Component}  from "react";
import { TabBar } from 'antd-mobile';
import PropTypes from "prop-types";

export const foots =  [
    {txt:"我的",path:"/gudao/mine",name:"mine",icon:"icon-wode",on:"home-on.png",off:"home-off.png"},
    {txt:"发现",path:"/gudao/find",name:"find",icon:"icon-faxian"},
    {txt:"歌手",path:"/gudao/singer",name:"singer",icon:"icon-geshou1"},
    {txt:"专区",path:"/gudao/video",name:"video",icon:"icon-shipin1"}
]




export class MFoot extends Component{
    state = {
        selectedTab:"mine"
    }

    componentWillMount(){
        const {location} = this.context.props;
        var pathname = location.pathname.split("/gudao/")
        var name = pathname[1];
        this.setState({
            selectedTab:name
        })
    }

    componentWillUpdate(){
        console.log("ssss")
    }


    render(){
        return (
            <div className="footer">
                <TabBar
                     unselectedTintColor="#949494"
                     tintColor="#fff"
                     barTintColor="#171515"
                >
                    {
                        foots.map((foot,i)=>{
                            return (
                                <TabBar.Item
                                    title={foot.txt}
                                    key={i}
                                    icon={<i 
                                    className={"icon iconfont "+foot.icon}
                                    style={{
                                    width: '22px',
                                    height: '22px',
                                    display:"block"
                                    }}
                                    />
                                    }
                                    selectedIcon={<i 
                                    className={"icon iconfont "+foot.icon}
                                    style={{
                                        width: '22px',
                                        height: '22px',
                                        display:"block",
                                        
                                    }}
                                    />
                                    }
                                    selected={this.state.selectedTab ===foot.name}//eslint-disable-line
                                
                                    onPress={() => {
                                        console.log(this.context);
                                        const {history } = this.context.props;
                                        this.setState({
                                            selectedTab: foot.name
                                        });

                                        history.push(foot.path);
                                    }}
                                    data-seed="logId"
                                >
                                
                                </TabBar.Item>
                            )
                        })
                    }
                </TabBar>
            </div>
        )
    }
}


MFoot.contextTypes ={
    props:PropTypes.object
}
