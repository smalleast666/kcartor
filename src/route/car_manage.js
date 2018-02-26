import React from 'react'
import { Route } from 'react-router-dom'

//页面组件

import Illegal from '../containers/car_manage/Illegal'
import Manage from '../containers/car_manage/Manage'

class route extends React.Component {

    render() {
        return [
            <Route key="1" path='/car_manage/illegal' component={Illegal} />,
            <Route key="2" path='/car_manage/manage' component={Manage} />
        ]
    }

}

export default route
