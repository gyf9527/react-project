

import "./index.scss";
import React,{Component}  from "react";
import {Route,Switch,Redirect} from "react-router-dom"
import  Mine  from "../mine";
import Find  from "../find";
import { Singer } from "../singer";
import { Video } from "../shipin";
import {MFoot} from "../../components/mFoot"


export class GuDao extends Component{
    render(){
        return (
            <div>
                <Switch>
                    <Route path="/gudao/mine" component={Mine} />
                    <Route path="/gudao/find" component={Find} />
                    <Route path="/gudao/singer" component={Singer} />
                    <Route path="/gudao/video" component={Video} />
                    <Route 
                        render={
                            ()=>(<Redirect to="/gudao/mine" />   )
                        }
                    />

                </Switch>
                <MFoot />
            </div>
        )
    }
}