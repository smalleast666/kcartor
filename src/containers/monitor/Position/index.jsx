import React from 'react'
import axios from 'axios'

import { Row, Col, Button, Input, message, Spin } from 'antd'
import ContentTitle from '../../../components/ContentTitle'

import "./index.scss"

class Positions extends React.Component {
    constructor() {
        super()
        this.state = {
            positionList: ""
        }
    }

    componentWillMount() {
        this.getList()
    }

    getList = (car_lincense="", driver_name="", driver_phone="") => {
        axios.post("/proxy/api", {
            method: "/gps/position",
            car_lincense,
            driver_name,
            driver_phone
        }).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    positionList: res.data.data
                })
                return
            }
            message.error(res.data.message);

        })
    }
    search = () => {
        let car_lincense = document.getElementById("car_lincense").value
        let driver_name = document.getElementById("driver_name").value
        let driver_phone = document.getElementById("driver_phone").value
        this.getList(car_lincense, driver_name, driver_phone)
    }

    render() {
        return (
            <div className="logs">
                <ContentTitle text="位置信息" />
                <div className="search">
                    <Input
                        id="car_lincense"
                        style={{ width: "200px", marginRight: "15px", verticalAlign: "0px" }}
                        size="large"
                        placeholder="请输入您的车牌号"
                    />
                    <Input
                        id="driver_name"
                        style={{ width: "200px", marginRight: "15px", verticalAlign: "0px" }}
                        size="large"
                        placeholder="请输入主驾姓名"
                    />
                    <Input
                        id="driver_phone"
                        style={{ width: "200px", marginRight: "15px", verticalAlign: "0px" }}
                        size="large"
                        placeholder="请输入主驾电话"
                    />
                    <Button type="primary" size="large" style={{ marginRight: "15px" }} onClick={this.search}>查询</Button>
                    <Button type="primary" size="large">导出Excel</Button>
                </div>

                <Row>
                    <div className="listTable">
                        <Row>
                            <Col span={2}>公司</Col>
                            <Col span={2}>车牌号</Col>
                            <Col span={3}>主驾姓名</Col>
                            <Col span={3}>电话</Col>
                            <Col span={2}>最新上传时间</Col>
                            <Col span={2}>经度</Col>
                            <Col span={2}>纬度</Col>
                            <Col span={6}>最新上传地点</Col>
                            <Col span={2}>GPS速度</Col>
                        </Row>
                        {
                            this.state.positionList ?
                                this.state.positionList.data.map(item =>
                                    <Row key={item.car_no}>
                                        <Col span={2}>{item.nike_name}</Col>
                                        <Col span={2}>{item.car_lincense}</Col>
                                        <Col span={3}>{item.driver_name}</Col>
                                        <Col span={3}>{item.driver_phone}</Col>
                                        <Col span={2}>
                                            {
                                                item.kcarGps[0].length !== 0 ?
                                                    item.kcarGps[0].obd_at ? 
                                                        new Date(item.kcarGps[0].obd_at * 1000).getFullYear() + "/" +
                                                        new Date(item.kcarGps[0].obd_at * 1000).getMonth() + "/" +
                                                        new Date(item.kcarGps[0].obd_at * 1000).getDate()
                                                        : "--"
                                                    : "--"
                                            }
                                        </Col>
                                        <Col span={2}>
                                            {
                                                item.kcarGps[0].length !== 0 ?
                                                    item.kcarGps[0].gps_latitude ?
                                                        item.kcarGps[0].gps_latitude
                                                        : "--"
                                                    : "--"
                                            }
                                        </Col>
                                        <Col span={2}>
                                            {
                                                item.kcarGps[0].length !== 0 ?
                                                item.kcarGps[0].gps_longitude ?
                                                    item.kcarGps[0].gps_longitude
                                                    : '--'
                                                : "--"
                                            }
                                        </Col>
                                        <Col span={6}>
                                            {
                                                item.kcarGps[0].length !== 0 ?
                                                    item.kcarGps[0].address ?
                                                        item.kcarGps[0].address
                                                        : "--"
                                                    : "--"
                                            }
                                        </Col>
                                        <Col span={2}>
                                            {
                                                item.kcarGps[0].length !== 0 ?
                                                    item.kcarGps[0].gps_speed ?
                                                        item.kcarGps[0].gps_speed
                                                        : "--"
                                                    : "--"
                                            }
                                        </Col>
                                    </Row>
                                )
                                : <div style={{ textAlign: "center", padding: "50px" }}><Spin size="large" /></div>
                        }

                    </div>
                </Row>

            </div>
        )
    }
}

export default Positions