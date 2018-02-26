

import React from 'react'
import { Route } from 'react-router-dom'

//页面组件

import Log from '../containers/system_set/Log'
import Permission from '../containers/system_set/Permission'
import Role from '../containers/system_set/Role'
import User from '../containers/system_set/User'

class route extends React.Component {

    render() {
        return [
            <Route key="1" path='/system_set/log' component={Log} />,
            <Route key="2" path='/system_set/permission' component={Permission} />,
            <Route key="3" path='/system_set/role' component={Role} />,
            <Route key="4" path='/system_set/user' component={User} />
        ]
    }

}

export default route