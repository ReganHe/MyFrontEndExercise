'use strict'

var React = require('react');
var TodoItem = React.createClass({
    getInitialState: function () {
        return {edit: false, content: this.props.item.content}
    },
    handleEdit: function () {
        this.setState({edit: true})
    },
    handleChange: function () {
        this.setState({content: event.target.value})
    },
    render: function () {
        if (this.state.edit == false) {
            return (
                <li>
                    {this.props.item.content}&
                    <button onclick={this.handleEdit}></button>
                </li>
            );
        } else {
            return (
                <li>
                    <input type="text" value={this.state.content} onchange={this.handleChange}/>
                </li>
            );
        }
    }
});

module.exports = TodoItem;