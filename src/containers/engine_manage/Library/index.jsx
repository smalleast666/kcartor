import React from 'react'
import axios from 'axios'

import { Row, Col, Spin, DatePicker, Button, Input, message, Popconfirm  } from 'antd'
import ContentTitle from '../../../components/ContentTitle'

import "./index.scss"



class Library extends React.Component {
    constructor() {
        super()
        this.state = {
            LibraryList: ""
        }
    }

    componentWillMount() {

        axios.post("/proxy/api", {
            method: "/din/library"
        }).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    LibraryList: res.data.data
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
        switch (this.state.LibraryList.data[index].status) {
            case 1: return "绑定"
            case 2: return "解绑"
            case 3: return "保修"
            case 4: return "报废"
            case 5: return "遗失"
            default: return "无法识别"
        }
    }
    statusBind = index => {
        switch (this.state.LibraryList.data[index].status) {
            case 1: return <span className="red" >解除绑定</span>
            case 2: return <span className="blue" onClick={"弹框"}>绑定车牌</span>
            default: return null
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
                        <Col span={2}>ID</Col>
                        <Col span={2}>车牌</Col>
                        <Col span={3}>公司</Col>
                        <Col span={3}>车机</Col>
                        <Col span={2}>SN码</Col>
                        <Col span={2}>厂商</Col>
                        <Col span={4}>入库时间</Col>
                        <Col span={2}>状态</Col>
                        <Col span={4}>操作</Col>
                    </Row>
                    {
                        this.state.LibraryList ?
                            this.state.LibraryList.data.map((item, index) =>
                                <Row key={item.din_no}>
                                    <Col span={2}>{item.din_no}</Col>
                                    <Col span={2}>{item.car_lincense}</Col>
                                    <Col span={3}>{item.nike_name}</Col>
                                    <Col span={3}>{item.din}</Col>
                                    <Col span={2}>{item.sn}</Col>
                                    <Col span={2}>{item.obdfirm_name}</Col>
                                    <Col span={4}>
                                        {
                                            new Date(item.created_at * 1000).getFullYear() + "/" +
                                            new Date(item.created_at * 1000).getMonth() + "/" +
                                            new Date(item.created_at * 1000).getDate()
                                        }
                                    </Col>
                                    <Col span={2}>{this.statusFun(index)}</Col>
                                    <Col span={4} className="operation">
                                        <span className="green">使用记录</span>{this.statusBind(index)? console.log(this.statusBind(index).props.children): null}
                                        {
                                            this.statusBind(index) ?
                                                this.statusBind(index).props.children === "解除绑定" ?
                                                    <Popconfirm
                                                        title={
                                                            <div>
                                                                您确定要解除
                                                            <span
                                                                    style={{
                                                                        color: "red",
                                                                        fontWeight: "bold"
                                                                    }}
                                                                >
                                                                    【{item.din}】
                                                            </span>的绑定吗？
                                                        </div>
                                                        }
                                                        okText="立即解除"
                                                        cancelText="暂不解除"
                                                        placement="topRight"
                                                        onConfirm={this.sure.bind(this, item.car_no, index)}
                                                    >
                                                    {this.statusBind(index)}
                                                    </Popconfirm>
                                                : this.statusBind(index) 
                                            : this.statusBind(index) 
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

export default Library