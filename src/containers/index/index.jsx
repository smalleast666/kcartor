

import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { Row, Col, message, Spin } from 'antd'
import { Doughnut, Bar } from 'react-chartjs-2';

//redux
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as index_act from "../../actions/index"
import { mapstate } from "../../reducers/data"

import { status } from './data'
import "./index.scss"

class Home extends React.Component {
    constructor () {
        super()
        this.state = {
            marginTop: 0,
            dynamicReminds: []
        }

    }
    componentDidMount () {
        this.refs.index.parentElement.style.background = "#f7f7f7";
    }
    componentWillMount () {
        
        
        axios.get("/proxy/api",{
            params: {
                method: "/admin/statistics" 
            }
        }).then(res => {

            if (res.data.status === 200) {
                this.props.act_index_data(res.data.data)
                this.newsAnimation()
                return
            }
            message.error(res.data.message)
        }).catch(err => 
            console.log(err)
        )
        
    }

    newsAnimation () {
        //列表滚动
        this.setState({
            dynamicReminds: this.props.red_index_data.dynamicReminds
        })
        
        var new_info = this.refs.new_info
        if (new_info.getElementsByTagName("div").length > 13) {
            var mt_num = 0
            this.timer = setInterval(() => {
                mt_num--
                this.setState({marginTop: mt_num})
                //创建节点
                var divElement = document.createElement('div');
                var spanElement = document.createElement('span');
                var linkElement = document.createElement('a');
                var spanText = document.createTextNode(this.state.dynamicReminds[Math.abs(mt_num)].msg);
                var linkText = document.createTextNode("查看详情");
                divElement.setAttribute('class', 'dynamicItem');
                linkElement.setAttribute('href', ''); //跳转路由
                spanElement.appendChild(spanText); 
                linkElement.appendChild(linkText);
                divElement.appendChild(spanElement); 
                divElement.appendChild(linkElement);
                
                if (Math.abs(mt_num) < 120) {
                    var div = new_info.getElementsByTagName(div)[Math.abs(mt_num)]
                    setTimeout(() => {
                        new_info.appendChild(divElement);
                    }, 600)
                } else {
                    mt_num = 0
                }
            }, 3000)
        }
    }

    componentWillUnmount () {
        this.refs.index.parentElement.style.background = "none";
        clearInterval(this.timer)
    }
    
    render() {
        status[0].num = this.props.red_index_data.carTotal || 0
        status[1].num = this.props.red_index_data.nobindDins || 0
        status[2].num = this.props.red_index_data.illegalTotal || 0
        status[3].num = this.props.red_index_data.remindTotal || 0
        
        const doughnutData = {
            labels: [
                '行驶中',
                '停留',
                '故障',
                '无网络'
            ],
            datasets: [{
                data: [
                    this.props.red_index_data.vehicleStatus ? this.props.red_index_data.vehicleStatus.travel : 0, 
                    this.props.red_index_data.vehicleStatus ? this.props.red_index_data.vehicleStatus.stop : 0, 
                    this.props.red_index_data.vehicleStatus ? this.props.red_index_data.vehicleStatus.fault : 0,
                    this.props.red_index_data.vehicleStatus ? this.props.red_index_data.vehicleStatus.noNetwork : 0
                ],
                backgroundColor: [
                    '#ffcc00',
                    '#0dda9e',
                    '#f54234',
                    '#556586'
                ]
            }]
        };
        const barData = {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            datasets: [
                {
                    label: '回收数量',
                    backgroundColor: '#d9dce5',
                    hoverBackgroundColor: '#e60012',
                    data: [5, 29, 18, 21, 16, 2 , 10, 20, 17, 12, 20, 15]
                }
            ]
        }
        
        return (
            <div className="index" ref="index">
                <Row className="status">
                    {
                        status.map(item => 
                            <Col span={6} key={item.iconBgColor}>
                                <Col>
                                    <Col span={10} className="icon" style={{background: item.iconBgColor}}>
                                        <img src={item.src} alt="icon"/>
                                    </Col>
                                    <Col span={14} className="text">
                                        <div style={{ height: "32px"}}>
                                            {
                                                this.props.red_index_data.carTotal ? item.num: <Spin style={{marginTop: "-8px"}}/>
                                            }
                                        </div>
                                        <div>{item.text}</div>
                                    </Col>
                                </Col>
                            </Col>
                        )
                    }
                </Row>
                <Row className="cntCenter">
                    <Col span={10}>
                        
                        <Col style={{ padding: "15px" }}>
                            <h2>车辆统计信息</h2>
                            {
                                this.props.red_index_data.vehicleStatus ? 
                                <Doughnut data={doughnutData} />
                                : <div style={{padding: "15px",textAlign: "center"}}><Spin /></div>
                            }
                        </Col>
                    </Col>
                    <Col span={14} className="dynamic">
                        <Col>
                            <Col className="dynamicTit">
                                车管家最新动态
                            </Col>
                            {
                                this.state.dynamicReminds ?
                                <div style={{height: "325px",overflow: "hidden"}}>
                                    <div style={{ transition: ".6s", marginTop: this.state.marginTop * 25 + "px" }} ref="new_info">
                                        {
                                            this.state.dynamicReminds.map( item => 
                                                <Col className="dynamicItem" key={item.url}>
                                                    <span>{item.msg}</span>
                                                    <Link to="">查看详情</Link>
                                                </Col>
                                            )
                                        }
                                    </div>
                                    
                                </div>
                                : <div style={{padding: "15px",textAlign: "center"}}><Spin /></div>
                            }
                        </Col>
                    </Col>
                </Row>
                <Row className="remindMsg">
                    <h2>车辆回收预警</h2>
                    <Bar 
                        data={barData}
                        height={54}
                    />
                </Row>
            </div>
        )
    }
}


// export default Home

function bindact(dispatch) {
    return bindActionCreators(index_act, dispatch)
}

export default connect(mapstate, bindact)(Home);