import React, { Component } from 'react';
import Task from './components/Task';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      description: '',
      tasks: [
        {title: 'Learn React', date: 'Tomorrow', importance: 2},
        {title: 'Learn Firebase', date: '2 days', importance: 1},
        {title: 'Kiss Chipi', date: 'today', importance: 0}
      ]
    }
  }

  renderTaskList = () => {
    let tasks = this.state.tasks.concat(); // Array of tasks
    
    let taskComponents = tasks.map(item =>
        <Task
            title={item.title}
            date={item.date}
            importance={item.importance}
          />
    ) // Array of components

    return taskComponents;
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
      
      <form>
        Title
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleInputChange}
          />


        Date
        <input
          type="text"
          value={this.state.date}
          name="date"
          onChange={this.handleInputChange}/>
        
        Description
          <input
          type="text"
          value={this.state.description}
          name="description"
          onChange={this.handleInputChange}/>
         
        <button>Add Task</button>    
      </form>

      <br/>
      <br/>      

      {this.renderTaskList()}
      
      </div>
    );
  }
}

export default App;
