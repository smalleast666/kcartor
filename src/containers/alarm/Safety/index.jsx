import React from 'react'
import axios from 'axios'

import { Row, Col, Spin, DatePicker, Button, Input, message, Popconfirm } from 'antd'

import ContentTitle from '../../../components/ContentTitle'

import "./index.scss"

const { RangePicker } = DatePicker

const dateFormat = 'YYYY-MM-DD'



class Alarms extends React.Component {
    constructor() {
        super()
        this.state = {
            alarmList: ""
        }
    }

    componentWillMount() {

        axios.post("/proxy/api", {
            method: "/din/alarm"
        }).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.data)
                this.setState({
                    alarmList: res.data.data
                })
                return
            }
            message.error(res.data.message);

        })
    }
    //删除列表中的数据
    delete = car_no => {

        axios.get("/proxy/api", {
            params: {
                method: "/din/alarm/delete/" + car_no
            }
        }).then(res => {

            if (res.data.status === 200) {
                this.getList()
                message.success("删除" + res.data.message);
                return
            }
            message.error(res.data.message);

        })
    }

    render() {
        return (
            <div className="logs">
                <ContentTitle text="车辆安防告警" />
                <div className="search">
                    <Input
                        style={{ width: "200px", marginRight: "15px", verticalAlign: "0px" }}
                        size="large"
                        placeholder="请输入您的车牌号"
                    />
                    <Input
                        style={{ width: "200px", marginRight: "15px", verticalAlign: "0px" }}
                        size="large"
                        placeholder="请输入主驾姓名"
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
                        <Col span={2}>车牌</Col>
                        {
                            this.state.alarmList.FID ?
                                <Col span={2}>公司</Col>
                                : null
                        }
                        <Col span={4}>车机</Col>
                        <Col span={2}>主驾姓名</Col>
                        <Col span={3}>号码</Col>
                        <Col span={4}>异常时间</Col>
                        <Col span={3}>异常状况</Col>
                        <Col span={2}>操作</Col>
                    </Row>
                    {
                        this.state.alarmList ?
                            this.state.alarmList.data.data.map(item =>
                                <Row key={item.car_no}>
                                    <Col span={2}>{item.car_no}</Col>
                                    <Col span={2}>{item.car_lincense}</Col>
                                    {
                                        this.state.alarmList.FID ?
                                            <Col span={2}>{item.nike_name}</Col>
                                            : null
                                    }
                                    <Col span={4}>{item.din}</Col>
                                    <Col span={2}>{item.driver_name}</Col>
                                    <Col span={3}>{item.driver_phone}</Col>
                                    <Col span={4}>
                                        {
                                            new Date(item.plug_at * 1000).getFullYear() + "/" +
                                            new Date(item.plug_at * 1000).getMonth() + "/" +
                                            new Date(item.plug_at * 1000).getDate()
                                        }
                                    </Col>
                                    <Col span={3}>{item.alarm_code}</Col>
                                    <Col span={2} className="operation">
                                        <Popconfirm
                                            title={
                                                <div>
                                                    您确定要删除
                                                <span
                                                        style={{
                                                            color: "red",
                                                            fontWeight: "bold"
                                                        }}
                                                    >
                                                        【{item.car_lincense}】
                                                </span>的记录吗？
                                            </div>
                                            }
                                            okText="立即删除"
                                            cancelText="暂不删除"
                                            placement="topRight"
                                            onConfirm={this.delete.bind(this, item.car_no)}
                                        >
                                            <span className="red" >删除</span>
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

export default Alarms