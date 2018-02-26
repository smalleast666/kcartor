import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'

import ContentTitle from '../../../components/ContentTitle'
import LineCom from './Line'
import DoughnutCom from './Doughnut'
import PeccancyBar from './PeccancyBar'
import TemporaryBar from './TemporaryBar'

import "./index.scss"


class illegal extends React.Component {

    render() {
        
        return (
            <div className="illegal">
                <div className="title">
                    <ContentTitle text="违章分析" />
                </div>
                <Row className="chart">
                    <Col span={12}>
                        <div>
                            <div className="chartTitle">
                                <h2>违章类型统计</h2>
                                <Link to="/report/illegal/type">查看详情</Link>
                            </div>
                            <LineCom />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <div>
                                <h2>违章事件分类统计</h2>
                                <Link to="/report/illegal/event">查看详情</Link>
                            </div>
                            <DoughnutCom />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <div>
                                <h2>违章排名前10的车辆</h2>
                                <Link to="/report/illegal/rank">查看详情</Link>
                            </div>
                            <PeccancyBar />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <div>
                                <h2>临停排名前10的车辆</h2>
                                <Link to="/report/illegal/temporary">查看详情</Link>
                            </div>
                            <TemporaryBar />
                        </div>
                    </Col>
                </Row>
                
            </div>
            
        )
    }
}

export default illegal