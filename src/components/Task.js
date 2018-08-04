import React, { Component } from "react";

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            importance: this.props.importance
        }
    }

    increaseImportance = () => {
        let importance = this.state.importance; // 0
        if (importance < 2) {
            importance += 1;  
            this.setState({
                importance: importance
            }) 
        }  
    } 

    decreaseImportance = () => {
        let importance = this.state.importance;
        if (importance >0) {
            importance -=1;
            this.setState({
                importance: importance
            })
        }
    }

    showImportanceLevel = (importance) => {
        switch(importance) {
            case 0:
                return "Low";      
            case 1:
                return "Medium";
            case 2:
                return "High";       
            default:
                return "";
        }
    }

    deleteTask = () => {
        console.log(this.props.id);
    }
    render() {
        return (
            <div>
                <div>{this.props.title} by {this.props.date.toLowerCase()}</div>
                <div>Importance level: {this.showImportanceLevel(this.state.importance)}</div>
                <div>{this.props.isDone ? "Complete" : "Not complete"}</div>

                <button onClick={this.deleteTask}>Delete</button>
                <button onClick={this.increaseImportance}>+</button>
                <button onClick={this.decreaseImportance}>-</button>
                <br/>
                <br/>
                
            </div>
        )
    }
}