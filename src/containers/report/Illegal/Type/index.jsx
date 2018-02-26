import React from 'react'
import axios from 'axios'

import { Row, Col, Spin, DatePicker, Button, Input, message } from 'antd'

import ContentTitle from '../../../../components/ContentTitle'

const { RangePicker } = DatePicker

const dateFormat = 'YYYY-MM-DD'



class Log extends React.Component {
    constructor() {
        super()
        this.state = {
            logList: ""
        }
    }

    componentWillMount() {

        axios.post("/proxy/api", {
            method: "/admin/log"
        }).then(res => {
            if (res.data.status === 200) {

                this.setState({
                    logList: res.data.data
                })
                return
            }
            message.error(res.data.message);

        })
    }

    render() {
        return (
            <div className="logs">
                <ContentTitle text="违章类型统计" />
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
                        <Col span={7}>用户名</Col>
                        <Col span={7}>操作时间</Col>
                        <Col span={10}>操作详情</Col>
                    </Row>
                    {
                        this.state.logList ?
                            this.state.logList.logs.data.map(item =>
                                <Row key={item._id}>
                                    <Col span={7}>{item.username}</Col>
                                    <Col span={7}>
                                        {
                                            new Date(item.created_at * 1000).getFullYear() + "/" +
                                            new Date(item.created_at * 1000).getMonth() + "/" +
                                            new Date(item.created_at * 1000).getDate()
                                        }
                                    </Col>
                                    <Col span={10} className="operation">{item.msg}</Col>
                                </Row>
                            )
                            : <div style={{ textAlign: "center", padding: "50px" }}><Spin size="large" /></div>
                    }

                </div>

            </div>
        )
    }
}

export default Log