import React from 'react'
import { Row, Col, message, Spin, Pagination, Popconfirm } from 'antd';

import axios from 'axios'

//redux
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as index_act from "../../../actions/index";
import { mapstate } from "../../../reducers/data"

import "./index.scss"

import ContentTitle from '../../../components/ContentTitle'
import { Button, Input } from 'antd'


class Assembly extends React.Component {
    constructor() {
        super()
        this.state = {
            fileName: "",
            list: [],
        }
    }
    componentDidMount () {
        this.getList()
        
    }
    getList () {
        //获取列表数据
        axios.post("/proxy/api", {
            method: "/vehicle/manage"
        }).then(res => {
            if (res.data.status === 200) {
                this.props.act_car_list(res.data.data);
                return
            }
            message.error(res.data.message);

        }).catch(err =>
            message.error(err)
            )
    }

    fileFun (e) {
        let arr = e.target.value.split("\\");
        this.setState({
            fileName: arr[arr.length - 1]
        })
        
    }
    //跳页事件
    changeFun (page, pageSize) {
        axios.post("/proxy/api",{
            method: "/vehicle/manage",
            page: page
        }).then(res => {
        
            if (res.data.status === 200) {
                this.props.act_car_list(res.data.data);
                return
            }
            message.error(res.data.message);
            
        })
    }

    //删除列表中的数据
    delete_car = car_no => {
        
        axios.get("/proxy/api", {
            params: {
                method: "/vehicle/manage/delete/" + car_no
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
            <div className="manage">
                <ContentTitle text="车辆列表"/>
                <div className="action-bar flex-md">
                    <div className="query">
                        <Input
                            className="mt15"
                            style={{ width: "200px", verticalAlign: 0 }}
                            size="large"
                            placeholder="请输入您的车牌号"
                        />
                        <Button className="mt15" type="primary" size="large">查询</Button>
                        <Button type="primary" size="large">导出excel</Button>
                    </div>
                    <div className="up-file">
                        <div className="up-style">
                            <input type="file" onChange={this.fileFun.bind(this)} ref="fileName" />
                            {
                                this.state.fileName 
                                ? this.state.fileName 
                                : "请选择上传文件"
                            }
                        </div>
                        <Button type="primary" size="large">导入</Button>
                        
                    </div>
                </div>
                <div className="addcar">
                    <Button type="primary" size="large">添加车辆</Button>
                </div>
                <div className="listTable">
                    <Row>
                        <Col span={2}>ID</Col>
                        <Col span={3}>车牌</Col>
                        <Col span={3}>主驾姓名</Col>
                        <Col span={3}>号码</Col>
                        <Col span={2}>公司</Col>
                        <Col span={5}>添加时间</Col>
                        <Col span={6}>操作</Col>
                    </Row>
                    {
                        this.props.red_car_list.data ? 
                        this.props.red_car_list.data.map( item => 
                            <Row key={item.car_no}>
                                <Col span={2}>{item.car_no}</Col>
                                <Col span={3}>{item.car_lincense}</Col>
                                <Col span={3}>{item.driver_name}</Col>
                                <Col span={3}>{item.driver_phone}</Col>
                                <Col span={2}>{item.nike_name}</Col>
                                <Col span={5}>
                                    { 
                                        new Date(item.created_at * 1000).getFullYear() + "/" + 
                                        new Date(item.created_at * 1000).getMonth() + "/" + 
                                        new Date(item.created_at * 1000).getDate()
                                    }
                                </Col>
                                <Col span={6} className="operation">
                                    <span className="blue">编辑</span>
                                    <span className="green">详情</span>
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
                                                </span>吗？
                                            </div>
                                        }
                                        okText="立即删除"
                                        cancelText="暂不删除"
                                        placement="topRight"
                                        onConfirm={this.delete_car.bind(this, item.car_no)}
                                    >
                                        <span className="red">删除</span>
                                    </Popconfirm>
                                </Col>
                            </Row>
                        )
                        : <div style={{ textAlign: "center", padding: "50px"}}><Spin size="large" /></div>
                    }
                    
                </div>
                {
                    this.props.red_car_list ? 
                    <Pagination 
                        style={{paddingTop: "20px"}} 
                        pageSize={ this.props.red_car_list.per_page || 20 } 
                        total={ this.props.red_car_list.total || 1 } 
                        onChange={this.changeFun.bind(this)} 
                        defaultCurrent={this.props.red_car_list.current_page || 1} 
                        hideOnSinglePage 
                        showQuickJumper
                    />
                    : message.error("数据错误")
                }
                
            </div>
        )
    }
}

// export default Assembly

function bindact(dispatch) {
    return bindActionCreators(index_act, dispatch)
}

export default connect(mapstate, bindact)(Assembly);
