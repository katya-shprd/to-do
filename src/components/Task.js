import React, { Component } from "react";
import { fb } from '../api/firebase';
import Checkbox from './Checkbox';

export default class Task extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            importance: this.props.importance,
            isOpen: false
        }
    }

    increaseImportance = () => {
        let importance = this.state.importance; // 0
        if (importance < 2) {
            importance += 1;  
            this.setState({ importance })
            fb.database().ref('/tasks/' + this.props.id).update({ importance })
        }  
    } 

    decreaseImportance = () => {
        let importance = this.state.importance;
        if (importance > 0) {
            importance -=1;
            this.setState({ importance })
            fb.database().ref('/tasks/' + this.props.id).update({ importance })
        }
    }

    showImportanceBar = (importance) => {
        switch(importance) {
            case 0:
                return (<div className="importanceBar" style={{ backgroundColor: '#44B827' }} />);      
            case 1:
                return (<div className="importanceBar" style={{ backgroundColor: '#F5AD41' }} />);
            case 2:
                return (<div className="importanceBar" style={{ backgroundColor: '#F13333' }} />);       
            default:
                return "";
        }
    }

    showImportanceLevel = (importance) => {
        switch(importance) {
            case 0:
                return (<span style={styles.importanceOfTask}><span style={{color: '#44B827', fontWeight: '700'}}>Low</span></span>);                 
            case 1:
                return (<span style={styles.importanceOfTask}><span style={{color: '#F5AD41', fontWeight: '700'}}>Medium</span></span>);
            case 2:
                return (<span style={styles.importanceOfTask}><span style={{color: '#F13333', fontWeight: '700'}}>High</span></span>);       
            default:
                return "";
        }
    }

    returnView = () => {
        return (<div>Wello Horld</div>)
    }

    toggleCompleteTask = () => {  
        fb.database().ref('/tasks/' + this.props.id).update({
            isDone: !this.props.isDone
        })
    }

    render() {
        if (this.state.isOpen) {
            return (
                <div style={styles.container}>
                    <Checkbox
                    checked={this.props.isDone}
                    onChange={this.toggleCompleteTask}/>
                
                
                    <div style={styles.card}>
                        {this.showImportanceBar(this.state.importance)}
                        <h2 style={styles.nameOfTask}>{this.props.title}</h2>

                        <h4 style={styles.dateOfTask}> by {this.props.date.toLowerCase()}</h4>

                        <div style={styles.row}>
                            <div style={{marginRight: '6px'}}>
                                <button style={styles.plusMinus} onClick={this.increaseImportance}>+</button>
                                <button style={styles.plusMinus} onClick={this.decreaseImportance}>–</button>
                            </div>
                            {this.showImportanceLevel(this.state.importance)}
                            <button style={styles.editSave} onClick={() => {this.setState({isOpen: !this.state.isOpen})}}><span>save</span></button>         
                        </div>
                    </div>
                

            </div>)
        }
        else {
            return (
                <div style={styles.container}>

                    <Checkbox
                    checked={this.props.isDone}
                    onChange={this.toggleCompleteTask}/>

                    
                    <div style={styles.card}>
                        {this.showImportanceBar(this.state.importance)}
                        
                        <h2 style={styles.nameOfTask}>{this.props.title}</h2>
                        <h4 style={styles.dateOfTask}> by {this.props.date.toLowerCase()}</h4>
                        <button style={styles.editSave} onClick={() => {this.setState({isOpen: !this.state.isOpen})}}><span>edit</span></button>
                    </div>
                </div>
            )
        }
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '15px',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        display: 'flex',
        paddingRight: '41px'
    },
    checkbox:{
        flexDirection: 'row',
        wight: '22px',
        height: '22px',
        marginRight: '22px',
        padding: '22px',
        marginTop: '2%',
        borderRadius: '50%',
        background: 'red'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        margin: '12px',
        width: '500px',
        paddingLeft: '41px',
        paddingTop: '34px',
        height: '118px',
        background: '#FFFFFF',
        position: 'relative',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.12)',
    },
    nameOfTask: {
        display: 'flex',
        
    },
    dateOfTask: {
        display: 'flex',
        position: 'absolute',
        right: '41px',
        top: '34px'
        
    },
    importanceOfTask: {
    },
    plusMinus: {
        maxWidth: '18px',
        fontWeight: '700',
        fontSize: '18px',
        padding: '0',
        marginRight: '9px'
    },
    editSave: {
        display: 'flex',
        position: 'absolute',
        fontSize: '18px',
        color: '#4C33E5',
        fontWeight: '700',
        top: '60px',
        right: '41px',
        textAlign: 'right',
        padding: '0'
    }
}  
