

import React from 'react'
import { Route } from 'react-router-dom'

//页面组件
import Obd from '../containers/company_manage/Obd'
import Taxi from '../containers/company_manage/Taxi'

class route extends React.Component {

    render() {
        return [
            <Route key="1" path='/company_manage/taxi' component={Taxi} />,
            <Route key="2" path='/company_manage/obd' component={Obd} />
        ]
    }

}

export default route