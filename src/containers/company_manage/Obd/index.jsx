import React from 'react'
import axios from 'axios'

import { Row, Col, Spin, Button, Input, message, Pagination, Popconfirm } from 'antd';

import ContentTitle from '../../../components/ContentTitle'

import "./index.scss"

class Obd extends React.Component {
    constructor() {
        super()
        this.state = {
            obdList: ""
        }
    }

    componentWillMount() {
        this.getListFun()
    }

    getListFun = (page = 1, nike_name = "") => {
        axios.post("/proxy/api", {
            method: "/obd/firm",
            page: page,
            nike_name: nike_name
        }).then(res => {
            
            if (res.data.status === 200) {
                this.setState({
                    obdList: res.data.data
                })
                if (res.data.data.data.length === 0) {
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

    delete = firm_no => {
        //删除公司
        axios.get("/proxy/api", {
            params: {
                method: "/obd/firm/delete/" + firm_no
            }
        }).then(res => {
            if (res.data.status === 200) {
                this.getListFun()
                message.success("删除" + res.data.message);
                return
            }
            message.error(res.data.message);

        })

    }


    render() {
        return (
            <div className="logs">
                <ContentTitle text="OBD公司列表" />
                <div className="search">
                    <Input
                        name="nike_name"
                        type="text"
                        style={{ width: "200px", marginRight: "15px", verticalAlign: 0 }}
                        size="large"
                        placeholder="请输入公司别名"
                    />

                    <Button type="primary" size="large" onClick={this.search}>查询</Button>
                </div>

                <div className="listTable">
                    <Row>
                        <Col span={2}>ID</Col>
                        <Col span={4}>别名</Col>
                        <Col span={6}>名称</Col>
                        <Col span={3}>电话</Col>
                        <Col span={3}>添加时间</Col>
                        <Col span={3}>是否启用</Col>
                        <Col span={3}>操作</Col>
                    </Row>
                    {
                        this.state.obdList ?
                            this.state.obdList.data.length !== 0 ?
                                this.state.obdList.data.map(item =>
                                    <Row key={item.obdfirm_no}>
                                        <Col span={2}>{item.obdfirm_no}</Col>
                                        <Col span={4}>{item.nike_name}</Col>
                                        <Col span={6}>{item.firm_name}</Col>
                                        <Col span={3}>{item.phone}</Col>
                                        <Col span={3}>
                                            {
                                                new Date(item.created_at * 1000).getFullYear() + "/" +
                                                new Date(item.created_at * 1000).getMonth() + "/" +
                                                new Date(item.created_at * 1000).getDate()
                                            }
                                        </Col>
                                        <Col span={3}>{item.status ? "是" : "否"}</Col>
                                        <Col span={3} className="operation">
                                            <span className="blue">编辑</span>
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
                                                        【{item.firm_name}】
                                                        </span>OBD公司吗？
                                                    </div>
                                                }
                                                okText="立即删除"
                                                cancelText="暂不删除"
                                                placement="topRight"
                                                onConfirm={this.delete.bind(this, item.firm_no)}
                                            >
                                                <span className="red">删除</span>
                                            </Popconfirm>
                                        </Col>
                                    </Row>
                                )
                                : <div style={{ textAlign: "center", padding: "15px 0" }}>没有结果</div>
                            : <div style={{ textAlign: "center", padding: "50px" }}><Spin size="large" /></div>
                    }
                </div>
                {
                    this.state.obdList.per_page > 1 ?
                        <Pagination
                            style={{ paddingTop: "20px" }}
                            pageSize={this.state.obdList.per_page || 20}
                            total={this.state.obdList.total || 1}
                            onChange={this.changeFun}
                            defaultCurrent={this.state.obdList.current_page || 1}
                            hideOnSinglePage
                            showQuickJumper
                        />
                        : null
                }

            </div>
        )
    }
}

export default Obd