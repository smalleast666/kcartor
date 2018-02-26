import React from 'react'
import axios from 'axios'
import { message } from 'antd'
import { Bar } from 'react-chartjs-2'


class LineCom extends React.Component {
    constructor() {
        super()
        this.state = {
            label: [],
            data: []
        }
    }

    componentWillMount() {

        axios.post("/proxy/api", {
            method: "/illegal/analysis/temporary_sort",
            stime: "2017-12-01",
            etime: "2018-01-23"
        }).then(res => {
            if (res.data.status === 200) {
                var label = []
                var data = []
                res.data.data.map( item => {
                    label.push(item.number_plate)
                    data.push(item.total)
                    return label
                })
                this.setState({
                    label,
                    data
                })
                return
            }
            message.error(res.data.message);

        })
    }

    render() {
        var data = {
            labels: this.state.label,
            datasets: [
                {
                    label: '回收数量',
                    backgroundColor: '#d9dce5',
                    hoverBackgroundColor: '#e60012',
                    data: this.state.data
                }
            ]
        }

        return (
            <Bar data={data} />
        )
    }
}

export default LineCom