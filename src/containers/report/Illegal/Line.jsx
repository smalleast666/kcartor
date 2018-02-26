import React from 'react'
import axios from 'axios'
import { message } from 'antd'
import { Line } from 'react-chartjs-2'


class LineCom extends React.Component {
    constructor() {
        super()
        this.state = {
            label: [],
            illegal: [],
            peccancy: [],
            temporary: [],
        }
    }

    componentWillMount() {

        axios.post("/proxy/api", {
            method: "/illegal/analysis/illegal_census",
            stime: "2017-12-01",
            etime: "2018-01-23"
        }).then(res => {
            if (res.data.status === 200) {
                var label = []
                var illegal = []
                var illegalKey = []
                var peccancy = []
                var peccancyKey = []
                var temporary = []
                var temporaryKey = []
                for (illegalKey in res.data.data.illegal) {
                    label.push(illegalKey)
                    illegal.push(res.data.data.illegal[illegalKey])
                }
                for (peccancyKey in res.data.data.peccancy) {
                    peccancy.push(res.data.data.peccancy[peccancyKey])
                }
                for (temporaryKey in res.data.data.temporary) {
                    temporary.push(res.data.data.temporary[temporaryKey])
                }
                this.setState({
                    label: label,
                    illegal: illegal,
                    peccancy: peccancy,
                    temporary: temporary
                })
                return
            }
            message.error(res.data.message);

        })
    }

    render() {
        var data = {
            labels: this.state.label || [],
            datasets: [
                {
                    label: '违法累计',
                    fill: false,
                    lineTension: 0.1,
                    borderColor: '#000',
                    backgroundColor: '#000',
                    borderDashOffset: 0.0,
                    pointBackgroundColor: '#000',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#000',
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.illegal
                },
                {
                    label: '违章累计',
                    fill: false,
                    lineTension: 0.1,
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                    borderDashOffset: 0.0,
                    pointBackgroundColor: 'blue',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'blue',
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.peccancy || []
                },
                {
                    label: '临停累计',
                    fill: false,
                    lineTension: 0.1,
                    borderColor: 'red',
                    backgroundColor: 'red',
                    borderDashOffset: 0.0,
                    pointBackgroundColor: 'red',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'red',
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.temporary || []
                }
            ]
        }

        return (
            <Line data={data} />
        )
    }
}

export default LineCom