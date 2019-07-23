import React, { Component } from "react";
import { connect } from 'react-redux'; 


import Counter from "../components/counter";
import {addcount, subcount, addcountasync} from "../redux/actions";




//将待定state数据映射（转换）成标签的一般属性传递给UI组件（Counter）
//redux在调用此函数时，传入了store.getState()的值
// const mapStateTorops = (state) => ({//返回的对象的所有属性传递给UI组件
//         count: state,
// });
//将包含dispatch函数调用语句的函数映射（转换）成函数属性传递给UI组件（Counter）
//redux在调用此函数时，传入了store.getState()的值
// const mapDispatchToProps = (dispatch) => ({
//     addcount: (number) => {dispatch(addcount(number))},
//     subcount: (number) => {dispatch(subcount(number))}
// })

// export default connect(
//     mapStateTorops, //用来指定传递哪些一般值
//     mapDispatchToProps
// )(Counter);

export default connect(
    state => ({count: state}),
    {addcount, subcount, addcountasync}
)(Counter);