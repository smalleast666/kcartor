import React from 'react'
import axios from 'axios'

import { Row, Col, Spin, Button, Input, message, Popconfirm } from 'antd'
import ContentTitle from '../../../components/ContentTitle'

import "./index.scss"



class Bind extends React.Component {
    constructor() {
        super()
        this.state = {
            BindList: ""
        }
    }

    componentWillMount() {

        axios.post("/proxy/api", {
            method: "/din/bind"
        }).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    BindList: res.data.data
                })
                return
            }
            message.error(res.data.message);

        })
    }

    changeTime = () => {

    }

    sure = (car_no, index) => {

    }

    render() {
        return (
            <div className="Detect">
                <ContentTitle text="司机绑定" />
                <div className="search">
                    <Input
                        style={{ width: "200px", marginRight: "15px", verticalAlign: "0px" }}
                        size="large"
                        placeholder="请输入您的车牌号"
                    />
                    <Input
                        style={{ width: "200px", marginRight: "15px", verticalAlign: "0px" }}
                        size="large"
                        placeholder="请输入您的车机"
                    />
                    <Input
                        style={{ width: "200px", marginRight: "15px", verticalAlign: "0px" }}
                        size="large"
                        placeholder="请输入您的电话"
                    />
                    <Button
                        style={{ marginRight: "15px", verticalAlign: "0px" }}
                        type="primary"
                        size="large"
                    >查询</Button>
                    <Button type="primary" size="large">导出Excel</Button>
                </div>

                <div className="listTable">
                    <Row>
                        <Col span={2}>ID</Col>
                        <Col span={2}>车牌</Col>
                        <Col span={3}>公司</Col>
                        <Col span={3}>车机</Col>
                        <Col span={2}>SN码</Col>
                        <Col span={3}>绑定电话</Col>
                        <Col span={2}>司机</Col>
                        <Col span={3}>添加时间</Col>
                        <Col span={4}>操作</Col>
                    </Row>
                    {
                        this.state.BindList ?
                            this.state.BindList.data.map((item, index) =>
                                <Row key={item.bind_no}>
                                    <Col span={2}>{item.bind_no}</Col>
                                    <Col span={2}>{item.car_lincense}</Col>
                                    <Col span={3}>{item.nike_name}</Col>
                                    <Col span={3}>{item.din}</Col>
                                    <Col span={2}>{item.sn}</Col>
                                    <Col span={3}>{item.driver_phone}</Col>
                                    <Col span={2}>{item.driver_name}</Col>
                                    <Col span={3}>
                                        {
                                            new Date(item.created_at * 1000).getFullYear() + "/" +
                                            new Date(item.created_at * 1000).getMonth() + "/" +
                                            new Date(item.created_at * 1000).getDate()
                                        }
                                    </Col>
                                    
                                    <Col span={4} className="operation">
                                        <span className="green">新增</span>
                                        <Popconfirm
                                            title={
                                                <div>
                                                    您确定要解除
                                                <span
                                                        style={{
                                                            color: "red",
                                                            fontWeight: "bold"
                                                        }}
                                                    >
                                                        【{item.car_lincense}】
                                                </span>的司机绑定吗？
                                            </div>
                                            }
                                            okText="立即解除"
                                            cancelText="暂不解除"
                                            placement="topRight"
                                            onConfirm={this.sure.bind(this, item.car_no, index)}
                                        >
                                            <span className="red">删除</span>
                                        </Popconfirm>
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

export default Bind