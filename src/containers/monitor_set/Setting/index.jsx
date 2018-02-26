import React from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
// import { Motion, spring } from 'react-motion'

import { Row, Col, Spin, message, Popconfirm, Icon } from 'antd'

import ContentTitle from '../../../components/ContentTitle'
import Layer from './Lbs'

import "./index.scss"



class Setting extends React.Component {
    constructor() {
        super()
        this.state = {
            setList: "",
            layer: false
        }
    }

    componentWillMount() {

        axios.post("/proxy/api", {
            method: "/geofence/setting"
        }).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    setList: res.data.data
                })
                return
            }
            message.error(res.data.message);

        })
    }
    
    // 展开lbs组件
    openLbs = () => {
        this.setState({ layer: true })
    }
    close = () => {
        this.setState({
            layer: false
        })
    }

    //删除列表中的数据
    delete = car_no => {

        axios.get("/proxy/api", {
            params: {
                method: "/vehicle/driving/delete/" + car_no
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
            <div className="setting">
                <div className="title">
                    <ContentTitle text="电子围栏" />
                    <div className="add_icon" onClick={this.openLbs}>
                        <Icon type="plus" style={{ fontSize: 28, color: '#fff', fontWeight: "bold" }} />
                    </div>
                </div>
                <div className="listTable">
                    <Row>
                        <Col span={1}>ID</Col>
                        <Col span={3}>栅栏名称</Col>
                        <Col span={2}>提醒设置</Col>
                        <Col span={2}>触发方式</Col>
                        <Col span={2}>监控车辆</Col>
                        <Col span={3}>监控时间</Col>
                        <Col span={2}>是否开启</Col>
                        <Col span={5}>创建时间</Col>
                        <Col span={4}>操作</Col>
                    </Row>
                    {
                        this.state.setList ?
                            this.state.setList.data.map(item =>
                                <Row key={item.fence_no}>
                                    <Col span={1}>{item.fence_no}</Col>
                                    <Col span={3}>{item.fence_name}</Col>
                                    <Col span={2}>{item.remaid_set === 1 ? "每次提醒" : "只提醒一次"}</Col>
                                    <Col span={2}>{item.fence_type === 1 ? "驶入触发" : "使出触发"}</Col>
                                    <Col span={2}>
                                        {item.fence_car + "监控车辆"}
                                        
                                    </Col>
                                    <Col span={3}>
                                        {
                                            item.fence_start_at + "-" + item.fence_end_at
                                        }
                                    </Col>
                                    <Col span={2}>
                                        {
                                            item.status === 1 ? "开启" : "关闭"
                                        }
                                    </Col>
                                    <Col span={5}>
                                        {
                                            new Date(item.created_at * 1000).getFullYear() + "/" +
                                            new Date(item.created_at * 1000).getMonth() + "/" +
                                            new Date(item.created_at * 1000).getDate()
                                        }
                                    </Col>
                                    <Col span={4} className="operation">
                                        <span className="blue">关闭</span>
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
                                                    【{item.fence_name}】
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
                            : <div className="loading"><Spin size="large" /></div>
                    }

                </div>
                {
                    this.state.layer ? 
                    // <Motion defaultStyle={{ x: 0 }} style={{ x: spring(10) }}>
                    //     <Layer close={this.close} /> 
                    // </Motion>
                        <Layer close={this.close} />
                    : null
                }
            </div>
        )
    }
}

export default Setting