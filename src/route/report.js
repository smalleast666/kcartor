

import React from 'react'
import { Route } from 'react-router-dom'

//页面组件

import Analysis from '../containers/report/Analysis'
import Illegal from '../containers/report/Illegal'

import Type from '../containers/report/Illegal/Type'
import Events from '../containers/report/Illegal/Event'
import Rank from '../containers/report/Illegal/Rank'
import Temporary from '../containers/report/Illegal/Temporary'

class route extends React.Component {

    render() {
        return [
            <Route key="1" path='/report/analysis' component={Analysis} />,
            <Route key="2" path='/report/Illegal' component={Illegal} exact />,
            <Route key="3" path='/report/Illegal/type' component={Type} />,
            <Route key="4" path='/report/Illegal/event' component={Events} />,
            <Route key="5" path='/report/Illegal/rank' component={Rank} />,
            <Route key="6" path='/report/Illegal/temporary' component={Temporary} />
        ]
    }

}

export default route