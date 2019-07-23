import React, { Component } from "react";
import PropTypes from 'prop-types';
import {addcount, subcount} from './redux/actionCreators';

export default class App extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    }
    addCount = () => {
        const number = this.refs.numberSelect.value * 1;
        this.props.store.dispatch(addcount(number));
    }
    subCount = () => {
        const number = this.refs.numberSelect.value * 1;
        this.props.store.dispatch(subcount(number));
    }
    oddAddCount = () => {
        const number = this.refs.numberSelect.value * 1;
        const count = this.props.store.getState();
        if (count % 2 === 0) {
            this.props.store.dispatch(addcount(number));
        }
    }
    addAsyncCount = () => {
        const number = this.refs.numberSelect.value * 1;
        setTimeout(() => {
            this.props.store.dispatch(addcount(number));
        }, 1000)

    }
    render() {
        console.log('render()');
        const count = this.props.store.getState();
        return (

            <div>
                <p>click {count} times</p>
                <select ref="numberSelect">
                    <option> 1 </option>
                    <option> 2 </option>
                    <option> 3 </option>
                </select>&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={this.addCount}>+</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={this.subCount}>-</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={this.oddAddCount}>increment if odd</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={this.addAsyncCount}>increment async</button>
            </div>
        )
    }
}                                                                                                                                   