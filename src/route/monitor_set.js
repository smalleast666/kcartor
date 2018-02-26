

import React from 'react'
import { Route } from 'react-router-dom'

//页面组件

import Remind from '../containers/monitor_set/Remind'
import Setting from '../containers/monitor_set/Setting'

class route extends React.Component {

    render() {
        return [
            <Route key="1" path='/monitor_set/remind' component={Remind} />,
            <Route key="2" path='/monitor_set/setting' exact component={Setting}/>
        ]
    }

}

export default route