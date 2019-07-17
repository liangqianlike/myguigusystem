import ajax from './ajax';

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
export const reqLogin = (username,password) => ajax.post(BASE + '/login', {username,password});
   


// const useName = 'admin';
// const usePwd = 'admin';
// reqLogin(useName,usePwd).then(result => {    
//     console.log('请求成功了', result);
// }, error => {
//     alert('请求成功了,' + error.message);
// });