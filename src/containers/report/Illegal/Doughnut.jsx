import React from 'react'
import axios from 'axios'
import { message } from 'antd'
import { Doughnut } from 'react-chartjs-2'


class DoughnutCom extends React.Component {
    constructor() {
        super()
        this.state = {
            label: [],
            data: []
        }
    }

    componentWillMount() {

        axios.post("/proxy/api", {
            method: "/illegal/analysis/event_census",
            stime: "2017-12-01",
            etime: "2018-01-23"
        }).then(res => {
            if (res.data.status === 200) {
                var label = []
                var data = []
                res.data.data.map( item => {
                    label.push(item.title)
                    data.push(item.total)
                    return label
                })
                this.setState({
                    label: label,
                    data: data
                })
                return
            }
            message.error(res.data.message);

        })
    }

    render() {
        const data = {
            labels: this.state.label || [],
            datasets: [{
                data: this.state.data || [],
                backgroundColor: [
                    '#ffcc00',
                    '#0dda9e',
                    '#f54234',
                    '#556586',
                    '#123132',
                    '#574665'
                ]
            }]
        };

        return (
            <Doughnut data={data} />
        )
    }
}

export default DoughnutCom