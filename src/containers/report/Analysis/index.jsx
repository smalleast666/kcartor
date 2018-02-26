import React from 'react'
import axios from 'axios'

import { Bar } from 'react-chartjs-2'
import { Row, Col, Input, Button, DatePicker, message } from 'antd'

import ContentTitle from '../../../components/ContentTitle'

import "./index.scss"

const { RangePicker } = DatePicker

const dateFormat = 'YYYY-MM-DD'


class Analysis extends React.Component {
    constructor() {
        super()
        this.state = {
            argvData: ""
        }
    }

    componentWillMount() {
        this.getListFun()
    }

    getListFun = (car_lincense = "", stime = "", etime = "") => {
        axios.post("/proxy/api", {
            method: "/behavior/analysis",
            car_lincense: car_lincense,
            stime: stime,
            etime: etime
        }).then(res => {

            if (res.data.status === 200) {
                this.setState({
                    argvData: res.data.data
                })
                if ( res.data.data === 0 ) {
                    message.warning("没有结果")
                }

                return
            }
            message.error(res.data.message);

        })
    }

    changeFun = (page, pageSize) => {
        this.getListFun(page)
    }

    search = () => {
        //搜索
        let value = document.getElementsByName("nike_name")[0].value
        this.getListFun(1, value)

    }

    render() {
        var data = []
        var x
        for ( x in this.state.argvData.argv) {
            data.push(this.state.argvData.argv[x])
        }
        const barData = {
            labels: ['急转弯', '急加速', '急减速'],
            datasets: [
                {
                    label: '次数',
                    backgroundColor: '#d9dce5',
                    hoverBackgroundColor: '#e60012',
                    data: data
                }
            ]
        }

        return (
            <div className="logs">
                <ContentTitle text="驾驶行为分析" />
                <div className="search">
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
                </div>

                <Row>
                    <Col span={4}></Col>
                    <Col span={16}>
                        <h2 style={{ fontSize: "18px" }}>驾驶行为分析</h2>
                        <Bar
                            data={barData}
                            height={140}
                        />
                    </Col>
                    <Col span={4}></Col>
                </Row>


            </div>
        )
    }
}

export default Analysis