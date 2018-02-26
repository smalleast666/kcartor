

import React from 'react'
import { Route } from 'react-router-dom'

//页面组件

import Bind from '../containers/engine_manage/Bind'
import Library from '../containers/engine_manage/Library'
import Scrap from '../containers/engine_manage/Scrap'
import Warranty from '../containers/engine_manage/Warranty'

class route extends React.Component {

    render() {
        return [
            <Route key="1" path='/engine_manage/bind' component={Bind} />,
            <Route key="2" path='/engine_manage/library' component={Library} />,
            <Route key="3" path='/engine_manage/scrap' component={Scrap} />,
            <Route key="4" path='/engine_manage/warranty' component={Warranty} />
        ]
    }

}

export default route