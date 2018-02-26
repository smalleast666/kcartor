
import React from 'react'
import axios from 'axios'
import { message, Button } from 'antd';

//redux
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as index_act from "../../actions/index";
import { mapstate } from "../../reducers/data"

import Vcode from 'react-vcode';
import "./login.scss";


class Login extends React.Component {

    constructor () {
        super();
        this.state = {
            // inuptVcode: "",
            vcode: "",
            layer: {
                dis: false,
                cnt: ""
            } 
        };
    }

    componentWillMount () {
        if (sessionStorage.getItem("user_name")) {
            var user_name = sessionStorage.getItem("user_name")
            var password = sessionStorage.getItem("password")

            axios.post('/proxy/login', {
                user_name: user_name,
                password: password,
                // domain_name: window.location.host.split(".")[0],
                domain_name: "gt"

            }).then(res => {
                if (res.data.status === 200) {
                    this.props.act_user_msg(res.data.data)
                    message.success("登录" + res.data.message)

                    return
                }
                message.error(res.data.message)

            }).catch(error =>
                console.log(error)
            )
            return
            
        }
    }
    enter = (event) => {
        if (event.keyCode === 13) {
            this.submit()
        }
    }

    submit = () => {
        var user_name = this.refs.user_name.value
        var password = this.refs.password.value
        
        if (this.refs.inuptVcode.value === this.state.vcode) {
            
            axios.post('/proxy/login', {
                user_name: user_name,
                password: password,
                // domain_name: window.location.host.split(".")[0],
                domain_name: "gt"
                
            }).then( res => {
                
                if (res.data.status === 200) {
                    sessionStorage.setItem("user_name", this.refs.user_name.value)
                    sessionStorage.setItem("password", this.refs.password.value)

                    this.props.act_user_msg(res.data.data);
                    message.success("登录" + res.data.message)

                    return
                }
                message.error(res.data.message)

            }).catch( error => 
                console.log(error)
                //401未登录
            )
            
            return
        } else {
            this.setState({layer: { dis: true, cnt: "验证码错误" } })
            setTimeout(() => {
                this.setState({ layer: {dis: false, cnt: "" } })
            }, 1000)
        }
        message.error("验证码不正确")
       
    }

    render() {

        return (
            <div className="loginBG">
                <div className="login">
                    <p className="title">车管家后台管理系统</p>
                    <form>
                        <div className="LoginCom">
                            <img src={require('../../images/login_ico_05.png')} alt="icon" />
                            <input name="user_name" placeholder="账号" type="text" ref="user_name"/>
                        </div>
                        <div className="LoginCom">
                            <img src={require('../../images/login_ico_11.png')} alt="icon" />
                            <input name="password" placeholder="密码" type="password" ref="password"/>
                        </div>
                        <div className="LoginCom">
                            <img src={require('../../images/login_ico_17.png')} alt="icon" />
                            <input placeholder="验证码" type="text" ref="inuptVcode" onKeyDown={this.enter}/>
                            <Vcode style={style} onChange={ v =>  this.setState({ vcode: v }) } />

                        </div>

                        <div className="repassword">
                            <span>
                                <input type="checkbox" id="loginCheckbox"/>
                                <label htmlFor="loginCheckbox">记住密码</label>
                            </span>
                        </div>
                        <Button size="large" type="primary" style={{ width: "100%", height: "46px", fontSize: "16px" }} onClick={this.submit}>登录</Button>
                    </form>
                    
                    
                </div>
            </div>
        )
    }
}

const style = {
    'position': 'absolute',
    'right': "1px",
    'top': '1px',
    'height': '44px',
    'borderRadius': '6px',
}

// export default Login

function bindact(dispatch) {
    return bindActionCreators(index_act, dispatch)
}

export default connect(mapstate, bindact)(Login);
