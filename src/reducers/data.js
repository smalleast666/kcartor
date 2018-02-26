/**
 * Created by zengtao on 2017/5/12.
 */


export function mapstate(state) {
    return{
        red_user_msg: state.red_user_msg,
        red_index_data: state.red_index_data,
        red_car_list: state.red_car_list,
        red_GPS_car_list: state.red_GPS_car_list,
    }
}