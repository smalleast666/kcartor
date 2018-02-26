import React from 'react'
import axios from 'axios'

import { Row, Col, Spin, DatePicker, Button, Input, message } from 'antd'
import ContentTitle from '../../../components/ContentTitle'

import "./index.scss"
const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD'


class Remind extends React.Component {
    constructor() {
        super()
        this.state = {
            RemindList: ""
        }
    }

    componentWillMount() {

        axios.post("/proxy/api", {
            method: "/behavior/remind"
        }).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    RemindList: res.data.data
                })
                return
            }
            message.error(res.data.message);

        })
    }

    render() {
        return (
            <div className="Remind">
                <ContentTitle text="驾驶行为提醒" />
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
                    <Button type="primary" size="large" style={{ marginRight: "15px" }}>查询</Button>
                    <Button type="primary" size="large">导出Excel</Button>
                </div>

                <div className="listTable">
                    <Row>
                        <Col span={4}>ID</Col>
                        <Col span={6}>车牌</Col>
                        <Col span={14}>记录时间</Col>
                    </Row>
                    {
                        this.state.RemindList ?
                            this.state.RemindList.data.data.map(item =>
                                <Row key={item.beremind_no}>
                                    <Col span={2}>{item.beremind_no}</Col>
                                    <Col span={3}>{item.car_lincense}</Col>
                                    <Col span={14}>
                                        {
                                            new Date(item.updated_at * 1000).getFullYear() + "/" +
                                            new Date(item.updated_at * 1000).getMonth() + "/" +
                                            new Date(item.updated_at * 1000).getDate()
                                        }
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

export default Remind