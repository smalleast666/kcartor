import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

//redux
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as index_act from "../actions/index";
import { mapstate } from "../reducers/data"

//公共样式文件
import '../css/style.scss'
//公共组件

import RootRoute from './route'
import Login from '../containers/login/login' //登录页

class RouterConf extends React.Component {

    render() {
        return (
            <Router>
                {this.props.red_user_msg.user ? <RootRoute /> : <Login />}
            </Router>
        );
    } 

}

// export default RouterConf

function bindact(dispatch) {
    return bindActionCreators(index_act, dispatch)
}
export default connect(mapstate, bindact)(RouterConf);