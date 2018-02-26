import React from 'react'

import { Spin, Modal, Select, Input, Checkbox,  message } from 'antd'

import "./index.scss"

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;


class Layer extends React.Component {
    
    constructor () {
        super()
        this.state = {
            firm_no: "",
            ber_name: "",
            remind: "",
            remind_way: "",
            status: 0,
        }
    }
    //确定按钮
    handleOk = () => {
        if (!this.state.firm_no) {
            message.error("请选择公司")
            return
        } else if (!this.state.ber_name) {
            message.error("请填写名字")
            return
        } else if (!this.state.remind) {
            message.error("请填写提醒次数")
            return
        } else if (!this.state.remind_way){
            message.error("请选择提醒方式")
            return
        }
        this.props.sureBtn(this.state)
    }
    // 取消和close按钮
    handleCancel = () => {
        this.props.cancelBtn()
    }
    //选择公司时触发
    pickCompony = value => {
        this.setState({ firm_no: value })
    }
    //修改名字时触发
    remindName = e => {
        this.setState({ ber_name: e.target.value })
    }
    //更改提醒次数是触发
    reminding = e => {
        this.setState({remind: e.target.value })
    }
    //选择提醒方式时触发
    remind_way = value => {
        this.setState({ remind_way: value })
    } 
    //选择是否开启时触发
    remindOpen = e => {
        this.setState({ status: e.target.checked ? 1 : 0 })
    } 
    
    render() {

        //公司 Select 数据 json循环成数组
        // if (this.props.company) {
        //     var oldCompany = this.props.company.company
        //     var company = [], i
        //     for (i in oldCompany) {
        //         company.push(oldCompany[i])
        //     }
        // }

        return (
            this.props.visible ?
            <Modal 
                title="编辑驾驶行为提醒"
                visible={this.props.visible}
                onOk={this.handleOk}
                confirmLoading={this.props.confirmLoading}
                onCancel={this.handleCancel}
                destroyOnClose={true}
            >
                {
                    this.props.company ?
                        <div className="layer-behavior">
                            {
                                typeof this.props.company !== "number" ?
                                <Select
                                    size="large"
                                    defaultValue="请选择公司"
                                    onChange={this.pickCompony}
                                >
                                    {
                                        this.props.company.map(itemCompany =>
                                            <Option key={itemCompany.firm_no} value={itemCompany.firm_no.toString()}>{itemCompany.nike_name}</Option>
                                        )
                                    }
                                </Select>
                                : undefined
                            }
                            <Input
                                size="large"
                                placeholder="提醒名字" 
                                onChange={this.remindName}
                            />
                            <Input
                                size="large"
                                type="number"
                                placeholder="提醒次数"
                                onChange={this.reminding}
                            />
                            <div className="remind_way">
                                提醒方式：
                                <CheckboxGroup
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
                                <Checkbox onChange={this.remindOpen}>是否启用</Checkbox>
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