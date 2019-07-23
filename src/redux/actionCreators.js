/**
 * 包含n个用于创建action对象的工厂函数
 * 
 * 
 * 
 * 创建增减加的action
 * 
 */
import {ADDCOUNT,SUBCOUNT} from './actionTypes';

export const addcount = (number) => ({type: ADDCOUNT, number});



export const subcount = (number) => ({type: SUBCOUNT, number});