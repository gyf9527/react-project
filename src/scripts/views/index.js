import {HashRouter as Router,Route,Switch,Redirect} from "react-router-dom";
import React,{Component}  from "react";
import { Guide } from "./guide";
import { GuDao } from "./app";
import PropTypes from "prop-types";
import { Search } from "./search";
import { Login } from "./login";
import  Good  from "./good";
import { Zjbf } from "./zjbf";
import { Bdyy } from "./bdyy";
import { Xzgl } from "./xzgl";
import  Wddt  from "./wddt";
import { Wdsc } from "./wdsc";
import {Slist} from "./slist";
import PingLun from "./pinglun";
import {Mylike} from "./mylike";
import Tjgd from "./tjgd";
import Gedan from "./gedan";
import Bofang from "./bofang"


export class IndexView extends Component{
    render(){
        return (
            <Router>
                <div id="main">
                    <Route path="" exact component={Layout}/>
                </div>
            </Router>
        )
    }
}

// context

// 路由配置  
export class Layout extends Component{

    getChildContext(){
        
        return {
            props:this.props
        }
    }

    render(){
        return (
            <Switch>
                <Route path="/"  exact render={()=>(<Redirect to="/guide"  />)} />
                <Route path="/guide" component={Guide} />
                <Route path="/gudao/" strtic component={GuDao}/>
                <Route path="/search" component={Search}/>
                <Route path="/login" component={Login}/>
                <Route path="/good/detail/:sid?" component={Good}/>
                <Route path="/zjbf" component={Zjbf}/>
                <Route path="/bdyy" component={Bdyy}></Route>
                <Route path="/xzgl" component={Xzgl}/>
                <Route path="/wddt" component={Wddt}/>
                <Route path="/wdsc" component={Wdsc}/>
                <Route path="/mylike" component={Mylike} />
                <Route path="/slist/:name" component={Slist} />
                <Route path="/tjgd/:uid" component={Tjgd} />
                <Route path="/pinglun/:sid" component={PingLun} />
                <Route path="/gedan/:id" component={Gedan} />
                <Route path="/bofang/:id" component={Bofang} />
                <Route 
                    render={
                        ()=>(<Redirect to="/gudao/" />   )
                    }
                />
                
            </Switch>
        )
    }
}

Layout.childContextTypes = {
    props:PropTypes.object
}

