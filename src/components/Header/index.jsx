import React from 'react'

//redux
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as index_act from "../../actions/index";
import { mapstate } from "../../reducers/data"



import "./index.scss"

class Header extends React.Component {

    loginOut () {
        sessionStorage.clear()
        window.location.reload()
    }

    render() {
        
        return (
            <div className="header">
                <div>
                    <img src={require("../../images/menu_10.png")} alt="菜单-ico" />车管家后台管理系统
                </div>
                <div>
                    <span>
                        <img src={require("../../images/passenger.png")} alt="头像" />
                        <span>{ this.props.red_user_msg.user.user_name }</span>
                    </span>
                    <span className="loginOut" onClick={this.loginOut.bind(this)}>退出登录</span>
                </div>
            
            </div>
        )
    }
}

// export default Header

function bindact(dispatch) {
    return bindActionCreators(index_act, dispatch)
}
export default connect(mapstate, bindact)(Header);

