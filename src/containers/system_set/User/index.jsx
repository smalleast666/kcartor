import React from 'react'
// import { Row, Col, Icon, Spin } from 'antd'
import { Icon } from 'antd'

import "./index.scss"

import ContentTitle from '../../../components/ContentTitle'


class assembly extends React.Component {

    componentWillMount () {
        // axios.get("/proxy/api", {
        //     params: {
        //         method: "/vehicle/manage/delete/"
        //     }
        // }).then(res => {

        //     if (res.data.status === 200) {
        //         this.setState({
        //             userList: res.data.data
        //         })
        //         return
        //     }
        //     message.error(res.data.message);

        // })
    }

    render() {
        return (
            <div className="user">
                <div className="title">
                    <ContentTitle text="用户管理" />
                    <div className="add_icon"><Icon type="plus" style={{ fontSize: 28, color: '#fff', fontWeight: "bold" }} /></div>
                </div>
                {/* <div className="listTable">
                    <Row>
                        <Col span={2}>ID</Col>
                        <Col span={3}>用户名</Col>
                        <Col span={3}>邮箱</Col>
                        <Col span={3}>角色</Col>
                        <Col span={2}>公司</Col>
                        <Col span={5}>创建时间</Col>
                        <Col span={6}>操作</Col>
                    </Row>
                    {
                        this.state.userList ?
                            this.state.userList.map(item =>
                                <Row key={item.car_no}>
                                    <Col span={2}>{item.car_no}</Col>
                                    <Col span={3}>{item.car_lincense}</Col>
                                    <Col span={3}>{item.driver_name}</Col>
                                    <Col span={3}>{item.driver_phone}</Col>
                                    <Col span={2}>{item.nike_name}</Col>
                                    <Col span={5}>
                                        {
                                            new Date(item.created_at * 1000).getFullYear() + "/" +
                                            new Date(item.created_at * 1000).getMonth() + "/" +
                                            new Date(item.created_at * 1000).getDate()
                                        }
                                    </Col>
                                    <Col span={6} className="operation">
                                        <span className="blue">编辑</span>
                                        <span className="green">详情</span>
                                        <span className="red" onClick={this.delete_car.bind(this, item.car_no, item.car_lincense)}>删除</span>
                                    </Col>
                                </Row>
                            )
                            : <div style={{ textAlign: "center", padding: "50px" }}><Spin size="large" /></div>
                    }

                </div> */}

            </div>
        )
    }
}

export default assembly