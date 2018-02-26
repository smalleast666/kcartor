import React from 'react'
import axios from 'axios'

import { Row, Col, Spin, DatePicker, Button, Input, message, Popconfirm, Tooltip } from 'antd'
import ContentTitle from '../../../components/ContentTitle'

import "./index.scss"



class Scrap extends React.Component {
    constructor() {
        super()
        this.state = {
            ScrapList: ""
        }
    }

    componentWillMount() {

        axios.post("/proxy/api", {
            method: "/din/scrap"
        }).then(res => {
            
            if (res.data.status === 200) {
                this.setState({
                    ScrapList: res.data.data
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
    statusFun = index => {
        switch (this.state.ScrapList.data[index].status) {
            case 1: return "绑定"
            case 2: return "解绑"
            case 3: return "保修"
            case 4: return "报废"
            case 5: return "遗失"
            default: return "无法识别"
        }
    }

    render() {
        return (
            <div className="Detect">
                <ContentTitle text="车机库表" />
                <div className="search">

                    <Input
                        style={{ width: "200px", marginRight: "15px", verticalAlign: "0px" }}
                        size="large"
                        placeholder="请输入您的车机"
                    />
                    <Input
                        style={{ width: "200px", marginRight: "15px", verticalAlign: "0px" }}
                        size="large"
                        placeholder="请输入您的车牌号"
                    />
                    <DatePicker
                        style={{ width: "200px", marginRight: "15px", verticalAlign: "0px" }}
                        size="large"
                        onChange={this.changeTime}
                    />
                    <Button
                        style={{ marginRight: "15px", verticalAlign: "0px" }}
                        type="primary"
                        size="large"
                    >查询</Button>
                    <Button type="primary" size="large">导出Excel</Button>
                </div>

                <div className="listTable">
                    <Row>
                        <Col span={1}>ID</Col>
                        <Col span={2}>车机</Col>
                        <Col span={2}>车机状态</Col>
                        <Col span={2}>报废时间</Col>
                        <Col span={5}>备注</Col>
                        <Col span={2}>报废付款时间</Col>
                        <Col span={2}>付款金额</Col>
                        <Col span={2}>付款人</Col>
                        <Col span={3}>未缴纳款项说明</Col>
                        <Col span={2}>操作</Col>
                    </Row>
                    {
                        this.state.ScrapList ?
                            this.state.ScrapList.data.map((item, index) =>
                                <Row key={item.din_no}>
                                    <Col span={1}>{item.din_no}</Col>
                                    <Col span={2}>{item.din}</Col>
                                    <Col span={2}>{this.statusFun(index)}</Col>
                                    <Col span={2}>
                                        {
                                            new Date(item.scrap_at * 1000).getFullYear() + "/" +
                                            new Date(item.scrap_at * 1000).getMonth() + "/" +
                                            new Date(item.scrap_at * 1000).getDate()
                                        }
                                    </Col>
                                    <Tooltip placement="bottomLeft" title={item.scrap_remark}>
                                        <Col span={5} className="ellipsis">{item.scrap_remark}</Col>
                                    </Tooltip>
                                    
                                    <Col span={2}>
                                        {
                                            new Date(item.scrap_pay_at * 1000).getFullYear() + "/" +
                                            new Date(item.scrap_pay_at * 1000).getMonth() + "/" +
                                            new Date(item.scrap_pay_at * 1000).getDate()
                                        }
                                    </Col>
                                    <Col span={2}>{item.scrap_pay_money}</Col>
                                    <Col span={2}>{item.scrap_pay_name}</Col>
                                    <Col span={3}>{item.scrap_nopay_remark}</Col>
                                    <Col span={2} className="operation">
                                        <span className="green">编辑</span>
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
                                                        【{item.din}】
                                                </span>吗？
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

export default Scrap