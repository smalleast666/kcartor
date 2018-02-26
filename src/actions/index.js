
//用户信息
export function act_user_msg(data) {
    return {
        type: "USER_MSG",
        data: data
    };
}
//首页数据
export function act_index_data(data) {
    return {
        type: "INDEX_DATA",
        data: data
    };
}

//车辆列表
export function act_car_list(data) {
    return {
        type: "CAR_LIST",
        data: data
    };
}

//GPS车辆列表
export function act_GPS_car_list(data) {
    return {
        type: "GPS_CAR_LIST",
        data: data
    };
}
