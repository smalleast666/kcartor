import React from 'react'
import axios from 'axios'

import { Row, Col, Spin, Button, Input, message, Popconfirm } from 'antd'
import ContentTitle from '../../../components/ContentTitle'

import "./index.scss"



class Warranty extends React.Component {
    constructor() {
        super()
        this.state = {
            WarrantyList: ""
        }
    }

    componentWillMount() {

        axios.post("/proxy/api", {
            method: "/din/warranty"
        }).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    WarrantyList: res.data.data
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
                        placeholder="请输入您的车机"
                    />
                    <Button type="primary" size="large"
                    >查询</Button>
                </div>

                <div className="listTable">
                    <Row>
                        <Col span={2}>ID</Col>
                        <Col span={3}>车机</Col>
                        <Col span={4}>SN码</Col>
                        <Col span={6}>车辆故障说明</Col>
                        <Col span={4}>车辆故障时间</Col>
                        <Col span={5}>操作</Col>
                    </Row>
                    {
                        this.state.WarrantyList ?
                            this.state.WarrantyList.data.map((item, index) =>
                                <Row key={item.din_no}>
                                    <Col span={2}>{item.din_no}</Col>
                                    <Col span={3}>{item.din}</Col>
                                    <Col span={4}>{item.sn}</Col>
                                    <Col span={6}>{item.warranty_remark}</Col>
                                    <Col span={4}>
                                        {
                                            new Date(item.warranty_at * 1000).getFullYear() + "/" +
                                            new Date(item.warranty_at * 1000).getMonth() + "/" +
                                            new Date(item.warranty_at * 1000).getDate()
                                        }
                                    </Col>
                                    <Col span={5} className="operation">
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

export default Warranty