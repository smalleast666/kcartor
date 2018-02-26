import React from 'react'

import { Spin, Modal, Select, Input, Checkbox } from 'antd'

import "./index.scss"

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;


class Layer extends React.Component {
    //自定义方法 父组件调用
    getCurrent = () => {
        this.setState({
            ber_name: this.props.company.data.ber_name,
            ber_no: this.props.company.data.ber_no,
            firm_no: this.props.company.data.firm_no,
            remind: this.props.company.data.remind,
            status: this.props.company.data.status,
            remind_way: this.props.company.data.remind_way
        })
    }

    //确定按钮
    handleOk = () => {
        this.props.sureBtn(this.state)
    }
    //选择公司时触发
    pickCompony = value => {
        this.setState({ firm_no: value })
    }
    //更改提醒次数是触发
    reminding = e => {
        this.setState({ remind: e.target.value })
    }
    // 取消和close按钮
    handleCancel = () => {
        this.props.cancelBtn()
    }

    remind_way = value => {
        this.setState({ remind_way: value })
    } 
    
    remindOpen = e => {
        this.setState({ status: e.target.checked ? 1 : 0 })
    }
    
    render() {

        //公司 Select 数据 json循环成数组
        if (this.props.company) {
            var oldCompany = this.props.company.company
            var company = [], i
            for (i in oldCompany) {
                company.push(oldCompany[i])
            }
        }
        

        return (
            this.props.visible ?
            <Modal 
                title="编辑驾驶行为提醒"
                visible={this.props.visible}
                onOk={this.handleOk}
                confirmLoading={this.props.confirmLoading}
                onCancel={this.handleCancel}
            >
                {
                    company ?
                        <div className="layer-behavior">
                            <Select
                                size="large"
                                defaultValue={this.props.company.company[this.props.company.data.firm_no].nike_name}
                                onChange={this.pickCompony}
                            >
                                {
                                    company.map(itemCompany =>
                                        <Option key={itemCompany.firm_no} value={itemCompany.firm_no.toString()}>{itemCompany.nike_name}</Option>
                                    )
                                }
                            </Select>
                            <Input
                                size="large"
                                disabled
                                placeholder="提醒类型" 
                                value={this.props.company.data.ber_name}
                            />
                            <Input
                                size="large"
                                type="number"
                                placeholder="提醒次数"
                                defaultValue={this.props.company.data.remind}
                                onChange={this.reminding}
                            />
                            <div className="remind_way">
                                提醒方式：
                                <CheckboxGroup
                                    defaultValue={this.props.company.data.remind_way}
                                    onChange={this.remind_way}
                                    options={
                                        [
                                            { label: '首页', value: '1' },
                                            { label: '司机端', value: '2' }
                                        ]
                                    }
                                />
                            </div>
                            <div>
                                <Checkbox onChange={this.remindOpen} defaultChecked={this.props.company.data.status === 1 ? true : false }>是否启用</Checkbox>
                            </div>
                        </div>
                        : <div className="loading"><Spin size="large" /></div>
                }
            </Modal>
            : <div></div>
        )
    }
}

export default Layer