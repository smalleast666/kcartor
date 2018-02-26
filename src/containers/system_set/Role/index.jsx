import React from 'react'
import axios from 'axios'
import { Row, Col, Icon, Spin, message } from 'antd'

import ContentTitle from '../../../components/ContentTitle'
import "./index.scss"


class assembly extends React.Component {

    constructor () {
        super()
        this.state = {
            roleList: ""
        }
    }

    componentWillMount () {
        axios.post("/proxy/api", {
            method: "/admin/role"
        }).then(res => {

            if (res.data.status === 200) {
                console.log(res.data.data)
                this.setState({
                    roleList: res.data.data
                })
                return
            }
            message.error(res.data.message);

        })
    }

    delete_user () {

    }
    
    render() {
        return (
            <div className="role">
                <div className="title">
                    <ContentTitle text="角色管理" />
                    <div className="add_icon"><Icon type="plus" style={{ fontSize: 28, color: '#fff', fontWeight: "bold" }} /></div>
                </div>
                <div className="listTable">
                    <Row>
                        <Col span={1}>ID</Col>
                        <Col span={2}>标识</Col>
                        <Col span={3}>角色名</Col>
                        {
                            typeof this.state.roleList.company === "object" ?
                            <Col span={2}>公司</Col>
                            : null
                        }
                        <Col span={3}>说明</Col>
                        <Col span={3}>是否为超管</Col>
                        <Col span={5}>创建时间</Col>
                        <Col span={5}>操作</Col>
                    </Row>
                    {
                        this.state.roleList ?
                            this.state.roleList.roles.data.map(item =>
                            <Row key={item.role_id}>
                                <Col span={1}>{item.role_id}</Col>
                                <Col span={2}>{item.name}</Col>
                                <Col span={3}>{item.display_name}</Col>
                                {
                                    typeof this.state.roleList.company === "object" ?
                                            <Col span={2}>{this.state.roleList.company[item.firm_no] ? this.state.roleList.company[item.firm_no].nike_name : "——"}</Col>
                                    : null
                                }
                                <Col span={3}>{item.description}</Col>
                                <Col span={3}>
                                    {
                                        typeof this.state.roleList.company === "object" ? 
                                        item.is_super === 1 ? "是" : "否" 
                                        : item.is_super === 2 ? "是" : "否"
                                    }
                                </Col>
                                <Col span={5}>
                                    {
                                        new Date(item.created_at * 1000).getFullYear() + "/" +
                                        new Date(item.created_at * 1000).getMonth() + "/" +
                                        new Date(item.created_at * 1000).getDate()
                                    }
                                </Col>
                                <Col span={5} className="operation">
                                    <span className="blue">编辑</span>
                                    <span className="green">详情</span>
                                    <span className="red" onClick={this.delete_user.bind(this, item.role_id)}>删除</span>
                                </Col>
                            </Row>
                        )
                        : <div style={{ textAlign: "center", padding: "50px" }}><Spin size="large" /></div>
                    }

                </div>

            </div>
        )
    }
}

export default assembly