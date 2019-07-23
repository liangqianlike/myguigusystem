import React, { Component } from "react";
import PropTypes from 'prop-types';

class Counter extends Component {
    static propTypes = {
        store: PropTypes.number.isRequired,
        addcount: PropTypes.func.isRequired,
        subcount: PropTypes.func.isRequired,
        addcountasync: PropTypes.func.isRequired
    }
    addCount = () => {
        const number = this.refs.numberSelect.value * 1;
        this.props.addcount(number);
    }
    subCount = () => {
        const number = this.refs.numberSelect.value * 1;
        this.props.subcount(number);
    }
    oddAddCount = () => {
        const number = this.refs.numberSelect.value * 1;
        const count = this.props.count;
        if (count % 2 === 0) {
            this.props.addcount(number);
        }
    }
    addAsyncCount = () => {
        const number = this.refs.numberSelect.value * 1;
        this.props.addcountasync(number);

    }
    render() {
        console.log('render()');
        const count = this.props.count;
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


export default Counter;