import React from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
// import { Motion, spring } from 'react-motion'

import { Row, Col, Spin, message, Popconfirm, Icon } from 'antd'

import ContentTitle from '../../../components/ContentTitle'

import "./index.scss"
import EditCom from './Edit'
import AddCom from './Add'


class Remind extends React.Component {
    constructor() {
        super()
        this.state = {
            setList: "",
            visible: false,
            addVisible: false
        }
    }

    componentWillMount() {
        this.getList()
    }
    getList = () => {
        axios.post("/proxy/api", {
            method: "/behavior/setting"
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
    //添加按钮
    add = () => {
        axios.get("/proxy/api", {
            params: {
                method: "/behavior/setting/add"
            }
        }).then(res => {

            if (res.data.status === 200) {
                this.setState({
                    addCompany: res.data.data.company,
                    addVisible: true
                })
                return
            }
            message.error(res.data.message);

        })
        
    }
    //添加的确认按钮
    addSureBtn = currentList => {
        currentList.method = "/behavior/setting/add"
        this.setState({ addConfirmLoading: true })
        
        axios.post("/proxy/api", currentList)
        .then(res => {
            if (res.data.status === 200) {
                this.setState({ 
                    addConfirmLoading: false,
                    addVisible: false 
                })
                this.getList()
                message.success(res.data.message);
                return
            }
            message.error(res.data.message);

        })

    }
    // 添加的取消按钮
    addCancelBtn = () => {
        this.setState({
            addVisible: false
        })
    }

    //编辑
    edit = item => {
        
        axios.get("/proxy/api", {
            params: {
                method: "/behavior/setting/edit/" + item.ber_no
            }
        }).then(res => {

            if (res.data.status === 200) {
                this.setState({
                    currentList: item,
                    company: res.data.data,
                    visible: true
                })
                //调用子组件方法
                this.refs.layerEdit.getCurrent()
                return
            }
            message.error(res.data.message);

        })
        
        
    }
    //编辑确定按钮
    sureBtn = currentList => {
        currentList.method = "/behavior/setting/edit"
        this.setState({ confirmLoading: true })

        axios.post("/proxy/api", currentList)
        .then(res => {
            
            if (res.data.status === 200) {
                this.setState({ 
                    confirmLoading: false,
                    visible: false 
                })
                this.getList()
                message.success("修改" + res.data.message);
                return
            }
            message.error(res.data.message);

        })
        
    }
    // 取消按钮
    cancelBtn = () => {
        this.setState({
            visible: false
        }) 
    }

    //更改状态
    statusFun = (ber_no, status) => {
        axios.get("/proxy/api", {
            params: {
                method: `/behavior/setting/setStatus/${ber_no}/${status}`
            }
        }).then(res => {

            if (res.data.status === 200) {
                this.getList()
                message.success("修改" + res.data.message);
                return
            }
            message.error(res.data.message);

        })
    }

    //删除列表中的数据
    delete = ber_no => {

        axios.get("/proxy/api", {
            params: {
                method: "/behavior/setting/delete/" + ber_no
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
            <div className="remind">
                <div className="title">
                    <ContentTitle text="驾驶行为提醒" />
                    <div className="add_icon" onClick={this.add.bind(this)}>
                        <Icon type="plus" style={{ fontSize: 28, color: '#fff', fontWeight: "bold" }} />
                    </div>
                </div>
                <div className="listTable">
                    <Row>
                        <Col span={2}>ID</Col>
                        {
                            typeof this.state.setList.company === "object" ?
                            <Col span={3}>公司</Col>
                            : null
                        }
                        <Col span={3}>事件提醒</Col>
                        <Col span={3}>单日提醒值</Col>
                        <Col span={5}>最新更新时间</Col>
                        <Col span={3}>状态</Col>
                        <Col span={5}>操作</Col>
                    </Row>
                    {
                        this.state.setList ?
                            this.state.setList.data.data.map(item =>
                                <Row key={item.ber_no}>
                                    <Col span={2}>{item.ber_no}</Col>
                                    {
                                        typeof this.state.setList.company === "object" ?
                                            <Col span={3}> { this.state.setList.company[item.firm_no].nike_name } </Col>
                                            : null
                                    }
                                    <Col span={3}>{item.ber_name}</Col>
                                    <Col span={3}>{item.remind}</Col>
                                    <Col span={5}>
                                        {
                                            new Date(item.updated_at * 1000).getFullYear() + "/" +
                                            new Date(item.updated_at * 1000).getMonth() + "/" +
                                            new Date(item.updated_at * 1000).getDate()
                                        }
                                    </Col>
                                    <Col span={3}>
                                        {
                                            item.status === 1 ? "开启" : "关闭"
                                        }
                                    </Col>
                                    
                                    <Col span={5} className="operation">
                                        <span className="blue" onClick={this.statusFun.bind(this, item.ber_no, item.status)}>
                                            {
                                                item.status === 1 ? "关闭" : "开启"
                                            }
                                        </span>
                                        <span className="green" onClick={this.edit.bind(this, item)}>编辑</span>
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
                                                        【{item.ber_name}】
                                                </span>的记录吗？
                                            </div>
                                            }
                                            okText="立即删除"
                                            cancelText="暂不删除"
                                            placement="topRight"
                                            onConfirm={this.delete.bind(this, item.ber_no)}
                                        >
                                            <span className="red" >删除</span>
                                        </Popconfirm>
                                    </Col>

                                </Row>
                            )
                            : <div style={{ textAlign: "center", padding: "50px" }}><Spin size="large" /></div>
                    }

                </div>

                {/* 编辑弹框 */}
                <EditCom 
                    currentList={this.state.currentList}
                    company={this.state.company}
                    visible={this.state.visible}
                    confirmLoading={this.state.confirmLoading}
                    sureBtn={this.sureBtn}
                    cancelBtn={this.cancelBtn}
                    ref="layerEdit"
                />
                <AddCom
                    company={this.state.addCompany}
                    visible={this.state.addVisible}
                    confirmLoading={this.state.addConfirmLoading}
                    sureBtn={this.addSureBtn.bind(this)}
                    cancelBtn={this.addCancelBtn}
                />
               
            </div>
        )
    }
}

export default Remind