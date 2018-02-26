
import {combineReducers} from "redux"

//登录信息
export function red_user_msg(state = false, action) {
    switch (action.type) {
        case "USER_MSG":
            return action.data
        default:
            return state
    }
}
//首页数据
export function red_index_data(state = "", action) {
    switch (action.type) {
        case "INDEX_DATA":
            return action.data
        default:
            return state
    }
}

//车辆列表
export function red_car_list(state = [], action) {
    switch (action.type) {
        case "CAR_LIST":
            return action.data
        default:
            return state
    }
}

//GPS车辆列表
export function red_GPS_car_list(state = [], action) {
    switch (action.type) {
        case "GPS_CAR_LIST":
            return action.data
        default:
            return state
    }
}

const rootReducer = combineReducers({
    red_user_msg,
    red_index_data,
    red_car_list,
    red_GPS_car_list
})
export default rootReducer