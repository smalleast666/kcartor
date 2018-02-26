import React from 'react'
import axios from 'axios'

import { Row, Col, Spin, DatePicker, Button, Input, message } from 'antd'
import ContentTitle from '../../../components/ContentTitle'

import "./index.scss"
const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD'



class Detect extends React.Component {
    constructor() {
        super()
        this.state = {
            detectList: ""
        }
    }

    componentWillMount() {

        axios.post("/proxy/api", {
            method: "/vehicle/detect"
        }).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    detectList: res.data.data
                })
                return
            }
            message.error(res.data.message);

        })
    }

    render() {
        return (
            <div className="Detect">
                <ContentTitle text="车辆检测" />
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

                    <RangePicker
                        style={{ marginRight: "15px" }}
                        size="large"
                        format={dateFormat}
                    />
                    <Button type="primary" size="large">查询</Button>
                </div>

                <div className="listTable">
                    <Row>
                        <Col span={2}>ID</Col>
                        <Col span={3}>车牌</Col>
                        {
                            this.state.detectList.FID ?
                                <Col span={3}>公司</Col>
                                : null
                        }
                        <Col span={4}>车机ID</Col>
                        <Col span={4}>检测时间</Col>
                        <Col span={8}>故障</Col>
                    </Row>
                    {
                        this.state.detectList ?
                            this.state.detectList.data.map(item =>
                                <Row key={item.fault_no}>
                                    <Col span={2}>{item.fault_no}</Col>
                                    <Col span={3}>{item.car_lincense}</Col>
                                    {
                                        this.state.detectList.FID ?
                                            <Col span={3}>{item.nike_name}</Col>
                                            : null
                                    }
                                    <Col span={4}>{item.din}</Col>
                                    <Col span={4}>{item.fault_at}</Col>
                                    <Col span={8}>{item.fault.length ? item.fault[0].dtcName : "暂无故障"}</Col>
                                    
                                </Row>
                            )
                            : <div style={{ textAlign: "center", padding: "50px" }}><Spin size="large" /></div>
                    }

                </div>

            </div>
        )
    }
}

export default Detect