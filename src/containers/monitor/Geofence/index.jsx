import React from 'react'
import axios from 'axios'

import { Row, Col, Spin, DatePicker, Button, message, Select } from 'antd'
import ContentTitle from '../../../components/ContentTitle'

import "./index.scss"
const Option = Select.Option;
const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD'



class Geofence extends React.Component {
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

    handleChange = () => {

    }

    render() {
        return (
            <div className="Geofence">
                <ContentTitle text="电子围栏提醒" />
                <div className="search">
                    <Select defaultValue="请选定围栏事件" size="large" style={{ width: "200px", marginRight: "15px" }} onChange={this.handleChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>

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

export default Geofence