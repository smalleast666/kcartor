import React from 'react'
import axios from 'axios'
import { Row, Col, message, Input, Button, Pagination } from 'antd'
import { Map, Marker } from 'react-amap'
import { Checkbox } from 'antd'

//redux
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as index_act from "../../../actions/index";
import { mapstate } from "../../../reducers/data"

import { GDMap } from '../../../config/GDMap'
import ContentTitle from '../../../components/ContentTitle'
import "./index.scss"

class GPS extends React.Component {

    constructor () {
        super()
        this.state = {
            count: {},
            data: [],
            car_list: []
        }
    }

    componentWillMount () {

        axios.get("/proxy/api", {
            params: {
                method: "/monitor/gps/cars",
                page: 1
            }
        }).then(res => {
            if (res.data.status === 200) {
                var car_list = []
                for (let i = 0; i < 34; i++) {
                    car_list.push(res.data.data.data[i])
                }
                this.props.act_GPS_car_list(car_list);
                this.setState({
                    count: res.data.data.count,
                    data: res.data.data.data,
                })
                return
            }
            message.error(res.data.message)
        }).catch(err =>
            console.log(err)
        )
    }
    onChange = (page, pageSize) => {
        let car_list = []
        for (let i = (page - 1) * 34; i < page * 34; i++) {
            car_list.push(this.state.data[i])
        }
        this.props.act_GPS_car_list(car_list)
    }
    car_item = car_no => {
        console.log(car_no)
    }

    render() {
        const checkList = [
            { id: 1, text: "驾驶：", color: "#FFBC4B", num: this.state.count.total - this.state.count.stop - this.state.count.abnormal - this.state.count.noNetwork - this.state.count.fault || 0 }, 
            { id: 2, text: "停留：", color: "#31A587", num: this.state.count.stop || 0 }, 
            { id: 3, text: "故障：", color: "#496DA6", num: this.state.count.fault  || 0 }, 
            { id: 4, text: "无网络：", color: "#6C8B94", num: this.state.count.noNetwork || 0 },
            { id: 5, text: "异常：", color: "#9A9CCA", num: this.state.count.abnormal || 0 }
        ]
        
        return (
            <div className="GPS">
                <ContentTitle text="GPS监控" />
                <div className="GPSState">
                    {
                        checkList.map(item =>
                            <Checkbox key={item.id}>
                                {item.text}<span className="color" style={{ background: item.color }}></span>{item.num}
                            </Checkbox>
                        )
                    }
                </div>
                <Row className="GPS_cnt">
                    <Col span={20} className="GPSMap">
                        <Map
                            amapkey={GDMap.KEY}
                            version={GDMap.VERSION}
                            zoom={12}
                            center={{ longitude: 106.5507300000, latitude: 29.5647100000 }}
                            plugin={['AMap.RectangleEditor']}
                        >
                        {
                            this.state.data.length !== 0 ?
                            this.state.data.map( item => 
                                <Marker
                                    key={item.car_no}
                                    position={{longitude: item.lat, latitude: item.long }}
                                    icon={require('../../../images/' + item.state)}
                                    angle={item.heading}
                                >
                                </Marker>
                            )
                            : undefined
                        }
                        </Map>  
                    </Col>
                    <Col span={4}>
                        <Col span={4}></Col>
                        <Col span={16} className="car_list">
                            <div className="clearfix">
                                <Col span={17}><Input placeholder="请输入车牌号" /></Col>
                                <Col span={1}></Col>
                                <Col span={6}><Button type="primary" icon="search">查询</Button></Col>
                            </div>
                            <div>
                                {
                                    this.props.red_GPS_car_list ?
                                        this.props.red_GPS_car_list.map((item, index) => 
                                            <div className="car-item" key={item.car_no} onClick={this.car_item.bind(this, item.car_no)}>
                                                <img src={require('../../../images/' + item.state)} alt="car-ico" />
                                                <span>{item.car_lincense}</span>
                                            </div>
                                        )
                                        : undefined
                                }
                                {
                                    this.state.data.length ? 
                                    <Pagination simple pageSize={34} total={this.state.data.length} onChange={this.onChange} />
                                    : undefined
                                }
                            </div>
                        </Col>
                        <Col span={4}></Col>
                    </Col>
                </Row>
            </div>
        )
    }
}

function bindact(dispatch) {
    return bindActionCreators(index_act, dispatch)
}

export default connect(mapstate, bindact)(GPS);