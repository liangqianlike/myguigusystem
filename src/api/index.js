//接口请求函数
import ajax from './ajax';

const BASE = '';

//请求登录
export function reqLogin(username,password){
    ajax({
        method: 'post',
        url: BASE + '/login',
        data: {
            username,
            password
        }
    });
}

const useName = 'admin';
const usePwd = 'admin';
reqLogin(useName,usePwd);