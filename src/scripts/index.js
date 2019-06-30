

import  {render}  from "react-dom";  //  ReactDOM.render
import { IndexView } from "./views";
import React from "react";
import {Provider} from  "react-redux";
import store from "./store";


const rootEle = document.getElementById("root");



// import "./flux/index";
const hotRender = () => {
    render(
        <Provider store={store} >
            <IndexView />
        </Provider>,
        rootEle
    )
}

hotRender();

// store.subscribe(hotRender)  // State 发生变化，就自动执行这个函数
// import "./react-redux"