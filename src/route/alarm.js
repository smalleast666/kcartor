import React from 'react'
import { Route } from 'react-router-dom'

//页面组件

import Alarms from '../containers/alarm/Alarms'
import Driving from '../containers/alarm/Driving'
import Lost from '../containers/alarm/Lost'
import Retrieve from '../containers/alarm/Retrieve'
import Safety from '../containers/alarm/Safety'

class route extends React.Component {

    render() {
        return [
            <Route key="1" path='/alarm/alarm' component={Alarms} />,
            <Route key="2" path='/alarm/driving' component={Driving} />,
            <Route key="3" path='/alarm/lost' component={Lost} />,
            <Route key="4" path='/alarm/retrieve' component={Retrieve} />,
            <Route key="5" path='/alarm/safety' component={Safety} />
        ]
    }

}

export default route