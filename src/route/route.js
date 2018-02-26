import React from 'react'
import { Route, Redirect } from 'react-router-dom'

//页面组件
import Index from '../containers/index' //首页
import Monitor from './monitor' //车辆监控
import Carmanage from './car_manage'  //车辆管理
import Enginemanage from './engine_manage' //机车管理
import Alarm from './alarm' // 异常报警
import Report from './report' //分析报告
import Monitorset from './monitor_set' //监控设置
import Companymanage from './company_manage' //公司管理
import Systemset from './system_set'  //系统设置


// import NotFound from '../containers/404'

//公共组件
import Header from '../components/Header'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

class route extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                <div className="content-block">
                    <Nav/>
                    <div className="content">
                        <div className="content-div">
                            <Route exact path='/' component={Index} />
                            <Route path='/index' render={() => <Redirect to="/" />} />
                            <Monitor />
                            <Carmanage />
                            <Enginemanage />
                            <Alarm />
                            <Report />
                            <Monitorset />
                            <Companymanage />
                            <Systemset />
                        </div>
                        {/* <Route path="*" component={NotFound} /> */}
                        
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

}

export default route
