import React from 'react'
import axios from 'axios'

import { Row, Col, Spin, DatePicker, Button, Input, message } from 'antd'
import ContentTitle from '../../../components/ContentTitle'

import "./index.scss"
const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD'



class Behavior extends React.Component {
    constructor() {
        super()
        this.state = {
            behaviorList: ""
        }
    }

    componentWillMount() {

        axios.post("/proxy/api", {
            method: "/driving/behavior"
        }).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    behaviorList: res.data.data
                })
                return
            }
            message.error(res.data.message);

        })
    }

    render() {
        return (
            <div className="logs">
                <ContentTitle text="驾驶行为" />
                <div className="search">
                    <Input
                        style={{ width: "200px", marginRight: "15px", verticalAlign: "0px" }}
                        size="large"
                        placeholder="请输入您的车牌号"
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
                        <Col span={4}>ID</Col>
                        <Col span={5}>车牌</Col>
                        {/* {
                            this.state.behaviorList.FID ?
                                <Col span={3}>公司</Col>
                                : null
                        } */}
                        <Col span={5}>急加速</Col>
                        <Col span={5}>急减速</Col>
                        <Col span={5}>急转弯</Col>
                    </Row>
                    {
                        this.state.behaviorList ?
                            this.state.behaviorList.data.map(item =>
                                <Row key={item.car_no}>
                                    <Col span={4}>{item.car_no}</Col>
                                    <Col span={5}>{item.car_lincense}</Col>
                                    {/* {
                                        this.state.behaviorList.FID ?
                                            <Col span={3}>{item.nike_name}</Col>
                                            : null
                                    } */}
                                    <Col span={5}>{item.statistics.accelerate}</Col>
                                    <Col span={5}>{item.statistics.retard}</Col>
                                    <Col span={5}>{item.statistics.turn}</Col>

                                </Row>
                            )
                            : <div style={{ textAlign: "center", padding: "50px" }}><Spin size="large" /></div>
                    }

                </div>

            </div>
        )
    }
}

export default Behavior