import React from 'react'
import { Route } from 'react-router-dom'

//页面组件

import GPS from '../containers/monitor/GPS' 
import Detect from '../containers/monitor/Detect'
import Behavior from '../containers/monitor/Behavior' 
import Remind from '../containers/monitor/Remind' 
import Geofence from '../containers/monitor/Geofence' 
import Playback from '../containers/monitor/Playback' 
import Position from '../containers/monitor/Position' 



class route extends React.Component {

    render() {
        return [
            <Route key="1" path='/monitor/gps' component={GPS} />,
            <Route key="2" path='/monitor/detect' component={Detect} />,
            <Route key="3" path='/monitor/behavior' component={Behavior} />,
            <Route key="4" path='/monitor/remind' component={Remind} />,
            <Route key="5" path='/monitor/geofence' component={Geofence} />,
            <Route key="6" path='/monitor/playback' component={Playback} />,
            <Route key="7" path='/monitor/position' component={Position} />
        ]
    }

}

export default route