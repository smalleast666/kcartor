import React from 'react'
// import axios from 'axios'

import { DatePicker, Button, Input } from 'antd'
import { Map } from 'react-amap'
import ContentTitle from '../../../components/ContentTitle'

import { GDMap } from '../../../config/GDMap'
import "./index.scss"
const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD'



class PlayBlock extends React.Component {
    constructor() {
        super()
        this.state = {
            RemindList: ""
        }
    }

    render() {
        return (
            <div className="PlayBlock">
                <ContentTitle text="轨迹回放" />
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
                    <Button type="primary" size="large" style={{ marginRight: "15px" }}>查询</Button>
                    <Button type="primary" size="large">导出Excel</Button>
                </div>
                <div className="map">
                    <Map
                        amapkey={GDMap.KEY}
                        version={GDMap.VERSION}
                        zoom={12}
                        center={{ longitude: 106.5507300000, latitude: 29.5647100000 }}
                        plugin={['AMap.RectangleEditor']}
                    >
                        {/* <Marker
                            position={{ longitude: item.lat, latitude: item.long }}
                            icon={require('../../../images/' + item.state)}
                            angle={item.heading}
                        >
                        </Marker> */}
                    </Map>
                </div>
                

            </div>
        )
    }
}

export default PlayBlock