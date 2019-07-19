import ajax from './ajax';
import jsonp from 'jsonp';
// import { resolve } from 'upath';
// import { reject } from 'q';
import { message } from 'antd';
const BASE = '';

//请求登录
// export function reqLogin(username,password){
//     return ajax({
//         method: 'post',
//         url: BASE + '/login',
//         data: {
//             username,
//             password
//         }
//         //测试使用
//         // data: qs.stringify({username,password})  
//     });
// }

// export const reqLogin = (username,password) => (
//     ajax({
//         method: 'post',
//         url: BASE + '/login',
//         data: {
//             username,
//             password
//         }
//         //测试使用
//         // data: qs.stringify({username,password})  
//     })

// )
export const reqLogin = (username, password) => ajax.post(BASE + '/login', { username, password });

// const useName = 'admin';
// const usePwd = 'admin';
// reqLogin(useName,usePwd).then(result => {    
//     console.log('请求成功了', result);
// }, error => {
//     alert('请求成功了,' + error.message);
// });

export const reqWeather = (city) => {

    return new Promise((resolve, reject) => { //执行函数器
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        jsonp(url, {}, (error, data) => {
            if (!error && data.error === 0) { //成功的回调
                const { dayPictureUrl, weather } = data.results[0].weather_data[0];
                resolve({ dayPictureUrl, weather });
            } else {
                message.error('获取天气信息失败！！！');
            }
        });
    });
}


//获取分类列表
export const reqCategorys = () => ajax(BASE + '/manage/category/list');



//知识点：ajax不能发送jsop请求，所以安装插件jsop用于发送jsop请求