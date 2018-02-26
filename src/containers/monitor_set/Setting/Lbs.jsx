import React from 'react'
// import axios from 'axios'
import { Map, MouseTool, Polygon, Polyline, PolyEditor, Circle, CircleEditor } from 'react-amap'
import { Row, Icon, Input, Button, Select, Form, DatePicker  } from 'antd'
import { GDMap } from '../../../config/GDMap'
import "./index.scss"
const { TextArea } = Input
const Option = Select.Option
const { RangePicker } = DatePicker

class Lbs extends React.Component {

    constructor() {
        super()
        this.state = {
            count: {}
        }
        this.toolEvents = {
            created: (tool) => {
                this.tool = tool
            },
            draw: ({ type, obj }) => {
                // console.log(obj)
                switch (this.state.shape) {
                    case "圆形": 
                        this.setState({
                            circle: { center: obj.Pg.center, radius: obj.Pg.radius }
                        })
                        break;
                    case "矩形": this.drawRect(obj.Pg.path);
                        break;
                    case "多边形": this.setState({ polygon: obj.Pg.path })
                        break;
                    case "折线": this.setState({ polyline: obj.Pg.path })
                        break;
                    default: 
                }
                
                this.tool.close(true);
            }
        }
        this.mapPlugins = ['ToolBar'];
        this.mapCenter = { longitude: 120, latitude: 35 };
    }

    drawRect = bounds => {
        const map = this.tool
       
        window.AMap.plugin(['AMap.RectangleEditor'], function () {
            var Rectangle = new window.AMap.Rectangle({
                map: map,
                bounds: new window.AMap.Bounds(bounds[0], bounds[2])
            })
            var RectangleEditor = new window.AMap.RectangleEditor(map, Rectangle)
            RectangleEditor.open()
        })

        
    }

    close = () => {
        this.props.close()
    }
    SelectVal = value => {
        console.log(value)
    }

    //选择的绘画图形的类型
    graphical = value => {
        switch ( value ) {
            case "圆形": this.tool.circle()
                break;
            case "矩形": this.tool.rectangle()
                break;
            case "多边形": this.tool.polygon();
                break;
            case "折线": this.tool.polyline()
                break;
            default: 
        }
        this.setState({ shape: value })

        
    }

    render() {
        const events = {
            move: () => { console.log('circle move') },
            adjust: () => { console.log('circle adjust') },
            end: () => { console.log('circle end') },
            // created: (ins) => { console.log(ins) }
        }
        return (
            <div className="lbs">
                <div className="lbs_titie">
                    <div>
                        <Icon type="plus" style={{ color: "#00a0e9" }}/>
                        新增围栏
                    </div>
                    <div>
                        <Icon type="close" onClick={this.close} />
                    </div>
                </div>
                <Row className="GPS_cnt">
                    <Map 
                        amapkey={GDMap.KEY} 
                        version={GDMap.VERSION} 
                        zoom={12} 
                        center={{ longitude: 106.5507300000, latitude: 29.5647100000 }} 
                        plugin={['AMap.RectangleEditor']}
                    >
                        <MouseTool events={this.toolEvents}/>
                        {
                            this.state.circle ? 
                            <Circle radius={this.state.circle.radius} center={{ longitude: this.state.circle.center.lng, latitude: this.state.circle.center.lat }}>
                                <CircleEditor events={events} active={true} />
                            </Circle>
                            : null
                        }
                        {
                            this.state.polygon  ?
                            <Polygon path={this.state.polygon}>
                                <PolyEditor events={events} active={true} />
                            </Polygon>
                            : null
                        }
                        {
                            this.state.polyline ?
                            <Polyline path={this.state.polyline}>
                                <PolyEditor events={events} active={true} />
                            </Polyline>
                            : null
                        }
                        
                    </Map>

                    <Form className="lbs_form">
                        <Input placeholder="请输入栅栏名称" size="large"/>
                        <Select
                            size="large"
                            defaultValue="请选择图形"
                            onChange={this.graphical}
                            style={{ width: "100%" }}
                        >
                            <Option value="圆形">圆形</Option>
                            <Option value="矩形">矩形</Option>
                            <Option value="多边形">多边形</Option>
                            <Option value="折线">折线</Option>
                        </Select>

                        <Select
                            size="large"
                            defaultValue="请选择触发方式"
                            onChange={this.SelectVal}
                            style={{ width: "100%", marginBottom: "5px" }}
                        >
                            <Option value="驶入触发">驶入触发</Option>
                            <Option value="使出触发">使出触发</Option>
                            <Option value="超速触发">超速触发</Option>
                        </Select>
                        <div>速度设置<Input size="small" style={{width: "100px",margin: "0 10px"}} placeholder="请输入时速"/>km/h</div>

                        <Select
                            size="large"
                            defaultValue="请选择是否开启"
                            onChange={ this.SelectVal }
                            style={{ width: "100%" }}
                        >
                            <Option value="是">是</Option>
                            <Option value="否">否</Option>
                        </Select>

                        <Select
                            size="large"
                            defaultValue="请选择车辆"
                            onChange={ this.SelectVal }
                            style={{ width: "100%", marginBottom: "5px" }}
                        >
                            <Option value="全部车辆">全部车辆</Option>
                            <Option value="部分车辆">部分车辆</Option>
                        </Select>
                        <div>已添加<span>0</span>辆车</div>

                        <Select
                            size="large"
                            defaultValue="请选择提醒"
                            onChange={this.SelectVal}
                            style={{ width: "100%"}}
                        >
                            <Option value="每日提醒">每日提醒</Option>
                            <Option value="只提醒一次">只提醒一次</Option>
                        </Select>

                        <RangePicker
                            size="large"
                            format="YYYY-MM-DD HH:mm"
                            placeholder={['开始时间', '结束时间']}
                            showTime={{ format: 'HH:mm' }}
                            style={{ width: "100%" }}
                        />
                        <TextArea 
                            placeholder="请输入事件说明（选填）"
                            style={{ resize: "none" }}
                        />

                        <Button 
                            type="primary" 
                            size="large" 
                            style={{width: "100%"}}
                            loading={false}
                        >
                        保存
                        </Button>
                    </Form>
                </Row>
            </div>
        )
    }
}

export default Lbs
