import React from 'react'
import axios from 'axios'
import { Row, Col, Icon, Spin, message } from 'antd'

import ContentTitle from '../../../components/ContentTitle'
import "./index.scss"


class Permission extends React.Component {

    constructor() {
        super()
        this.state = {
            childItemTop: 0,
            permissionList: ""
        }
    }

    componentWillMount() {
        axios.post("/proxy/api", {
            method: "/admin/permission"
        }).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    permissionList: res.data.data
                })
                return
            }
            message.error(res.data.message);

        })
    }

    delete_user() {

    }

    openList = (e) => {
        var children = this.refs.permissionTable.children
        for (var i = 0; i < children.length; i++) {
            children[i].children[1].style.maxHeight = 0
        }
        e.target.parentElement.nextSibling.style.maxHeight = "500px"
    }

    render() {
        return (
            <div className="permission">
                <div className="title">
                    <ContentTitle text="权限管理" />
                    <div className="add_icon"><Icon type="plus" style={{ fontSize: 28, color: '#fff', fontWeight: "bold" }} /></div>
                </div>
                
                <div className="permissionTable" ref="permissionTable">
                    <Row className="tableTitle">
                        <Col span={6}>显示名称</Col>
                        <Col span={6}>路由</Col>
                        <Col span={6}>说明</Col>
                        <Col span={6}>操作</Col>
                    </Row>
                    {
                        this.state.permissionList ?
                        this.state.permissionList.map(item => 
                            <div key={item.permission_id}>
                                <Row onClick={this.openList} className="table-list">
                                    <Col span={6}><Icon type="plus-circle-o" /> {item.display_name}</Col>
                                    <Col span={6}>{item.name}</Col>
                                    <Col span={6}>{item.description}</Col>
                                    <Col span={6} className="operation">
                                        <span className="blue">编辑</span>
                                        <span className="red" onClick={this.delete_user.bind(this, item.poermission_id)}>删除</span>
                                    </Col>
                                </Row>
                                {
                                    <Row className="child-item">
                                        {
                                            item.children.map(childItem =>
                                                <Row key={childItem.permission_id}>
                                                    <Col span={6}>{childItem.display_name}</Col>
                                                    <Col span={6}>{childItem.name}</Col>
                                                    <Col span={6}>{childItem.description}</Col>
                                                    <Col span={6} className="operation">
                                                        <span className="blue">编辑</span>
                                                        <span className="red" onClick={this.delete_user.bind(this, childItem.poermission_id)}>删除</span>
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                    </Row>
                                }
                            </div>

                        )
                        : <div style={{ textAlign: "center", padding: "50px" }}><Spin size="large" /></div>
                    }

                </div>

            </div>
        )
    }
}

export default Permission