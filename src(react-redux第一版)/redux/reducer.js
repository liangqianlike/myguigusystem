/**
 * 真正管理状态数据的函数
 * 
 */
import {ADDCOUNT,SUBCOUNT} from './actionTypes';
export default function count(state = 1,action){
    console.log('count', state, action);
    switch (action.type) {
        case ADDCOUNT:
            return state + action.number;
        case SUBCOUNT:
            return state - action.number;
        //用于产生初始状态使用的 
        default:
            return state;
    }
}

