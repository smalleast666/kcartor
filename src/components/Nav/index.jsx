import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import './index.scss'
import navData from './data'


class Nav extends React.Component {

    constructor() {
        super()
        this.state = {
            navData
        }
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    openNav (index) {
        if (index === 0) {
            this.context.router.history.push("/");
            navData.map( item => {
                item.class = ""
                if (item.child.length) {
                    item.child.map(CItem => 
                        CItem.class = ""
                    )
                }
                return item.class
            })
        }else {
            navData.map( item =>
                item.class = ""
            )
            navData[index].class = "active";
            this.setState({
                navData
            })
        }
        
    }

    activeItem (index, CIndex) {
        
        navData.map(item =>
            item.child.length
            ? item.child.map( CItem => 
                CItem.class = ""
            )
            : null
        )
        navData[index].child[CIndex].class = "item-on";
        this.setState({
            navData
        })
    }

    render() {

        return (
            <div className="left-nav">
                {
                    this.state.navData.map( (item, index) =>
                        <div key={item.url} className={`navItem ${item.class}`}>
                            <div onClick={this.openNav.bind(this, index)}>
                                <div>
                                    {item.name}
                                </div>
                                <div className="openClose">
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <ul>
                                {
                                    item.child.length
                                    ? item.child.map((CItem, CIndex) => 
                                            <li className={CItem.class} key={CItem.url}><Link className="ellipsis" onClick={this.activeItem.bind(this, index, CIndex)} to={ item.url + CItem.url} >{CItem.name}</Link></li>
                                    )
                                    : null
                                }
                            </ul>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Nav
