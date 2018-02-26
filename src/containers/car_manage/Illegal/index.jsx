import React from 'react'
import axios from 'axios'

import { Row, Col, Spin, DatePicker, Button, Input, message } from 'antd'
import ContentTitle from '../../../components/ContentTitle'

import "./index.scss"
const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD'



class Illegal extends React.Component {
    constructor() {
        super()
        this.state = {
            IllegalList: ""
        }
    }

    componentWillMount() {

        axios.post("/proxy/api", {
            method: "/vehicle/illegal"
        }).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    IllegalList: res.data.data
                })
                return
            }
            message.error(res.data.message);

        })
    }

    render() {
        return (
            <div className="Remind">
                <ContentTitle text="车辆违规" />
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
                        <Col span={3}>ID</Col>
                        <Col span={4}>车牌</Col>
                        <Col span={5}>违规时间</Col>
                        <Col span={5}>接收时间</Col>
                        <Col span={7}>违章详情</Col>
                    </Row>
                    {
                        this.state.IllegalList ?
                            this.state.IllegalList.data.map(item =>
                                <Row key={item.msg_id}>
                                    <Col span={3}>{item.msg_id}</Col>
                                    <Col span={4}>{item.number_plate}</Col>
                                    <Col span={5}>{item.occur_date}</Col>
                                    <Col span={5}>
                                        {
                                            new Date(item.create_time * 1000).getFullYear() + "/" +
                                            new Date(item.create_time * 1000).getMonth() + "/" +
                                            new Date(item.create_time * 1000).getDate()
                                        }
                                    </Col>
                                    <Col span={7}>{item.content}</Col>
                                </Row>
                            )
                            : <div style={{ textAlign: "center", padding: "50px" }}><Spin size="large" /></div>
                    }

                </div>

            </div>
        )
    }
}

export default Illegal